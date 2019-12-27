import {FaEmpire} from 'react-icons/fa'

export default {
  title: 'Period',
  name: 'period',
  description: 'Should be fetched from KulturNav',
  type: 'document',
  icon: FaEmpire,
  fieldsets: [
    {
      name: 'state',
      title: 'State',
      options: {collapsible: true, collapsed: false}
    },
    {
      name: 'minimum',
      title: 'Mandatory fields for minimum registration',
      options: {collapsible: true, collapsed: false}
    }
  ],
  fields: [
    {
      title: 'Redaksjonell status',
      titleEN: 'Editorial state',
      name: 'editorialState',
      type: 'string',
      fieldset: 'state',
      validation: Rule => Rule.required(),
      options: {
        list: [
          {title: 'Utkast', value: 'workingDraft'},
          {title: 'Trenger gjennomgang', value: 'review'},
          {title: 'Publisert', value: 'published'}
        ],
        layout: 'radio',
        direction: 'horizontal'
      }
    },
    {
      title: 'Tilgangsstatus',
      titleEN: 'Access state',
      name: 'accessState',
      type: 'string',
      fieldset: 'state',
      validation: Rule => Rule.required(),
      options: {
        list: [
          {title: 'Privat', value: 'secret'},
          {title: 'Open', value: 'open'}
        ],
        layout: 'radio',
        direction: 'horizontal'
      }
    },
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
            filterParams: {sysCat: 'Hendelsestype'}
          }
        }
      ],
      validation: Rule => Rule.required()
    },
    {
      title: 'Title',
      name: 'label',
      fieldset: 'minimum',
      type: 'localeString',
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
  ],
  preview: {
    select: {
      type: 'hasType.0.label.nor',
      title: 'label.nor'
    },
    prepare (selection) {
      const {title, type} = selection

      return {
        title: title,
        subtitle: type
      }
    }
  }
}
