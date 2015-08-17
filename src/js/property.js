var event_utils = require('./event_utils.js');

function Property (value) {
  this._properties = {
    'value': value,
  };
};
Property.prototype = new event_utils.EventSource();

Property.prototype.bind = function (otherProperty) {
  if (this.isBound() || otherProperty === this) return;

  this._properties.binding = function (args) {
    this._properties.value = args.newValue;
  }.bind(this);
  event_utils.EventManager.addHandler(otherProperty, 'changed', this._properties.binding);
};
Property.prototype.unbind = function (otherProperty) {
  if (this.isBound()) {
    event_utils.EventManager.removeHandler(otherProperty, 'changed', this._properties.binding);
    this._properties.binding = undefined;
  }
};
Property.prototype.isBound = function () {
  return this._properties.binding != undefined;
};
Property.prototype.bindBidirectional = function (otherProperty) {
  if (this.isBound() || otherProperty === this) return;

  this.bind(otherProperty);
  otherProperty.bind && otherProperty.bind(this);
};
Property.prototype.unbindBidirectional = function (otherProperty) {
  this.unbind(otherProperty);
  otherProperty.unbind && otherProperty.unbind(this);
};
/** ReadOnleyPropertyインターフェース */
Property.prototype.getBean = function () {
  return this._properties.value;
};
/** WritabledValueインタフェース */
Property.prototype.getValue = function () {
  return this._properties.value;
};
Property.prototype.setValue = function (value) {
  var args = {oldValue: this._properties.value, newValue: value};
  this._properties.value = value;
  this.triggerEvent('changed', args);
};

var prop1 = new Property("foo");
var prop2 = new Property("bar");
console.log("instance property:");
console.log("  prop1.value:" + prop1.getValue());
console.log("  prop2.value:" + prop2.getValue());
console.log();

prop2.bind(prop1);
console.log("prop2.isBound:" + prop2.isBound());

console.log("prop1.value = 'hoge'");
prop1.setValue("hoge");
console.log("  prop1.value:" + prop1.getValue());
console.log("  prop2.value:" + prop2.getValue());
console.log();

prop2.unbind(prop1);
console.log("prop2.isBound:" + prop2.isBound());

console.log("prop1.value = 'hogehoge'");
prop1.setValue("hogehoge");
console.log("  prop1.value:" + prop1.getValue());
console.log("  prop2.value:" + prop2.getValue());
console.log();

console.log("bindBidirectional Test:");
prop2.bindBidirectional(prop1);
console.log("  prop1.isBound:" + prop1.isBound());
console.log("  prop2.isBound:" + prop2.isBound());
console.log();

console.log("prop1.value = 'hoge'");
prop1.setValue("hoge");
console.log("  prop1.value:" + prop1.getValue());
console.log("  prop2.value:" + prop2.getValue());
console.log();

console.log("prop2.value = 'hogehoge'");
prop2.setValue("hogehoge");
console.log("  prop1.value:" + prop1.getValue());
console.log("  prop2.value:" + prop2.getValue());
console.log();

console.log("unbindBidirectional Test:");
prop2.unbindBidirectional(prop1);
console.log("  prop1.isBound:" + prop1.isBound());
console.log("  prop2.isBound:" + prop2.isBound());
