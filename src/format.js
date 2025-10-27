function progressBar(count) {
  if (count <= 0) {
    return "";
  }
  return "-".repeat(count);
}

function lineOf(name, pos) {
  return `${name} : ${progressBar(pos)}`;
}

function winnersLine(names) {
  return `최종 우승자 : ${names.join(", ")}`;
}

module.exports = {
  lineOf,
  winnersLine,
};
