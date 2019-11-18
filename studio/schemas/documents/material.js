export default {
  title: 'Material',
  name: 'material',
  type: 'document',
  fields: [
    {
      title: 'Label',
      name: 'label',
      type: 'string',
      validation: Rule => Rule.required()
    }
  ]
}
