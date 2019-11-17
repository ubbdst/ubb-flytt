export default {
  title: 'Part',
  name: 'part',
  type: 'object',
  fields: [
    {
      title: 'Classified as',
      name: 'hasType',
      description: 'WIP, should use API',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
        service: 'AAT',
        childOf: 'aat:1000000'
      },
      validation: Rule => Rule.required()
    },
    {
      title: 'Consists of',
      name: 'consistsOf',
      description: 'WIP, could be a API call to some source of authorities',
      type: 'array',
      of: [
        {type: 'reference',
          to: [
            {type: 'material'}
          ]
        }
      ]
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
      type: 'hasType',
      value: 'value',
      unit: 'hasUnit'
    },
    prepare (selection) {
      const {type, value, unit} = selection
      return {
        title: `${type || 'Not enough information'}`
      }
    }
  }
}
