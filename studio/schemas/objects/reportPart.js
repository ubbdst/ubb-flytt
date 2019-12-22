export default {
  title: 'Report part',
  name: 'reportPart',
  type: 'object',
  fields: [
    {
      title: 'Classified as',
      name: 'hasType',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'typeClass'}],
          options: {
            filter: 'references(*[_type == "systemCategory" && label.nor in [$sysCat]]._id)',
            filterParams: {sysCat: 'Rapporttype'}
          }
        }
      ],
      validation: Rule => Rule.required()
    },
    {
      title: 'Condition',
      name: 'condition',
      description: '1 is horrible, 100 is MINT!',
      type: 'number',
      options: {
        layout: 'slider',
        range: {min: 1, max: 100, step: 1}
      }
    },
    {
      title: 'Attributes',
      name: 'attributes',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: [
          {title: 'Missing', value: 'missing'},
          {title: 'Damaged', value: 'damaged'},
          {title: 'Mint', value: 'mint'},
          {title: 'Fucked up', value: 'fuckedUp'}
        ]
      }
    }
  ],
  preview: {
    select: {
      type: 'hasType.label.nor',
      value: 'condition'
    },
    prepare (selection) {
      const {type, value} = selection
      return {
        title: type + ': ' + value + ' / 100'
      }
    }
  }
}
