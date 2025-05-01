export function isAsyncFunction(value) {
  return Object.prototype.toString.call(value) === '[object AsyncFunction]';
}
