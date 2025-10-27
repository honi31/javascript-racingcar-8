const { Console, Random } = require("@woowacourse/mission-utils");
const {
  parseNames,
  parseRounds,
  errorWithPrefix,
} = require("./src/validation");
const { lineOf, winnersLine } = require("./src/format");
const Race = require("./src/Race");

class App {
  async run() {
    try {
      const rawNames = await Console.readLineAsync(
        "경주할 자동차 이름을 입력하세요.(이름은 쉼표(,) 기준으로 구분)\n"
      );
      const names = parseNames(rawNames);

      const rawRounds = await Console.readLineAsync(
        "시도할 횟수는 몇 회인가요?\n"
      );
      const rounds = parseRounds(rawRounds);

      Console.print("\n실행 결과");

      const rng = () => Random.pickNumberInRange(0, 9);

      const race = new Race(names, rng);
      race.run(rounds);

      // 라운드별 출력 (라운드 사이 빈 줄 포함)
      for (let r = 0; r < race.roundResults.length; r += 1) {
        const snapshot = race.roundResults[r];
        for (let i = 0; i < snapshot.length; i += 1) {
          Console.print(lineOf(snapshot[i].name, snapshot[i].pos));
        }
        Console.print("");
      }

      // 최종 우승자
      const winners = race.winners();
      if (winners.length === 0) {
        throw errorWithPrefix("우승자 계산에 실패했습니다.");
      }
      Console.print(winnersLine(winners));
    } catch (err) {
      if (err && err.message && String(err.message).startsWith("[ERROR]")) {
        Console.print(err.message);
        return;
      }

      Console.print("[ERROR] 예기치 못한 오류가 발생했습니다.");
    }
  }
}

export default App;
