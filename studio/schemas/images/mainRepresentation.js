export default {
  name: 'mainRepresentation',
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
      type: 'localeString'
    }
  ],
  preview: {
    select: {
      imageUrl: 'asset.url',
      title: 'caption'
    }
  }
}
