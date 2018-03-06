/* ADD FLOW COMMENT HERE */

let a: boolean
a = true
a = false
a = 0 // error


let b: number
b = 42
b = 3.14
b = NaN
b = Infinity
b = 'foo' // error


let c: string
c = 'foo'
c = 'foo' + 42
c = 'foo' + {} // error


function onlyBoolean(value: boolean) {
}

let res
res = onlyBoolean(true)
res = onlyBoolean('foo') // error
res = onlyBoolean(null) // error


function onlyTakingNull(value: null) {
}

onlyTakingNull(null)
onlyTakingNull(undefined) // error
onlyTakingNull(5) // error


function onlyUndefined(value: void) {
}

onlyUndefined(undefined)
onlyUndefined(null) // error
onlyUndefined(5) // error


function maybeType(value: ?number) {
}

maybeType(5)
maybeType(null)
maybeType(undefined)
