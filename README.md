# strings-interpolation

Strings template with default value.

# 🛠Install

```bash
npm install --save strings-interpolation
```

# 💅 Basic Usage

## stringInterpolation(string: string, data: any)

String interpolation function.

- string: Template string that includes {{ key }} or {{ key || defaultValue }}.
- data: Data(Record<string, any>) to match key in template string.
- If data[key] is undefined or null, will return defaultValue or "".

```js
const t = "Hello, {{name || dude}}! {{info.age || 0}}";
stringInterpolate(t, { name: "준영", info: { age: 25 } }); // "Hello, 준영! 25"
stringInterpolate(t, {}); // "Hello, dude! 0"
```

## parseInterpolation(string: string)

Parse interpolation function

- string: String that includes {{ key }} or {{ key || defaultValue }}.

```js
const t = "Hello, {{name || dude}}!";
parseInterpolation(t); // ["name"]
```
