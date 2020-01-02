export default {
  title: 'Section',
  name: 'section',
  description: 'Underklasse av Place',
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
      title: 'Location of',
      name: 'locationOf',
      description: 'Which object(s) is this an feature of.',
      type: 'array',
      of: [
        {type: 'reference',
          to: [
            {type: 'madeObject'}
          ]
        }
      ]
    },
    {
      title: 'Description',
      name: 'description',
      type: 'localeBlockSimple'
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
