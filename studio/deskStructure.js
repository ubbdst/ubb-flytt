import S from '@sanity/desk-tool/structure-builder'
import {FaCog, FaTag, FaBookDead} from 'react-icons/fa'

const hiddenDocTypes = listItem =>
  !['madeObject', 'siteSettings', 'typeClass', 'systemCategory', 'concept', 'material'].includes(listItem.getId())

export default () =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Object')
        .icon(FaBookDead)
        .child(
          S.list()
            .title('Object')
            .items([
              S.listItem()
                .title('Object by type')
                .icon(FaBookDead)
                .child(
                  // List out all categories
                  S.documentTypeList('typeClass')
                    .title('Object by type')
                    .filter(
                      '_type == "typeClass" && references(*[_type == "systemCategory" && label.nor in ["Objekt-/verkstype"]]._id)'
                    )
                    .child(catId =>
                    // List out project documents where the _id for the selected
                    // category appear as a _ref in the project’s categories array
                      S.documentList()
                        .schemaType('madeObject')
                        .title('Object')
                        .filter(
                          '_type == "madeObject" && $catId in hasType[]._ref'
                        )
                        .params({catId})
                    )
                ),
              S.listItem()
                .title('All types')
                .icon(FaBookDead)
                .child(
                  S.documentList()
                    .title('All types')
                    .schemaType('typeClass')
                    .filter(
                      '_type == "madeObject"'
                    )
                )
            ])
        ),
      // This returns an array of all the document types
      // defined in schema.js. We filter out those that we have
      // defined the structure above
      ...S.documentTypeListItems().filter(hiddenDocTypes),
      S.divider(),
      S.listItem()
        .title('Types')
        .icon(FaTag)
        .child(
          S.list()
            .title('Types')
            .items([
              S.listItem()
                .title('Types by category')
                .icon(FaTag)
                .child(
                  // List out all categories
                  S.documentTypeList('systemCategory')
                    .title('Types by category')
                    .child(catId =>
                    // List out project documents where the _id for the selected
                    // category appear as a _ref in the project’s categories array
                      S.documentList()
                        .schemaType('typeClass')
                        .title('Types')
                        .filter(
                          '_type == "typeClass" && $catId in systemCategory[]._ref'
                        )
                        .params({catId})
                    )
                ),
              S.listItem()
                .title('All types')
                .icon(FaTag)
                .child(
                  S.documentList()
                    .title('All types')
                    .schemaType('typeClass')
                    .filter(
                      '_type == "typeClass"'
                    )
                )
            ])
        ),
      S.documentTypeListItem('concept').title('Concept'),
      S.documentTypeListItem('material').title('Material'),
      S.divider(),
      S.listItem()
        .title('Settings')
        .icon(FaCog)
        .child(
          S.editor()
            .id('siteSettings')
            .schemaType('siteSettings')
            .documentId('siteSettings')
        ),
      S.documentTypeListItem('systemCategory').title('System categories')
    ])
