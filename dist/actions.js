"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.changeSelectedColor = exports.updateTheme = exports.selectValue = exports.setCurrent = void 0;

var _selectors = require("./selectors");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var setCurrent = function setCurrent(store, ind, api) {
  // api is undefined? unable to set query params for theme index
  // api.setQueryParams({
  //   themeInd: ind,
  // });
  return _objectSpread(_objectSpread({}, store), {}, {
    currentTheme: ind
  });
};

exports.setCurrent = setCurrent;

var selectValue = function selectValue(store, _ref) {
  var name = _ref.name,
      namespace = _ref.namespace,
      type = _ref.type;
  return _objectSpread(_objectSpread({}, store), {}, {
    selectedValue: {
      name: name,
      namespace: namespace,
      type: type
    }
  });
};

exports.selectValue = selectValue;

var updateTheme = function updateTheme(store, ind, newTheme) {
  var themesList = store.themesList;

  var newThemesList = _toConsumableArray(themesList);

  newThemesList[ind] = newTheme;

  var newStore = _objectSpread(_objectSpread({}, store), {}, {
    themesList: newThemesList
  });

  return newStore;
};

exports.updateTheme = updateTheme;

var mutateObj = function mutateObj(obj, namespace, key, value) {
  var nestedObj = namespace.reduce(function (subObj, subKey) {
    return subObj[subKey];
  }, obj);
  nestedObj[key] = value;
};

var changeSelectedColor = function changeSelectedColor(store, color) {
  var selected = (0, _selectors.getSelectedValue)(store);
  if (!selected) return store;
  var name = selected.name,
      namespace = selected.namespace;
  var theme = (0, _selectors.getTheme)(store);
  var ind = (0, _selectors.getCurrentInd)(store);
  var themeClone = JSON.parse(JSON.stringify(theme));
  mutateObj(themeClone, namespace, name, color);
  return updateTheme(store, ind, themeClone);
};

exports.changeSelectedColor = changeSelectedColor;