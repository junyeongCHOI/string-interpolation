# string-interpolation

String template with default value.

# 🛠Install

```bash
npm install --save string-interpolation
```

# 💅 Basic Usage

## stringInterpolation(string: string, data: any)

String interpolation function.

- string: Template string that includes {{ key }} or {{ key || defaultValue }}.
- data: Data(Record<string, string> or string[]) to match key in template string.
- If data[key] is falsy value (false, 0, -0, 0n, "", null, undefined, NaN), will return defaultValue or "".  
  **Data must be flat.**

```js
const t = "Hello, {{name || dude}}!";
stringInterpolate(t, { name: "준영" }); // "Hello, 준영!"
stringInterpolate(t, {}); // "Hello, dude!"
```

## parseInterpolation(string: string)

Parse interpolation function

- string: String that includes {{ key }} or {{ key || defaultValue }}.

```js
const t = "Hello, {{name || dude}}!";
parseInterpolation(t); // [{key: name, defaultValue: "dude"}]
```
