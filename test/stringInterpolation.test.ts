import { stringInterpolation } from "../src/index";

describe("stringInterpolation", () => {
  it("should match single key", () => {
    const interpolated = stringInterpolation("test {{test}} test", {
      test: "test",
    });
    expect(interpolated).toEqual("test test test");
  });

  it("should match single key + }", () => {
    const interpolated = stringInterpolation("test {{test}}} test", {
      test: "test",
    });
    expect(interpolated).toEqual("test test} test");
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

  it("should match not undefined falsy value", () => {
    const interpolated = stringInterpolation("test {{null}} {{zero}}", {
      null: null,
      zero: 0,
    });
    expect(interpolated).toEqual("test  0");
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

  // with object
  it("should not match if null (with object)", () => {
    const interpolated = stringInterpolation(
      "test {{tags.test}} {{test.test.test}} test",
      {
        tags: null,
      }
    );
    expect(interpolated).toEqual("test   test");
  });

  it("should match single key (with object)", () => {
    const interpolated = stringInterpolation(
      "test {{tags.test}} {{test.test.test}} test",
      {
        tags: { test: "test" },
        test: { test: { test: "test" } },
      }
    );
    expect(interpolated).toEqual("test test test test");
  });

  it("should match single key (with object)", () => {
    const interpolated = stringInterpolation(
      "test {{test}} {{tags.test}} test",
      {
        tags: { test: "test" },
        test: "test",
      }
    );
    expect(interpolated).toEqual("test test test test");
  });

  it("should match multiple keys (with object)", () => {
    const interpolated = stringInterpolation(
      "test {{tags.test}} {{tags.test}}",
      {
        tags: { test: "test" },
      }
    );
    expect(interpolated).toEqual("test test test");
  });

  it("should match multiple keys (with object)", () => {
    const interpolated = stringInterpolation(
      "test {{test}} {{tags.test}} {{tags.test}} {{test2.test.test}}",
      {
        tags: { test: "test" },
        test: "test",
        test2: { test: { test: "test" } },
      }
    );
    expect(interpolated).toEqual("test test test test test");
  });

  it("should not match wrong key (with object)", () => {
    const interpolated = stringInterpolation(
      "test {{tags.test}} {{tags.test}}",
      {
        tags: { test: "test" },
        wrongKey: "wrongKey",
      }
    );
    expect(interpolated).toEqual("test test test");
  });

  it("should match defaultValue (with object)", () => {
    const interpolated = stringInterpolation(
      "test {{tags.test || defaultValue}} {{test.test.test || defaultValue}} test",
      {
        tags: {},
      }
    );
    expect(interpolated).toEqual("test defaultValue defaultValue test");
  });

  it("should match not undefined falsy value (with object)", () => {
    const interpolated = stringInterpolation("test {{null}} {{zero}}", {
      null: null,
      zero: 0,
    });
    expect(interpolated).toEqual("test  0");
  });

  it("should return same string (with object)", () => {
    const interpolated = stringInterpolation("test", {
      tags: { test: "test" },
    });
    expect(interpolated).toEqual("test");
  });

  it("should match even if string has weird indent (with object)", () => {
    const interpolated = stringInterpolation(
      "test {{ test }} {{     default  ||   defaultValue     }} {{     test2.test.test   }} {{test.test.test.test}}",
      {
        test: "test",
        test2: { test: { test: "test" } },
      }
    );
    expect(interpolated).toEqual("test test defaultValue test ");
  });
});
