export default {
  name: 'authorReference',
  type: 'object',
  title: 'Author reference',
  fields: [
    {
      name: 'author',
      type: 'reference',
      to: [
        {
          type: 'actor'
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'author.label',
      media: 'author.image.asset'
    }
  }
}
