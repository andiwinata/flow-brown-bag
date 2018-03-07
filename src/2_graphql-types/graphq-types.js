// render-web Metadata/utils.js (modified)

// taking an asset, then get all the authors into 1 string separated by comma (,)
const getAuthor = (asset) => {
  const { participants = {} } = asset
  const { authors } = participants

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
// const mockAsset2 = { asset: { participants: null } }

const authors = getAuthor(mockAsset1)

authors
