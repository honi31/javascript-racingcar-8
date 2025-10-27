class Car {
  constructor(name) {
    this._name = name;
    this._position = 0;
  }

  get name() {
    return this._name;
  }

  get position() {
    return this._position;
  }

  move(canAdvance) {
    if (canAdvance) {
      this._position += 1;
    }
  }
}

module.exports = Car;
