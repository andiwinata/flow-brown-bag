// @flow

// a.js
type CustomType = {
  foo: number,
  bar: 'literal'
}

export type { CustomType }

// b.js
import type { CustomType } from 'a'

let k: CustomType

k = { foo: 5, bar: 'literal' }
k = { foo: 'hello', bar: 7 } // error


// union type
// ONE of different types
let h: number | boolean | 'literal'
h = 5
h = true
h = 'literal'
h = 'hello' // error


// intersection type
// ALL of different types
type A = { a: number }
type B = { b: boolean }

type C = A & B

let c: C
c = { a: 5, b: true }
c = { a: '5', b: true } // error
c = { a: 5, b: 'true' } // error


// function type
type CustomFunc = (number, y: string) => void // can be named or not

let f1: CustomFunc = (x, y) => {}
let f2: CustomFunc = (x, z) => {} // no error, name does not matter

let f3: CustomFunc = (x) => {} // no error
f3(5) // error, requires another argument

let f4: CustomFunc = (x, y) => { return x } // error, incompatible return type

let f5: Function

f5 = () => { }
f5 = function () { }
f5 = 'hello' // error, incompatible type


// array type
let arr1: Array<?number>
arr1 = [1, 2, null]
arr2 = ['a', 2, null] // error

let arr2: (?number)[] // same as before - parentheses is needed
arr2 = [null]
arr2 = null // error

let arr3: ?number[] // equal to ?Array<number>
arr3 = [null] // error
arr3 = null


// class type
class MyClass {
  prop: number

  method() {
    this.prop = 42
    this.prop = 'hello' // error
  }
}


class MyComponent extends Component {
  constructor() { this.state = { test: 5 } }

  render() {
    const { bar, foo } = this.props
    return <div>{bar * foo}</div>;
  }
}

MyComponent.propTypes = {
  bar: PropTypes.string,
  foo: PropTypes.number.isRequired,
};


// Stateless component

const CompA = props => {
  return <div>{props.bar}</div>
}

// @flow
type Props = {
  bar?: number,
}

const CompA = (props: Props) => {
  return <div>{props.bar}</div>
}

// ---

const CompA = ({ bar }) => {
  return <div>{props.bar}</div>
}

// @flow
const CompA = ({ bar }: { bar?: number}) => {
  return <div>{bar}</div>
}

// @flow
type Props = {
  bar?: number,
}

const CompA = ({ bar }: Props) => {
  return <div>{bar}</div>
}


// @flow
type State = {
  +foo: string
};

let state: State = {
  foo: "hello"
};

state.foo = "bar"; // error

// mixed type
let a: any

a = 5
a = 'hello'
a = null
a = undefined
a = () => {}


type keyValue = { key: number }

// mixed
const addProperty = (obj: mixed): keyValue  => {
  return { ...obj, key: 'not-a-number' } // error, type incompatible
}

// any
const addProperty = (obj: any): keyValue  => {
  return { ...obj, key: 'not-a-number' } // all good
}


// @flow
type Props = { name: string, age: number }
type DefaultProps = { age: number }

type RequiredProps = $Diff<Props, DefaultProps> // will be { name: string }

let p: RequiredProps
p = { name: 'hello' }
p = {} // error


// generics type
function identity<T>(value: T): T {
  return value;
}

// interface type
interface Serializable {
  serialize(): string;
}


let value = 42

(value: number)
(value: string) // error

// @flow

const getAuthor = (asset: Asset): string => {
  const { asset: article = {}, participants } = asset
  const { authors } = participants || {}

  // if `asset.article.byline` exist
  if (article.byline) {
    return article.byline
  }

  // otherwise return `asset.participants.authors.map().join()`
  return authors
    .map(authorItem => authorItem.name)
    .join(', ')
}

// @flow

const getAuthor = (asset: Asset): string => {
  const { asset: article = {}, participants } = asset
  const { authors } = participants || {}

  // if `asset.article.byline` exist
  if (article.byline) {
    return article.byline
  }

  // otherwise return `asset.participants.authors.map().join()`
  return authors
    .map(authorItem => authorItem.displayName) // error, no 'displayName' field in Author
    .join(', ')
}

// @flow

const getAuthor = (asset: Asset): string => {
  const { asset: article = {}, participants } = asset
  const { authors } = participants || {}

  // if `asset.article.byline` exist
  if (article.byline) {
    return article.byline
  }

  // otherwise return `asset.participants.authors.map().join()`
  return authors
    .map(authorItem => authorItem.displayName) // error, type Array is incompatible with string
}

declare type Asset = {
  participants: ?AssetParticipants;
}

const asset: Asset = { participants: null }

// trying to get asset.participants.authors

const { participants = {} } = asset
const { authors } = participants // error, property `authors` is missing in null or undefined

const { participants } = asset
const { authors } = participants || {} // correct


type ExtractReturnType = <V, W>(() => $Keys<$Diff<V, W>>) => V

function run<A, O: {[key: string]: () => $ReadOnly<A>}>(o: O): $ObjMap<O, ExtractReturnType> {
 return Object.keys(o).reduce((acc, k) => (Object.assign(acc, { [k]: o[k]() }), {});
}