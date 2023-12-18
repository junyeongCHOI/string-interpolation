import { parseInterpolation } from "../src/index";

describe("parseInterpolation", () => {
  it("should match single key", () => {
    const parsed = parseInterpolation(
      "test {{test || defaultValue}} test {{tags.test || defaultValue}}"
    );
    expect(parsed).toEqual(["test", "tags.test"]);
  });

  it("should match single key without defaultValue", () => {
    const parsed = parseInterpolation("test {{test}} test {{tags.test}}");
    expect(parsed).toEqual(["test", "tags.test"]);
  });

  it("should match multiple keys", () => {
    const parsed = parseInterpolation(
      "test {{test || defaultValue}} {{test}} {{tags.test}} {{tags.test}}"
    );
    expect(parsed).toEqual(["test", "tags.test"]);
  });

  it("should match multiple keys 2", () => {
    const parsed = parseInterpolation(
      "test {{test || defaultValue}} {{test2 || defaultValue2}} {{tags.test}} {{tags.test.test || defaultValue3}}"
    );
    expect(parsed).toEqual(["test", "test2", "tags.test", "tags.test.test"]);
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
      "test {{ test }} {{     default  ||   defaultValue     }} {{     test   }} {{        tags.test }}"
    );
    expect(parsed).toEqual(["test", "default", "tags.test"]);
  });
});
