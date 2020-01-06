export default {
  name: 'imageCompare',
  title: 'Compare images',
  type: 'object',
  fields: [
    {
      name: 'label',
      title: 'Tittel',
      titleEN: 'Title',
      description: '',
      descriptionEN: '',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'before',
      title: 'Before',
      type: 'array',
      of: [
        {type: 'figure'},
        {type: 'reference',
          to: [
            {type: 'madeObject'}
          ]
        }
      ],
      validation: Rule => Rule.required()
    },
    {
      name: 'after',
      title: 'After',
      type: 'array',
      of: [
        {type: 'figure'},
        {type: 'reference',
          to: [
            {type: 'madeObject'}
          ]
        }
      ],
      validation: Rule => Rule.required()
    }
  ],
  preview: {
    select: {
      title: 'label'
    }
  }
}
