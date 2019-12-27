export default {
  name: 'figure',
  title: 'Image',
  type: 'image',
  options: {
    hotspot: true,
    metadata: ['exif', 'location', 'lqip', 'palette']
  },
  fields: [
    {
      title: 'Caption',
      name: 'caption',
      type: 'string',
      options: {
        isHighlighted: true
      }
    },
    {
      title: 'Alternative text',
      name: 'alt',
      description: 'Important for SEO and accessiblity.',
      type: 'string',
      options: {
        isHighlighted: true
      },
      validation: Rule => Rule.warning('You should fill out the alternative text.')
    }
  ],
  preview: {
    select: {
      imageUrl: 'asset.url',
      title: 'caption'
    }
  }
}
