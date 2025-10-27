const Car = require("./Car");

class Race {
  constructor(names, rng) {
    this.cars = names.map((n) => new Car(n));
    this.rng = rng;
    this.roundResults = [];
  }

  run(rounds) {
    for (let r = 0; r < rounds; r += 1) {
      this._runOneRound();
    }
  }

  _runOneRound() {
    const snapshot = [];
    for (let i = 0; i < this.cars.length; i += 1) {
      const value = this.rng(); // 0~9
      const canAdvance = value >= 4;
      this.cars[i].move(canAdvance);
      snapshot.push({ name: this.cars[i].name, pos: this.cars[i].position });
    }
    this.roundResults.push(snapshot);
  }

  winners() {
    let maxPos = 0;
    for (let i = 0; i < this.cars.length; i += 1) {
      if (this.cars[i].position > maxPos) {
        maxPos = this.cars[i].position;
      }
    }
    const result = [];
    for (let j = 0; j < this.cars.length; j += 1) {
      if (this.cars[j].position === maxPos) {
        result.push(this.cars[j].name);
      }
    }
    return result;
  }
}

module.exports = Race;
