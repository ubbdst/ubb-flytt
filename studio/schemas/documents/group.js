import {FaUsers} from 'react-icons/fa'

export default {
  title: 'Group',
  name: 'group',
  type: 'document',
  icon: FaUsers,
  fieldsets: [
    {
      name: 'state',
      title: 'State',
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
      title: 'Name',
      name: 'label',
      type: 'localeString',
      validation: Rule => Rule.required()
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
            filterParams: {sysCat: 'Gruppetype'}
          }
        }
      ],
      validation: Rule => Rule.required()
    },
    {
      title: 'Description',
      name: 'description',
      type: 'localeBlock'
    },
    {
      title: 'Activity stream',
      description: 'Events and activities connected to this object',
      name: 'activityStream',
      type: 'array',
      of: [
        {type: 'formation'},
        {type: 'joining'},
        {type: 'leaving'},
        {type: 'dissolution'}
      ],
      options: {
        editModal: 'fullscreen'
      }
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
