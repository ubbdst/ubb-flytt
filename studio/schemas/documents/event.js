export default {
  title: 'Event',
  name: 'event',
  description: 'Should be fetched from KulturNav',
  type: 'document',
  fieldsets: [
    {
      name: 'minimum',
      title: 'Mandatory fields for minimum registration',
      options: {collapsible: true, collapsed: false}
    }
  ],
  fields: [
    {
      title: 'Classified as',
      name: 'hasType',
      description: 'WIP, should use API',
      fieldset: 'minimum',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
        service: 'aat',
        childOf: 'aat:1000000'
      },
      validation: Rule => Rule.required()
    },
    {
      title: 'Title',
      name: 'label',
      fieldset: 'minimum',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      title: 'Description',
      name: 'description',
      description: 'A shortish description',
      fieldset: 'minimum',
      type: 'localeBlock'
    },
    {
      title: 'Timespan',
      name: 'timespan',
      type: 'array',
      of: [{type: 'timespan'}],
      validation: Rule => Rule.length(1).warning('You should only register one timespan')
    },
    {
      title: 'Location',
      description: 'Where the hell did this happen?!',
      name: 'location',
      type: 'geopoint'
    },
    {
      title: 'Media',
      name: 'media',
      type: 'mediaObject'
    }
  ]
}
