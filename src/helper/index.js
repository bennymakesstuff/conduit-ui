
/**
 * Unwraps a Proxy Object and returns a regular object
 * @param  {Proxy}
 * @return {object}
 */
export function unwrapProxy(data) {
  return JSON.parse(JSON.stringify(data));
}
