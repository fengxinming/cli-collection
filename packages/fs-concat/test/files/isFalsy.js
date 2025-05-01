const FALSY = [false, null, undefined, 0, ''];

export function isFalsy(bool) {
  return FALSY.indexOf(bool) !== -1 || !bool;
}
