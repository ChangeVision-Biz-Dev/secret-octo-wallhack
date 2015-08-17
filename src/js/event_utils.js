
/**
 * イベントソース
 */
function EventSource() {
  this._eventHandlers = [];
};
EventSource.prototype.triggerEvent = function (event_name, args) {
  var eventArgs = {'source': this, 'event_name': event_name};
  if (args) {
    for (key in args) {
      eventArgs[key] = args[key];
    }
  }
  this._eventHandlers.forEach(function (handler) {
    handler(eventArgs);
  });
};
EventSource.prototype.addHandler = function (handler) {
  this._eventHandlers.push(handler);
};
EventSource.prototype.removeHandler = function (handler) {
  this._eventHandlers = this._eventHandlers.filter(function (item) {
     return item !== handler;
  });
};
exports.EventSource = EventSource;

/**
 * イベントマネージャー
 * @static
 */
var EventManager = (function() {
    // プライベート
    // [{'source':object, 'event_name': string, 'handler': function}]
    var _handlers = [];
    var _listeners = [];
    /**
     * 指定したソースがListnerとして登録されているか確認する
     * @private
     * @param {object} source 指定したソース
     * @return {boolean} trueの場合、listenerとして登録済み
     */
    var _hasListener = function (source) {
      return _listeners.filter(function(listener){return listener === source;}).length > 0;
    }
    /**
     * 指定したソースのlistenerに登録し、Listeningを開始する
     * @private
     * @param {object} source 指定したソース
     */
    var _startListening = function (source) {
      if (!_hasListener(source)) {
        source.addHandler(_deliverEvent);
        _listeners.push(source);
      }
    };
    /**
     * 指定したソースよりlistenerを解除し、Listeningを終了する
     * @private
     * @param {object} source 指定したソース
     */
    var _endListening = function (source) {
      if (!_hasListener(source)) {
        source.removeHandler(_deliverEvent);
        _listeners = _listeners.filter(function(listener){return listener !== source;});
      }
    };
    /**
     * イベントソースより呼び出され、適当なEventに振り分ける
     * @private
     * @param {dictinary} args イベントソースより受け取る引数。
     *     以下のような形式で受け取る。
     *     {'source': source, 'event_name': 'event', ...}
     */
    var _deliverEvent = function (args) {
      _handlers.filter(function(handler){
        return handler.source === args.source
          && (!args.event_name || handler.event_name == args.event_name)
        }).map(function(handler){return handler.handler;})
        .forEach(function(handler){handler(args);});
    };

    return {
      "addHandler": function (source, event_name, handler) {
        _handlers.push({'source': source, 'event_name': event_name, 'handler': handler});
        _startListening(source);
      },
      "removeHandler": function (t_source, t_event_name, t_handler) {
        _handlers = _handlers.filter(function(handler){
          return handler.source !== t_source
            || handler.event_name !== t_event_name
            || handler.handler !== t_handler;
        });
      },
    }
}());
exports.EventManager = EventManager;

var source = new EventSource();
var myHandler = function () {
  console.log("handler received event.")
};

EventManager.addHandler(source, "Raise", myHandler);

source.triggerEvent('Raise', {oldValue: 'oldValue', newValue: 'newValue'});

EventManager.removeHandler(source, "Raise", myHandler);

source.triggerEvent('Raise');
