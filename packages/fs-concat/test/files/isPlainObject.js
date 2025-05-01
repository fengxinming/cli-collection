export function isPlainObject(value) {
  return !!value && Object.prototype.toString.call(value) === '[object Object]';
}
