// https://www.sanity.io/docs/what-you-need-to-know-about-block-text/presenting-block-text
import blocksToHtml from '@sanity/block-content-to-html'
import urlBuilder from '@sanity/image-url'
import client from '../sanityClient'
import Timeline from './Timeline'

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
    madeObject: ({ node }) =>
      h('figure', {},
        [h('img', {
        src: urlFor(node.mainRepresentation)
          .width(800)
          .auto('format')
          .url()
        }),
        h('figcaption', {}, [node.label, 
          h('a', {href: '/id/' + node._id, target: '_target'}, ' (Åpne i nytt vindu)')])
      ]),
    figure: ({ node }) =>
      h('figure', {}, [
        h('img', {
        src: urlFor(node)
          .width(800)
          .auto('format')
          .url(),
        alt: node.alt
        }),
        h('figcaption', {}, node.caption)
      ]),
    event: ({ node }) =>
      h('div',{class: 'media'}, [
        h('figure', {class: 'media-left'}, 
          h('p', {class: 'image is-64x64'},
            h('img', {
              src: urlFor(node.media)
                .width(800)
                .auto('format')
                .url(),
              alt: node.alt
              }
            )
          )
        ),
        h('div', {class: 'media-content'}, 
          h('div', {class: 'content'}, 
            h('h1', {}, 
              h('a', {'href': '/id/' + node._id}, node.label.nor)
            )
          )
        )
      ]),
    authorReference: ({ node }) => 
      h('b', {}, 
        h('a', {'href': '/id/' + node.author._id}, node.author.label)),
    instagramPost: ({ node }) => 
      h('b', {}, 
        h('a', {'href': node.url}, node.url)),
    code: ({ node }) =>
      h('pre', { 'data-language': node.language }, h('code', {}, node.code)),
    timeline: ({node}) => h('p', {}, 'Tidslinje er ikke implementert')
  }
}
