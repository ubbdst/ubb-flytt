export default {
  title: 'Experimental',
  name: 'experimental',
  type: 'document',
  fields: [
    {
      title: 'Title',
      name: 'label',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      title: 'Github search',
      description: 'Experimental feature',
      name: 'repos',
      type: 'array',
      of: [
        {type: 'apiMetadata'}
      ],
      validation: Rule => Rule.required().unique()
    }
  ]
}
