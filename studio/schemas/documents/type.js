export default {
  title: 'Type',
  name: 'typeClass',
  type: 'document',
  fields: [
    {
      title: 'Preferred label',
      name: 'prefLabel',
      type: 'localeString'
    },
    {
      title: 'Alternative label',
      name: 'altLabel',
      type: 'localeString'
    },
    {
      title: 'Domain',
      name: 'domain',
      type: 'array',
      of: [
        {type: 'reference', to: [{type: 'typeClass'}]}
      ]
    },
    {
      title: 'Broader',
      name: 'broader',
      type: 'array',
      of: [
        {type: 'reference', to: [{type: 'typeClass'}]}
      ]
    },
    {
      title: 'Narrower',
      name: 'narrower',
      type: 'array',
      of: [
        {type: 'reference', to: [{type: 'typeClass'}]}
      ]
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
  ],
  preview: {
    select: {
      title: 'prefLabel.nor'
    },
    prepare (selection) {
      const {title} = selection
      return {
        title: title
      }
    }
  }
}
