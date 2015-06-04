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

    function render() {
        ctx.beginPath();
        ctx.arc(canvasX(0), canvasY(0), 2, 0, Math.PI * 2, true);
        ctx.fill();

        var now = new Date();
        var degree = canvasDegree((360 / 60) * now.getSeconds());
        var r = 80;
        var x = Math.cos(convertRadian(degree)) * r;
        var y = Math.sin(convertRadian(degree)) * r;
        //console.log('x:' + x + ', y:' + y);
        ctx.fillStyle = 'black';
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        ctx.beginPath();
        ctx.moveTo(canvasX(0), canvasY(0));
        ctx.lineTo(canvasX(x), canvasY(y));
        ctx.stroke();
        requestAnimationFrame(render);
    }

    /**
     * ロード時の処理。
     */
    window.addEventListener('load', function () {
        var canvas = document.getElementById('canvas');
        canvas.width = CANVAS_WIDTH;
        canvas.height = CANVAS_HEIGHT;
        ctx = canvas.getContext('2d');
        render();
    });
})();