// https://www.sanity.io/docs/what-you-need-to-know-about-block-text/presenting-block-text
import blocksToHtml from '@sanity/block-content-to-html'
// https://www.npmjs.com/package/@sanity/image-url
import urlBuilder from '@sanity/image-url'
import client from '../sanityClient'

const urlFor = source => urlBuilder(client).image(source)

const { h } = blocksToHtml

export default {
  types: {
    mainImage: ({ node }) =>
      h('img', {
        src: urlFor(node)
          .width(600)
          .auto('format')
          .url()
      }),
    reference: ({ node }) =>
      h('figure', {},
        [h('img', {
        src: urlFor(node.mainRepresentation)
          .width(600)
          .auto('format')
          .url()
        }),
        h('figcaption', {}, node.label)
      ]),
    authorReference: ({ node }) => h('b', {}, h('a', {'href': '/id/' + node.author._id}, node.author.label)),
    code: ({ node }) =>
      h('pre', { 'data-language': node.language }, h('code', {}, node.code))
  }
}
