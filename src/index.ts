function traverseAndFlatten(
  currentNode: Record<string, any>,
  target: Record<string, any>,
  prefix = ""
) {
  Object.entries(currentNode).forEach(([key, value]) => {
    const newKey = prefix ? `${prefix}.${key}` : key;

    if (typeof value === "object" && value !== null) {
      traverseAndFlatten(value, target, newKey);
    } else {
      target[newKey] = value;
    }
  });
}

function flatten(obj: Record<string, any>): Record<string, string> {
  const flattenedObject = {};
  traverseAndFlatten(obj, flattenedObject);
  return flattenedObject;
}

const regex = /\{\{([^{}]+)\}\}/g;

function interpolateValue(match: string, data: Record<string, any>) {
  const [key, defaultValue = ""] = match.split("||").map((v) => v.trim());
  return data[key] ?? defaultValue;
}

export const stringInterpolation = (template: string, data: object) => {
  if (typeof template !== "string" || typeof data !== "object") return;
  const flattenedData = flatten(data);
  return template.replace(regex, (match) =>
    interpolateValue(match.slice(2, -2), flattenedData)
  );
};

export const parseInterpolation = (template: string) => {
  if (typeof template !== "string") return;
  const matches = template.match(regex);
  return matches
    ?.map((match) => match.slice(2, -2).split("||")[0].trim())
    .filter((value, index, self) => self.indexOf(value) === index);
};
