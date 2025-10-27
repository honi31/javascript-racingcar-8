jest.mock("@woowacourse/mission-utils", () => {
  return {
    Console: {
      readLineAsync: jest.fn(),
      print: jest.fn(),
    },
    Random: {
      pickNumberInRange: jest.fn(),
    },
  };
});

const { Console, Random } = require("@woowacourse/mission-utils");
const { run } = require("../App");

describe("App 통합", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("정상 플로우: 라운드/우승자 출력", async () => {
    Console.readLineAsync
      .mockResolvedValueOnce("pobi,woni,jun")
      .mockResolvedValueOnce("3");

    const seq = [4, 3, 0, 4, 4, 4, 3, 9, 4];
    let i = 0;
    Random.pickNumberInRange.mockImplementation(() => {
      const v = seq[i];
      i += 1;
      return v;
    });

    await run();

    const prints = Console.print.mock.calls.map((c) => c[0]);

    expect(prints[0]).toBe("\n실행 결과");
    expect(prints).toContainEqual("pobi : -");
    expect(prints).toContainEqual("woni : -");
    expect(prints).toContainEqual("jun : -");

    // 최종 우승자 존재
    const last = prints[prints.length - 1];
    expect(last.startsWith("최종 우승자 :")).toBe(true);
  });

  test("에러 플로우: 이름 6자 이상", async () => {
    Console.readLineAsync
      .mockResolvedValueOnce("abcdef")
      .mockResolvedValueOnce("3");

    await run();

    const prints = Console.print.mock.calls.map((c) => c[0]);
    expect(prints.some((s) => String(s).startsWith("[ERROR]"))).toBe(true);
  });
});
