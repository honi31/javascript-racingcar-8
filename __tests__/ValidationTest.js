const { parseNames, parseRounds } = require("../src/validation");

describe("validation", () => {
  test("이름 파싱 정상", () => {
    expect(parseNames("pobi,woni,jun")).toEqual(["pobi", "woni", "jun"]);
    expect(parseNames(" a, b ")).toEqual(["a", "b"]);
  });

  test("이름 5자 초과 실패", () => {
    expect(() => parseNames("abcdef")).toThrow("[ERROR]");
  });

  test("빈 이름 실패", () => {
    expect(() => parseNames(",a")).toThrow("[ERROR]");
    expect(() => parseNames("  ")).toThrow("[ERROR]");
  });

  test("시도 횟수 정수/양수", () => {
    expect(parseRounds("5")).toBe(5);
    expect(() => parseRounds("0")).toThrow("[ERROR]");
    expect(() => parseRounds("-1")).toThrow("[ERROR]");
    expect(() => parseRounds("1.5")).toThrow("[ERROR]");
    expect(() => parseRounds("abc")).toThrow("[ERROR]");
  });
});
