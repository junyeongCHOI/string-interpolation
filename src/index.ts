function traverseAndFlatten(
  currentNode: Record<string, any>,
  target: Record<string, any>,
  flattenedKey?: string
) {
  for (var key in currentNode) {
    if (currentNode.hasOwnProperty(key)) {
      var newKey;
      if (flattenedKey === undefined) {
        newKey = key;
      } else {
        newKey = flattenedKey + "." + key;
      }

      var value = currentNode[key];
      if (typeof value === "object") {
        traverseAndFlatten(value, target, newKey);
      } else {
        target[newKey] = value;
      }
    }
  }
}

function flatten(obj: Record<string, any>): Record<string, string> {
  const flattenedObject = {};
  traverseAndFlatten(obj, flattenedObject);
  return flattenedObject;
}

const regex = /\{{[^{]+}}/g,
  or = "||",
  replacer = (match: string, data: any) => {
    const flattendedObject = flatten(data);

    const values = match
      .slice(2, -2)
      .split(or)
      .map((v) => v.trim());

    return flattendedObject[values[0]] === undefined
      ? values[1] === undefined
        ? ""
        : values[1]
      : flattendedObject[values[0]];
  },
  parserReplacer = (match: string) => {
    const values = match
      .slice(2, -2)
      .split(or)
      .map((values) => values.trim());
    return values[0];
  };

/**
 * String interpolation function.
 * @param string Template string that includes {{ key }} or {{ key || defaultValue }}.
 * @param data Data(Record<string, string> or string[]) to match key in template string.
 * If data[key] is falsy value (false, 0, -0, 0n, "", null, undefined, NaN), will return defaultValue or "".
 * __Data must be flat.__
 * @returns Interpolated template string.
 * @example
 * ```
 * const t = "Hello, {{name || dude}}!";
 * stringInterpolate(t, {name: "준영"}); // "Hello, 준영!"
 * stringInterpolate(t, {}); // "Hello, dude!"
 * ```
 * @author 최준영 <98.junyeong@gmail.com>
 */
export const stringInterpolation = (string: string, data: object) => {
  if (typeof string !== "string" || typeof data !== "object") return;
  return string.replace(regex, (match) => replacer(match, data));
};

/**
 * Parse interpolation function
 * @param string String that includes {{ key }} or {{ key || defaultValue }}.
 * @returns [{key: string, defaultValue: string | undefined}]
 * @example
 * ```
 * const t = "Hello, {{name || dude}}!";
 * parseInterpolation(t); // ["name"]
 * ```
 *  * @author 최준영 <98.junyeong@gmail.com>
 */
export const parseInterpolation = (string: string) => {
  if (typeof string !== "string") return;
  return string
    .match(regex)
    ?.map((match) => parserReplacer(match))
    .filter((key, index, array) => array.indexOf(key) === index);
};
