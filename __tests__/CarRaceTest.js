let Race;
let Car;

beforeAll(async () => {
  const RaceModule = await import("../src/Race.js");
  Race = RaceModule.default;
  const CarModule = await import("../src/Car.js");
  Car = CarModule.default;
});

describe("Car", () => {
  test("move: true면 전진, false면 정지", () => {
    const c = new Car("a");
    expect(c.position).toBe(0);
    c.move(false);
    expect(c.position).toBe(0);
    c.move(true);
    expect(c.position).toBe(1);
  });
});

describe("Race", () => {
  test("경계값 검증: 3(정지), 4(전진)", () => {
    const seq = [3, 4];
    let idx = 0;
    const rng = () => {
      const v = seq[idx % seq.length];
      idx += 1;
      return v;
    };
    const race = new Race(["a", "b"], rng);
    race.run(1);

    const snap = race.roundResults[0];
    expect(snap[0].pos).toBe(0);
    expect(snap[1].pos).toBe(1);
  });

  test("우승자 복수", () => {
    const seq = [9, 9, 9, 9];
    let i = 0;
    const rng = () => {
      const v = seq[i % seq.length];
      i += 1;
      return v;
    };
    const race = new Race(["x", "y"], rng);
    race.run(2);
    expect(race.winners().sort()).toEqual(["x", "y"]);
  });
});
