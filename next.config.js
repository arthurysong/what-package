// const withMDX = require('@next/mdx')()
// module.exports = withMDX()

// next.config.js
const withMDX = require('@next/mdx')({
  extension: /\.mdx$/
})
module.exports = withMDX({
  pageExtensions: ['js', 'jsx', 'tsx', 'mdx']
})