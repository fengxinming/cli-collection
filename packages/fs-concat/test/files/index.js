const PROTOCOL = /^([a-z][a-z\d+\-.]*:)?\/\//i;

export function isAbsoluteURL(url) {
  return PROTOCOL.test(url);
}

export function isAsyncFunction(value) {
  return Object.prototype.toString.call(value) === '[object AsyncFunction]';
}

export function isBoolean(value) {
  return typeof value === 'boolean';
}

export function isDate(value) {
  return value instanceof Date;
}

const FALSY = [false, null, undefined, 0, ''];

export function isFalsy(bool) {
  return FALSY.indexOf(bool) !== -1 || !bool;
}

export function isFunction(value) {
  return typeof value === 'function';
}

export function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

export function isNil(value) {
  /* eslint eqeqeq: 0 */
  return value == null;
}

export function isNumber(value) {
  return typeof value === 'number';
}

export function isObject(value) {
  return value !== null && typeof value === 'object';
}

export function isPlainObject(value) {
  return !!value && Object.prototype.toString.call(value) === '[object Object]';
}

export function isRegExp(value) {
  return value instanceof RegExp;
}

export function isString(value) {
  return typeof value === 'string';
}

export function isUndefined(value) {
  return typeof value === 'undefined';
}

export function isWindow(elem) {
  return !!elem && elem === elem.window;
}

