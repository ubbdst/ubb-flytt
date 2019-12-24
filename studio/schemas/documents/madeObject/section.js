export default {
  title: 'Section',
  name: 'section',
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
            filterParams: {sysCat: 'Seksjonstype'}
          }
        }
      ],
      validation: Rule => Rule.required()
    },
    {
      title: 'About',
      name: 'concerned',
      description: 'Which object(s) is this an feature of.',
      type: 'array',
      of: [
        {type: 'reference',
          to: [
            {type: 'madeObject'},
            {type: 'linguisticObject'}
          ],
          options: {
            filter: '_type == "madeObject" || _type == "linguisticObject" && references(*[_type == "typeClass" && label.nor in [$sysCat]]._id)',
            filterParams: {sysCat: 'Transkripsjon'}
          }
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
      type: 'hasType.0.label.nor'
    },
    prepare (selection) {
      const {type} = selection
      return {
        title: `${type || 'Not enough information'}`
      }
    }
  }
}
