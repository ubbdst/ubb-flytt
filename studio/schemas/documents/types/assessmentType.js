export default {
  title: 'Assessment type',
  name: 'assessmentType',
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
      description: 'Trenger vi narrower? Blir mye å registrere...',
      type: 'array',
      of: [
        {type: 'reference', to: [{type: 'typeClass'}]}
      ]
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
      title: 'prefLabel.nor',
      broader: 'broader.0.prefLabel.nor'
    },
    prepare (selection) {
      const {title, broader} = selection
      return {
        title: title,
        subtitle: broader ? `⬆️` + broader : '🔝 Overordnet type/konsept'
      }
    }
  }
}
