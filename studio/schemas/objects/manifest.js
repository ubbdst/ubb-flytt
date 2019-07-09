export default {
  title: 'Manifest',
  name: 'manifest',
  type: 'object',
  fields: [
    {
      title: 'Manifest URL',
      name: 'url',
      type: 'url'
    }
  ],
  preview: {
    select: {
      name: 'url'
    },
    prepare (selection) {
      const {url} = selection
      return {
        title: `${url}`
      }
    }
  }
}
