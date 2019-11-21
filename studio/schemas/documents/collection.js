import client from 'part:@sanity/base/client'
import {GiBookshelf} from 'react-icons/gi'

export default {
  title: 'Collection',
  name: 'collection',
  type: 'document',
  icon: GiBookshelf,
  fields: [
    {
      title: 'Title',
      name: 'label',
      type: 'localeString',
      validation: Rule => Rule.required()
    },
    {
      title: 'Preferred identifier',
      name: 'preferredIdentifier',
      type: 'string',
      validation: Rule => Rule.required().custom(async prefId => {
        // eslint-disable-next-line no-template-curly-in-string
        const docs = await client.fetch('*[preferredIdentifier == "${prefId}" && !(_id in path("drafts.**"))] { preferredIdentifier }', {prefId})
        return docs.length > 1 ? 'Value is not unique' : true
      })
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
