import { stringInterpolation } from "../src/index";

describe("stringInterpolation", () => {
  it("should match single key", () => {
    const interpolated = stringInterpolation("test {{test}} test", {
      test: "test",
    });
    expect(interpolated).toEqual("test test test");
  });

  it("should match multiple keys", () => {
    const interpolated = stringInterpolation("test {{test}} {{test}}", {
      test: "test",
    });
    expect(interpolated).toEqual("test test test");
  });

  it("should not match wrong key", () => {
    const interpolated = stringInterpolation("test {{test}} {{test}}", {
      test: "test",
      wrongKey: "wrongKey",
    });
    expect(interpolated).toEqual("test test test");
  });

  it("should match array key", () => {
    const interpolated = stringInterpolation("test {{0}} {{1}}", [
      "test",
      "test",
    ]);
    expect(interpolated).toEqual("test test test");
  });

  it("should match defaultValue", () => {
    const interpolated = stringInterpolation(
      "test {{test || defaultValue}} test",
      {}
    );
    expect(interpolated).toEqual("test defaultValue test");
  });

  it("should match nothing", () => {
    const interpolated = stringInterpolation("test {{null}} {{zero}}", {
      null: null,
      zero: 0,
    });
    expect(interpolated).toEqual("test  ");
  });

  it("should return same string", () => {
    const interpolated = stringInterpolation("test", { test: "test" });
    expect(interpolated).toEqual("test");
  });

  it("should match even if string has weird indent", () => {
    const interpolated = stringInterpolation(
      "test {{ test }} {{     default  ||   defaultValue     }} {{     test   }}",
      {
        test: "test",
      }
    );
    expect(interpolated).toEqual("test test defaultValue test");
  });
});
