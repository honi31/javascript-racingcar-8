const validation = await import("../src/validation.js");

describe("validation", () => {
  test("이름 파싱 정상", () => {
    expect(validation.parseNames("pobi,woni,jun")).toEqual([
      "pobi",
      "woni",
      "jun",
    ]);
    expect(validation.parseNames(" a, b ")).toEqual(["a", "b"]);
  });

  test("이름 5자 초과 실패", () => {
    expect(() => validation.parseNames("abcdef")).toThrow("[ERROR]");
  });

  test("빈 이름 실패", () => {
    expect(() => validation.parseNames(",a")).toThrow("[ERROR]");
    expect(() => validation.parseNames("  ")).toThrow("[ERROR]");
  });

  test("시도 횟수 정수/양수", () => {
    expect(validation.parseRounds("5")).toBe(5);
    expect(() => validation.parseRounds("0")).toThrow("[ERROR]");
    expect(() => validation.parseRounds("-1")).toThrow("[ERROR]");
    expect(() => validation.parseRounds("1.5")).toThrow("[ERROR]");
    expect(() => validation.parseRounds("abc")).toThrow("[ERROR]");
  });
});
