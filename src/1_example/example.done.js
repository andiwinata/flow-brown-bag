// @flow

function squareIntToString(x: number): string {
  if (!isNumeric(x)) {
    throw new Error('Parameter must be number')
  }

  return `Square of ${x} is ${x * x}`
}

// const b = squareIntToString({})

// b















function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}
