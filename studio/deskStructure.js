import S from '@sanity/desk-tool/structure-builder'
import {FaCog} from 'react-icons/fa'

const hiddenDocTypes = listItem =>
  !['siteSettings'].includes(listItem.getId())

export default () =>
  S.list()
    .title('Content')
    .items([
      // This returns an array of all the document types
      // defined in schema.js. We filter out those that we have
      // defined the structure above
      ...S.documentTypeListItems().filter(hiddenDocTypes),
      S.listItem()
        .title('Settings')
        .icon(FaCog)
        .child(
          S.editor()
            .id('siteSettings')
            .schemaType('siteSettings')
            .documentId('siteSettings')
        )
    ])
