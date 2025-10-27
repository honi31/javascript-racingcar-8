function errorWithPrefix(msg) {
  return new Error(`[ERROR] ${msg}`);
}

export function parseNames(raw) {
  if (typeof raw !== "string") {
    throw errorWithPrefix("자동차 이름 입력이 문자열이 아닙니다.");
  }

  const tokens = raw.split(",").map((s) => s.trim());

  if (tokens.length === 0) {
    throw errorWithPrefix("자동차 이름을 하나 이상 입력해야 합니다.");
  }

  for (let i = 0; i < tokens.length; i += 1) {
    const name = tokens[i];
    if (name.length === 0) {
      throw errorWithPrefix("빈 이름은 허용되지 않습니다.");
    }
    if (name.length > 5) {
      throw errorWithPrefix("자동차 이름은 5자 이하여야 합니다.");
    }
  }

  return tokens; // 중복 허용
}

function parseRounds(raw) {
  if (typeof raw !== "string") {
    throw errorWithPrefix("시도 횟수 입력이 문자열이 아닙니다.");
  }
  const trimmed = raw.trim();
  if (trimmed.length === 0) {
    throw errorWithPrefix("시도 횟수를 입력해야 합니다.");
  }
  const n = Number(trimmed);
  if (!Number.isInteger(n)) {
    throw errorWithPrefix("시도 횟수는 정수여야 합니다.");
  }
  if (n <= 0) {
    throw errorWithPrefix("시도 횟수는 1 이상의 정수여야 합니다.");
  }
  return n;
}

module.exports = {
  errorWithPrefix,
  parseNames,
  parseRounds,
};
