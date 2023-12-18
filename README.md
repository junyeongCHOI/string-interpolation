# strings-interpolation

Elevate your JavaScript development with strings-interpolation, a powerful tool for crafting dynamic template strings with built-in default value functionality.

## Installation

```bash
npm install --save strings-interpolation
```

## API

### stringInterpolation(string: string, data: any): string

Dynamically interpolates a template string using provided data.

- Parameters:
  - string: The template string containing placeholders like {{ key }} or {{ key || defaultValue }}.
  - data: An object (Record<string, any>) matching keys in the template string.
- Returns: The interpolated string. If a key in the template is not found in the data object, the function uses the defaultValue specified in the template, or an empty string if no default is provided.

- Example:

  ```javascript
  const template = "Hello, {{name || guest}}! Score: {{score || 0}}";
  const interpolatedString = stringInterpolation(template, {
    name: "John",
    score: 42,
  });
  // Output: "Hello, John! Score: 42"
  ```

### parseInterpolation(string: string): string[]

Analyzes a template string and extracts the keys and their respective default values.

- Parameters:

  - string: A string containing template placeholders.
  - Returns: An array of keys used in the template. If a default value is provided for a key, it is included in the format key || defaultValue.

- Example:
  ```javascript
  const template =
    "Welcome, {{user || visitor}}! Your access level: {{level || standard}}";
  const keys = parseInterpolation(template);
  // Output: ["user", "level"]
  ```
