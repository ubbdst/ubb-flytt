export default {
  title: 'Identifier',
  name: 'identifier',
  type: 'object',
  fields: [
    {
      title: 'Identifier',
      name: 'identifier',
      type: 'string'
    },
    {
      title: 'URL',
      name: 'url',
      type: 'url'
    },
    {
      title: 'Label',
      name: 'label',
      type: 'string'
    },
    {
      title: 'Description',
      name: 'description',
      type: 'array',
      of: [{type: 'block'}]
    }
  ],
  preview: {
    select: {
      identifier: 'identifier',
      label: 'label'
    },
    prepare (selection) {
      const {identifier, label} = selection
      return {
        title: `${identifier}${label ? ', ' + label : ''}`
      }
    }
  }
}
