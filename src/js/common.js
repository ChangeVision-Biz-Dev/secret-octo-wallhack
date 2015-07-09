/**
 * サンプル。
 */
(function () {
    // キャンバスの幅、高さ。
    var CANVAS_WIDTH = 320;
    var CANVAS_HEIGHT = 320;
    // センターをキャンバス中央とする。
    var CANVAS_CENTER = {
        width: CANVAS_WIDTH / 2,
        height: CANVAS_HEIGHT / 2
    };
    //キャンバスのコンテキスト。
    var ctx;

    /**
     * 中心を原点としたxを計算する。
     * @param x
     * @returns {number}
     */
    function canvasX(x) {
        return x + CANVAS_CENTER.width;
    }

    /**
     * 中心を原点としたyを計算する。
     * @param y
     * @returns {number}
     */
    function canvasY(y) {
        return y + CANVAS_CENTER.height;
    }

    /**
     * 上を0度と計算する。
     * @param degree
     * @returns {number}
     */
    function canvasDegree(degree) {
        return degree - 90;
    }

    /**
     * 度からθへ変換する。
     * @param degree
     * @returns {number}
     */
    function convertRadian(degree) {
        return degree * (Math.PI / 180);
    }

    /**
     * 時計Model
     */
    function ClockModel() {
      this.now = new Date();
      this.hands = {};
      this.hands[ClockHandType.hour] = new ClockHand(50);
      this.hands[ClockHandType.miniute] = new ClockHand(70);
      this.hands[ClockHandType.second] = new ClockHand(80);
    };
    ClockModel.prototype = new Observable();
    ClockModel.prototype.refresh = function () {
      this.now = new Date();
      this.notify({newValue: this});
    };
    ClockModel.prototype.start = function () {
      this._tick();
    };
    ClockModel.prototype._tick = function () {
      this.refresh();
      var self = this;
      requestAnimationFrame(function () {
        self._tick();
      });
    };
    ClockModel.prototype.radius = function (handType) {
      var ret;
      switch (handType) {
        case ClockHandType.hour:
          ret = (this.now.getHours() + this.now.getMinutes() / 60)
            * (2 * Math.PI / 12)
          break;
        case ClockHandType.miniute:
          ret = (this.now.getMinutes() + this.now.getSeconds() / 60)
            * (2 * Math.PI / 60)
          break;
        case ClockHandType.second:
          ret = (this.now.getSeconds() + this.now.getMilliseconds() / 1000)
            * (2 * Math.PI / 60)
          break;
      }
      return ret;
    };

    /**
     * 時計の針
     */
    function ClockHand(length) {
      this.length = length;
    }

    /**
     * 時計の針のタイプ
     */
    var ClockHandType = {
      hour: 1,
      miniute: 2,
      second: 3
    }

    /**
     * 時計View
     */
    function ClockView() {

      // listenerの実装
      // changeはObserverより呼ばれることになる関数なのでthisは使えない
      var self = this;
      this.change = function (event) {
        self.draw(event.newValue);
      };
    };
    ClockView.prototype = new ChangeListener();
    ClockView.prototype.draw = function (model) {
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      ctx.fillStyle = 'black';

      ctx.beginPath();
      ctx.arc(canvasX(0), canvasY(0), 2, 0, Math.PI * 2, true);
      ctx.fill();

      var drawLine = function (x, y) {
        ctx.beginPath();
        ctx.moveTo(canvasX(0), canvasY(0));
        ctx.lineTo(canvasX(x), canvasY(y));
        ctx.stroke();
      };

      [ClockHandType.hour, ClockHandType.miniute, ClockHandType.second]
        .map(function (handType) {
          return {radius: model.radius(handType), r: model.hands[handType].length};
        })
        .map(function (d) {
          return {x: (Math.sin(d.radius) * d.r), y: (-1 * Math.cos(d.radius) * d.r)};
        })
        .map(function (p) { drawLine(p.x, p.y); });
    };

    /**
     * 時計Controller
     */
    function ClockController() {
      this.model = new ClockModel();
      this.view = new ClockView();

      this.model.addListener(this.view);
    };
    ClockController.prototype.start = function() {
      this.model.start();
    }

    /**
     * ロード時の処理。
     */
    window.addEventListener('load', function () {
        var canvas = document.getElementById('canvas');
        canvas.width = CANVAS_WIDTH;
        canvas.height = CANVAS_HEIGHT;
        ctx = canvas.getContext('2d');

        var controller = new ClockController();
        controller.start();
    });
})();
