// @flow

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


let d: null
d = null
d = undefined // error


let e: void
e = undefined
e = null // error


let f: ?string
f = 'bar'
f = undefined
f = null


let g: 'a'
g = 'a'
g = 'b' // error


// object type
let h: { prop1: string }

h = { prop1: 'hello' }
h.prop2 // error
h = { prop1: 5 } // error

// optional object type
let i: { foo: boolean }

i = { foo?: true }
i = {} // error

// exact object type
let j: {| foo: string |}

j = { foo: 'hello' }
j = { foo: 'Hello', bar: 'World!' } // error
