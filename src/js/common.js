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
      this.hands[ClockHandType.hour] = new ClockHand(ClockHandType.hour, 50);
      this.hands[ClockHandType.miniute] = new ClockHand(ClockHandType.miniute, 70);
      this.hands[ClockHandType.second] = new ClockHand(ClockHandType.second, 80);
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

    /**
     * 時計の針
     */
    function ClockHand(handType, length) {
      this.handType = handType;
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
      var now = model.now;

      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      ctx.fillStyle = 'black';

      ctx.beginPath();
      ctx.arc(canvasX(0), canvasY(0), 2, 0, Math.PI * 2, true);
      ctx.fill();

      // ミリも含む秒
      var second = now.getSeconds() + now.getMilliseconds() / 1000;
      // 角速度
      var radPerS = 2 * Math.PI / 60;
      var radius = second * radPerS;
      //var sinTheta = Math.sin(radius);

      var methods = {
          pointX: function (degree, r) {
              return Math.cos(convertRadian(degree)) * r;
          },
          pointY: function (degree, r) {
              return Math.sin(convertRadian(degree)) * r;
          },
          drawLine: function (x, y) {
              ctx.beginPath();
              ctx.moveTo(canvasX(0), canvasY(0));
              ctx.lineTo(canvasX(x), canvasY(y));
              ctx.stroke();
          },
          degreeOfHours: function (d) {
              return canvasDegree((360 / 60)
                  * (d.getHours() % 12 * 5 + d.getMinutes() * 5 / 60 ));
          },
          degreeOfMinutes: function (d) {
              return canvasDegree((360 / 60) * d.getMinutes());
          },
          degreeOfSeconds: function (d) {
              return canvasDegree((360 / 60) * d.getSeconds());
          },
      };

      with (methods) {
          var degree = degreeOfHours(now);
          var r = model.hands[ClockHandType.hour].length;
          drawLine(pointX(degree, r), pointY(degree, r));
      }

      with (methods) {
          var degree = degreeOfMinutes(now);
          var r = model.hands[ClockHandType.miniute].length;
          drawLine(pointX(degree, r), pointY(degree, r));
      }

      with (methods) {
          //var degree = degreeOfSeconds(now);
          var r = model.hands[ClockHandType.second].length;
          drawLine(Math.cos(radius) * r, Math.sin(radius) * r);
      }
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
