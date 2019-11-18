export default {
  title: 'Visual object',
  name: 'visualItem',
  type: 'document',
  fields: [
    {
      title: 'Title',
      name: 'label',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      title: 'Activity stream',
      description: 'Events and activities connected to this object',
      name: 'events',
      type: 'array',
      of: [
        {type: 'creation'}
      ]
    }
  ]
}
