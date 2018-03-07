// @flow

function squareIntToString(x: number): string {
  if (!Number.isInteger(x)) {
    throw new Error('Parameter must be integer')
  }

  return `Square of ${x} is ${x * x}`
}

// const b = squareIntToString({})

// b
