
function squareIntToString(x) {
  if (!Number.isInteger(x)) {
    throw new Error('Parameter must be integer')
  }

  return `Square of ${x} is ${x * x}`
}

// const b = squareIntToString({})

// b
