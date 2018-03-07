// render-web Metadata/utils.js (modified)
// @flow

// taking an asset, then get all the authors into 1 string separated by comma (,)
const getAuthor = (asset: Asset): string => {
  const { participants } = asset
  const { authors } = participants || {}

  if (!authors) {
    return 'no author'
  }

  return authors
    .map(authorItem => authorItem.name)
    .join(', ')
}

const mockAsset1 = {
  participants: {
    authors: [
      { name: 'Bob' },
      { name: 'Alice' },
    ]
  }
}
const mockAsset2 = { asset: { participants: null } }

// const authors = getAuthor(mockAsset2)

// authors



const a = { b: null }

const { b = 'default value' } = a

const c = undefined || 'default value'

c
