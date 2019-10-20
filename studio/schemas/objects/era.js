export default {
  title: 'Era',
  name: 'era',
  type: 'object',
  fields: [
    {
      title: 'Headline',
      name: 'headline',
      type: 'string'
    },
    {
      text: 'Text',
      name: 'text',
      type: 'localeBlock'
    },
    {
      title: 'Start date',
      name: 'startDate',
      type: 'date'
    },
    {
      title: 'End date',
      name: 'endDate',
      type: 'date'
    }
  ]
}
