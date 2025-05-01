const PROTOCOL = /^([a-z][a-z\d+\-.]*:)?\/\//i;

export function isAbsoluteURL(url) {
  return PROTOCOL.test(url);
}
