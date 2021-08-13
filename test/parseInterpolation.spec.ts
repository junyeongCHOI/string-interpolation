import { parseInterpolation } from "../src/index";

describe("parseInterpolation", () => {
  it("should match single key", () => {
    const parsed = parseInterpolation("test {{test || defaultValue}} test");
    expect(parsed).toEqual(["test"]);
  });

  it("should match single key without defaultValue", () => {
    const parsed = parseInterpolation("test {{test}} test");
    expect(parsed).toEqual(["test"]);
  });

  it("should match multiple keys", () => {
    const parsed = parseInterpolation("test {{test || defaultValue}} {{test}}");
    expect(parsed).toEqual(["test"]);
  });

  it("should match multiple keys 2", () => {
    const parsed = parseInterpolation(
      "test {{test || defaultValue}} {{test2 || defaultValue2}}"
    );
    expect(parsed).toEqual(["test", "test2"]);
  });

  it("should match multiple keys without defaultValue", () => {
    const parsed = parseInterpolation("test {{test}} {{test}}");
    expect(parsed).toEqual(["test"]);
  });

  it("should return same string", () => {
    const parsed = parseInterpolation("test");
    expect(parsed).toEqual(undefined);
  });

  it("should match even if string has weird indent", () => {
    const parsed = parseInterpolation(
      "test {{ test }} {{     default  ||   defaultValue     }} {{     test   }}"
    );
    expect(parsed).toEqual(["test", "default"]);
  });
});
