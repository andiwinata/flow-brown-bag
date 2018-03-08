
function squareIntToString(x) {
  // take number only
  if (!isNumeric(x)) {
    throw new Error('Parameter must be number')
  }

  return `Square of ${x} is ${x * x}`
}

// const b = squareIntToString(5)

// b


















function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}
