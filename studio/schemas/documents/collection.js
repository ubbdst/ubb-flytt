import client from 'part:@sanity/base/client'
import {GiBookshelf} from 'react-icons/gi'

export default {
  title: 'Collection',
  name: 'collection',
  type: 'document',
  initialValue: {
    editorialState: 'workingDraft',
    accessState: 'secret'
  },
  icon: GiBookshelf,
  fieldsets: [
    {
      name: 'state',
      title: 'State',
      options: {collapsible: true, collapsed: false}
    }
  ],
  fields: [
    {
      name: 'editorialState',
      title: 'Redaksjonell status',
      titleEN: 'Editorial state',
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
      name: 'accessState',
      title: 'Tilgangsstatus',
      titleEN: 'Access state',
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
      name: 'label',
      title: 'Tittel',
      titleEN: 'Title',
      type: 'localeString',
      validation: Rule => Rule.required()
    },
    {
      name: 'preferredIdentifier',
      title: 'Foretrukket identifikator',
      titleEN: 'Preferred identifier',
      type: 'string',
      validation: Rule => Rule.required().custom(async prefId => {
        // eslint-disable-next-line no-template-curly-in-string
        const docs = await client.fetch('*[preferredIdentifier == "${prefId}" && !(_id in path("drafts.**"))] { preferredIdentifier }', {prefId})
        return docs.length > 1 ? 'Value is not unique' : true
      })
    },
    {
      name: 'description',
      title: 'Beskrivelse',
      titleEN: 'Description',
      type: 'localeBlock'
    },
    {
      name: 'activityStream',
      title: 'Aktivitetsstrøm',
      titleEN: 'Activity stream',
      description: 'Events and activities connected to this object',
      type: 'array',
      of: [
        {type: 'production'},
        {type: 'transformation'},
        {type: 'move'},
        {type: 'endingActivity'}
      ],
      options: {
        editModal: 'fullscreen'
      }
    }
  ],
  preview: {
    select: {
      title: 'label.nor',
      subtitle: 'preferredIdentifier'
    },
    prepare (selection) {
      const {title, subtitle} = selection

      return {
        title: title,
        subtitle: subtitle
      }
    }
  }
}
