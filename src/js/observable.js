'use strict';
/**
 * リスナー。
 * @constructor
 */
var ChangeListener = function () {
};
ChangeListener.prototype.change = function (arg) {
    console.log('ChangeListener::update, arg:' + arg);
};

/**
 * 購読可能な型。
 * @constructor
 */
var Observable = function () {
    /**
     * 登録されたリスナー。
     * @type {Array}
     */
    this.listeners = [];
};
/**
 * リスナー登録。
 * @param listener
 */
Observable.prototype.addListener = function (listener) {
    if (listener instanceof ChangeListener) {
        this.listeners.push(listener.change);
    } else {
        console.error('invalid object. implement "Listener. : "' + listener)
    }
};
/**
 * リスナーの削除。
 * @param listener
 */
Observable.prototype.removeObserver = function (listener) {
    var len = this.listeners.length;
    for (var i = 0; i < len; ++i) {
        if (this.listeners[i] === listener.update) {
            this.listeners.splice(i, 1);
            return;
        }
    }
};
/**
 * 通知する。
 * @param data
 */
Observable.prototype.notify = function (data) {
    var len = this.listeners.length;
    // foreachあったら楽だが。。
    for (var i = 0; i < len; ++i) {
        this.listeners[i](data);
    }
};

// ----
var Dog = function () {
};
Dog.prototype = new Observable();
Dog.prototype.bark = function () {
    this.notify({newValue: 'bow-wow!'})
};

var Human = function () {
};
Human.prototype = new ChangeListener();
var human = new Human();
human.change = function (event) {
    console.log('犬が' + event.newValue + 'と吠えている。');
};

var shiba = new Dog();
shiba.addListener(human);
shiba.bark();
