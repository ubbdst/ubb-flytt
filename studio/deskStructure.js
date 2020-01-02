import S from '@sanity/desk-tool/structure-builder'
import {
  FaCog,
  FaTag,
  FaBookDead,
  FaProjectDiagram,
  FaCalendar,
  FaGlasses,
  FaGifts,
  FaTruckLoading,
  FaClipboard,
  FaEmpire,
  FaMapMarkedAlt
} from 'react-icons/fa'
import {
  GiBookshelf,
  GiCrackedGlass,
  GiCalendar,
  GiBoltSpellCast
} from 'react-icons/gi'
import {TiPen, TiGroup, TiUser} from 'react-icons/ti'

const hiddenDocTypes = listItem =>
  ![
    'madeObject',
    'collection',
    'actor',
    'group',
    'period',
    'event',
    'activity',
    'linguisticObject',
    'report',
    'acquisition',
    'move',
    'designOrProcedure',
    'timeline',
    'exhibition',
    'project',
    'siteSettings',
    'place',
    'typeClass',
    'systemCategory',
    'concept',
    'material'
  ].includes(listItem.getId())

export default () =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Object')
        .icon(FaBookDead)
        .child(
          S.list()
            .title('Objects')
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
                .title('Unpublished objects')
                .icon(FaBookDead)
                .child(
                // List out all categories
                  S.documentTypeList('madeObject')
                    .title('Unpublished objects')
                    .filter(
                      '_type == "madeObject" && accessState == "secret"'
                    )
                ),
              S.listItem()
                .title('Needs review')
                .icon(FaBookDead)
                .child(
                // List out all categories
                  S.documentTypeList('madeObject')
                    .title('Needs review')
                    .filter(
                      '_type == "madeObject" && editorialState == "review"'
                    )
                ),
              S.listItem()
                .title('All objects')
                .icon(FaBookDead)
                .child(
                  S.documentList()
                    .title('All objects')
                    .schemaType('madeObject')
                    .filter(
                      '_type == "madeObject"'
                    )
                )
            ])
        ),
      S.listItem()
        .title('Collection')
        .icon(GiBookshelf)
        .child(
          S.list()
            .title('Collections')
            .items([
              S.listItem()
                .title('Collection by type')
                .icon(GiBookshelf)
                .child(
                  // List out all categories
                  S.documentTypeList('typeClass')
                    .title('Collection by type')
                    .filter(
                      '_type == "typeClass" && references(*[_type == "systemCategory" && label.nor in ["Samlingstype"]]._id)'
                    )
                    .child(catId =>
                    // List out project documents where the _id for the selected
                    // category appear as a _ref in the project’s categories array
                      S.documentList()
                        .schemaType('collection')
                        .title('Collection')
                        .filter(
                          '_type == "Collection" && $catId in hasType[]._ref'
                        )
                        .params({catId})
                    )
                ),
              S.listItem()
                .title('All Collections')
                .icon(GiBookshelf)
                .child(
                  S.documentList()
                    .title('All types')
                    .schemaType('collection')
                    .filter(
                      '_type == "Collection"'
                    )
                )
            ])
        ),
      S.divider(),
      S.listItem()
        .title('Actor')
        .icon(TiUser)
        .child(
          S.list()
            .title('Actors')
            .items([
              S.listItem()
                .title('Actor by type')
                .icon(TiUser)
                .child(
                  // List out all categories
                  S.documentTypeList('typeClass')
                    .title('Actor by type')
                    .filter(
                      '_type == "typeClass" && references(*[_type == "systemCategory" && label.nor in ["Aktørtype"]]._id)'
                    )
                    .child(catId =>
                    // List out project documents where the _id for the selected
                    // category appear as a _ref in the project’s categories array
                      S.documentList()
                        .schemaType('actor')
                        .title('Actor')
                        .filter(
                          '_type == "actor" && $catId in hasType[]._ref'
                        )
                        .params({catId})
                    )
                ),
              S.listItem()
                .title('All actors')
                .icon(TiUser)
                .child(
                  S.documentList()
                    .title('All actors')
                    .schemaType('actor')
                    .filter(
                      '_type == "actor"'
                    )
                )
            ])
        ),
      S.listItem()
        .title('Group')
        .icon(TiGroup)
        .child(
          S.list()
            .title('Groups')
            .items([
              S.listItem()
                .title('Group by type')
                .icon(TiGroup)
                .child(
                  // List out all categories
                  S.documentTypeList('typeClass')
                    .title('Group by type')
                    .filter(
                      '_type == "typeClass" && references(*[_type == "systemCategory" && label.nor in ["Gruppetype"]]._id)'
                    )
                    .child(catId =>
                    // List out project documents where the _id for the selected
                    // category appear as a _ref in the project’s categories array
                      S.documentList()
                        .schemaType('group')
                        .title('Group')
                        .filter(
                          '_type == "group" && $catId in hasType[]._ref'
                        )
                        .params({catId})
                    )
                ),
              S.listItem()
                .title('All groups')
                .icon(TiGroup)
                .child(
                  S.documentList()
                    .title('All types')
                    .schemaType('group')
                    .filter(
                      '_type == "group"'
                    )
                )
            ])
        ),
      S.divider(),
      S.listItem()
        .title('Period')
        .icon(FaEmpire)
        .child(
          S.list()
            .title('Periods')
            .items([
              S.listItem()
                .title('Period by type')
                .icon(FaEmpire)
                .child(
                  // List out all categories
                  S.documentTypeList('typeClass')
                    .title('Period by type')
                    .filter(
                      '_type == "typeClass" && references(*[_type == "systemCategory" && label.nor in ["Hendelsestype"]]._id)'
                    )
                    .child(catId =>
                      // List out project documents where the _id for the selected
                      // category appear as a _ref in the project’s categories array
                      S.documentList()
                        .schemaType('period')
                        .title('Period')
                        .filter(
                          '_type == "period" && $catId in hasType[]._ref'
                        )
                        .params({catId})
                    )
                ),
              S.listItem()
                .title('All periods')
                .icon(FaEmpire)
                .child(
                  S.documentTypeList('period')
                    .title('All periods')
                )
            ])
        ),
      S.listItem()
        .title('Event')
        .icon(FaCalendar)
        .child(
          S.list()
            .title('Events')
            .items([
              S.listItem()
                .title('Event by type')
                .icon(FaCalendar)
                .child(
                  // List out all categories
                  S.documentTypeList('typeClass')
                    .title('Event by type')
                    .filter(
                      '_type == "typeClass" && references(*[_type == "systemCategory" && label.nor in ["Hendelsestype"]]._id)'
                    )
                    .child(catId =>
                      // List out project documents where the _id for the selected
                      // category appear as a _ref in the project’s categories array
                      S.documentList()
                        .schemaType('event')
                        .title('Event')
                        .filter(
                          '_type == "event" && $catId in hasType[]._ref'
                        )
                        .params({catId})
                    )
                ),
              S.listItem()
                .title('All events')
                .icon(FaCalendar)
                .child(
                  S.documentList()
                    .title('All events')
                    .schemaType('event')
                    .filter(
                      '_type == "event"'
                    )
                )
            ])
        ),
      // ACTIVITY
      S.listItem()
        .title('Activity')
        .icon(GiBoltSpellCast)
        .child(
          S.list()
            .title('Activities')
            .items([
              S.listItem()
                .title('Activity by type')
                .icon(GiBoltSpellCast)
                .child(
                  // List out all categories
                  S.documentTypeList('typeClass')
                    .title('Activity by type')
                    .filter(
                      '_type == "typeClass" && references(*[_type == "systemCategory" && label.nor in ["Hendelsestype"]]._id)'
                    )
                    .child(catId =>
                      // List out project documents where the _id for the selected
                      // category appear as a _ref in the project’s categories array
                      S.documentList()
                        .schemaType('activity')
                        .title('Object')
                        .filter(
                          '_type == "activity" && $catId in hasType[]._ref'
                        )
                        .params({catId})
                    )
                ),
              S.listItem()
                .title('All acivities')
                .icon(GiBoltSpellCast)
                .child(
                  S.documentList()
                    .title('All acivities')
                    .schemaType('activity')
                    .filter(
                      '_type == "activity"'
                    )
                )
            ])
        ),
      S.divider(),
      S.listItem()
        .title('Text')
        .icon(TiPen)
        .child(
          S.list()
            .title('Texts')
            .items([
              S.listItem()
                .title('Text by type')
                .icon(TiPen)
                .child(
                // List out all categories
                  S.documentTypeList('typeClass')
                    .title('Text by type')
                    .filter(
                      '_type == "typeClass" && references(*[_type == "systemCategory" && label.nor in ["Utstillingstypetype"]]._id)'
                    )
                    .child(catId =>
                    // List out project documents where the _id for the selected
                    // category appear as a _ref in the project’s categories array
                      S.documentList()
                        .schemaType('linguisticObject')
                        .title('Text')
                        .filter(
                          '_type == "linguisticObject" && $catId in hasType[]._ref'
                        )
                        .params({catId})
                    )
                ),
              S.listItem()
                .title('Unpublished texts')
                .icon(TiPen)
                .child(
                  // List out all categories
                  S.documentTypeList('linguisticObject')
                    .title('Unpublished texts')
                    .filter(
                      '_type == "linguisticObject" && accessState == "secret"'
                    )
                ),
              S.listItem()
                .title('Needs review')
                .icon(TiPen)
                .child(
                  // List out all categories
                  S.documentTypeList('linguisticObject')
                    .title('Needs review')
                    .filter(
                      '_type == "linguisticObject" && editorialState == "review"'
                    )
                ),
              S.listItem()
                .title('All texts')
                .icon(TiPen)
                .child(
                  S.documentList()
                    .title('All texts')
                    .schemaType('linguisticObject')
                    .filter(
                      '_type == "linguisticObject"'
                    )
                )
            ])
        ),
      S.listItem()
        .title('Exhibition')
        .icon(FaGlasses)
        .child(
          S.list()
            .title('Exhibitions')
            .items([
              S.listItem()
                .title('Exhibition by type')
                .icon(FaGlasses)
                .child(
                // List out all categories
                  S.documentTypeList('typeClass')
                    .title('Exhibition by type')
                    .filter(
                      '_type == "typeClass" && references(*[_type == "systemCategory" && label.nor in ["Utstillingstypetype"]]._id)'
                    )
                    .child(catId =>
                    // List out project documents where the _id for the selected
                    // category appear as a _ref in the project’s categories array
                      S.documentList()
                        .schemaType('exhibition')
                        .title('Exhibition')
                        .filter(
                          '_type == "Exhibition" && $catId in hasType[]._ref'
                        )
                        .params({catId})
                    )
                ),
              S.listItem()
                .title('Unpublished exhibitions')
                .icon(FaGlasses)
                .child(
                  // List out all categories
                  S.documentTypeList('exhibition')
                    .title('Unpublished exhibitions')
                    .filter(
                      '_type == "exhibition" && accessState == "secret"'
                    )
                ),
              S.listItem()
                .title('Needs review')
                .icon(FaGlasses)
                .child(
                  // List out all categories
                  S.documentTypeList('exhibition')
                    .title('Needs review')
                    .filter(
                      '_type == "exhibition" && editorialState == "review"'
                    )
                ),
              S.listItem()
                .title('All exhibitions')
                .icon(FaGlasses)
                .child(
                  S.documentList()
                    .title('All exhibitions')
                    .schemaType('exhibition')
                    .filter(
                      '_type == "exhibition"'
                    )
                )
            ])
        ),
      S.listItem()
        .title('Timeline')
        .icon(GiCalendar)
        .child(
          S.list()
            .title('Timelines')
            .items([
              S.listItem()
                .title('Timeline by type')
                .icon(GiCalendar)
                .child(
                // List out all categories
                  S.documentTypeList('typeClass')
                    .title('Timeline by type')
                    .filter(
                      '_type == "typeClass" && references(*[_type == "systemCategory" && label.nor in ["Rapporttype"]]._id)'
                    )
                    .child(catId =>
                    // List out project documents where the _id for the selected
                    // category appear as a _ref in the project’s categories array
                      S.documentList()
                        .schemaType('timeline')
                        .title('Timeline')
                        .filter(
                          '_type == "timeline" && $catId in hasType[]._ref'
                        )
                        .params({catId})
                    )
                ),
              S.listItem()
                .title('Unpublished timelines')
                .icon(GiCalendar)
                .child(
                  // List out all categories
                  S.documentTypeList('timeline')
                    .title('Unpublished timelines')
                    .filter(
                      '_type == "timeline" && accessState == "secret"'
                    )
                ),
              S.listItem()
                .title('Needs review')
                .icon(GiCalendar)
                .child(
                  // List out all categories
                  S.documentTypeList('timeline')
                    .title('Needs review')
                    .filter(
                      '_type == "timeline" && editorialState == "review"'
                    )
                ),
              S.listItem()
                .title('All timelines')
                .icon(GiCalendar)
                .child(
                  S.documentList()
                    .title('All timelines')
                    .schemaType('timeline')
                    .filter(
                      '_type == "timeline"'
                    )
                )
            ])
        ),
      S.divider(),
      S.listItem()
        .title('Acquisition')
        .icon(FaGifts)
        .child(
          S.list()
            .title('Acquisitions')
            .items([
              S.listItem()
                .title('Acquisition by type')
                .icon(FaGifts)
                .child(
                // List out all categories
                  S.documentTypeList('typeClass')
                    .title('Acquisition by type')
                    .filter(
                      '_type == "typeClass" && references(*[_type == "systemCategory" && label.nor in ["Akkvisisjonstype"]]._id)'
                    )
                    .child(catId =>
                    // List out project documents where the _id for the selected
                    // category appear as a _ref in the project’s categories array
                      S.documentList()
                        .schemaType('acquisition')
                        .title('Acquisition')
                        .filter(
                          '_type == "acquisition" && $catId in hasType[]._ref'
                        )
                        .params({catId})
                    )
                ),
              S.listItem()
                .title('Unpublished acquisitions')
                .icon(FaGifts)
                .child(
                  // List out all categories
                  S.documentTypeList('acquisition')
                    .title('Unpublished acquisitions')
                    .filter(
                      '_type == "acquisition" && accessState == "secret"'
                    )
                ),
              S.listItem()
                .title('Needs review')
                .icon(FaGifts)
                .child(
                  // List out all categories
                  S.documentTypeList('acquisition')
                    .title('Needs review')
                    .filter(
                      '_type == "acquisition" && editorialState == "review"'
                    )
                ),
              S.listItem()
                .title('All acquisitions')
                .icon(FaGifts)
                .child(
                  S.documentList()
                    .title('All acquisitions')
                    .schemaType('acquisition')
                    .filter(
                      '_type == "acquisition"'
                    )
                )
            ])
        ),
      S.listItem()
        .title('Move')
        .icon(FaTruckLoading)
        .child(
          S.list()
            .title('Moves')
            .items([
              S.listItem()
                .title('Move by type')
                .icon(FaTruckLoading)
                .child(
                // List out all categories
                  S.documentTypeList('typeClass')
                    .title('Move by type')
                    .filter(
                      '_type == "typeClass" && references(*[_type == "systemCategory" && label.nor in ["Rapporttype"]]._id)'
                    )
                    .child(catId =>
                    // List out project documents where the _id for the selected
                    // category appear as a _ref in the project’s categories array
                      S.documentList()
                        .schemaType('move')
                        .title('Move')
                        .filter(
                          '_type == "move" && $catId in hasType[]._ref'
                        )
                        .params({catId})
                    )
                ),
              S.listItem()
                .title('Unpublished moves')
                .icon(FaTruckLoading)
                .child(
                  // List out all categories
                  S.documentTypeList('move')
                    .title('Unpublished moves')
                    .filter(
                      '_type == "move" && accessState == "secret"'
                    )
                ),
              S.listItem()
                .title('Needs review')
                .icon(FaTruckLoading)
                .child(
                  // List out all categories
                  S.documentTypeList('move')
                    .title('Needs review')
                    .filter(
                      '_type == "move" && editorialState == "review"'
                    )
                ),
              S.listItem()
                .title('All moves')
                .icon(FaTruckLoading)
                .child(
                  S.documentList()
                    .title('All moves')
                    .schemaType('move')
                    .filter(
                      '_type == "move"'
                    )
                )
            ])
        ),
      S.listItem()
        .title('Design or procedure')
        .icon(FaClipboard)
        .child(
          S.list()
            .title('Design or procedures')
            .items([
              S.listItem()
                .title('Design or procedure by type')
                .icon(FaClipboard)
                .child(
                // List out all categories
                  S.documentTypeList('typeClass')
                    .title('Design or procedure by type')
                    .filter(
                      '_type == "typeClass" && references(*[_type == "systemCategory" && label.nor in ["Rapporttype"]]._id)'
                    )
                    .child(catId =>
                    // List out project documents where the _id for the selected
                    // category appear as a _ref in the project’s categories array
                      S.documentList()
                        .schemaType('designOrProcedure')
                        .title('Design or procedure')
                        .filter(
                          '_type == "designOrProcedure" && $catId in hasType[]._ref'
                        )
                        .params({catId})
                    )
                ),
              S.listItem()
                .title('Unpublished design or procedures')
                .icon(FaClipboard)
                .child(
                  // List out all categories
                  S.documentTypeList('designOrProcedure')
                    .title('Unpublished design or procedures')
                    .filter(
                      '_type == "designOrProcedure" && accessState == "secret"'
                    )
                ),
              S.listItem()
                .title('Needs review')
                .icon(FaClipboard)
                .child(
                  // List out all categories
                  S.documentTypeList('designOrProcedure')
                    .title('Needs review')
                    .filter(
                      '_type == "designOrProcedure" && editorialState == "review"'
                    )
                ),
              S.listItem()
                .title('All design or procedures')
                .icon(FaClipboard)
                .child(
                  S.documentList()
                    .title('All design or procedures')
                    .schemaType('designOrProcedure')
                    .filter(
                      '_type == "designOrProcedure"'
                    )
                )
            ])
        ),
      S.listItem()
        .title('Report')
        .icon(GiCrackedGlass)
        .child(
          S.list()
            .title('Reports')
            .items([
              S.listItem()
                .title('Report by type')
                .icon(GiCrackedGlass)
                .child(
                // List out all categories
                  S.documentTypeList('typeClass')
                    .title('Report by type')
                    .filter(
                      '_type == "typeClass" && references(*[_type == "systemCategory" && label.nor in ["Rapporttype"]]._id)'
                    )
                    .child(catId =>
                    // List out project documents where the _id for the selected
                    // category appear as a _ref in the project’s categories array
                      S.documentList()
                        .schemaType('report')
                        .title('Report')
                        .filter(
                          '_type == "report" && $catId in hasType[]._ref'
                        )
                        .params({catId})
                    )
                ),
              S.listItem()
                .title('Unpublished reports')
                .icon(GiCrackedGlass)
                .child(
                  // List out all categories
                  S.documentTypeList('report')
                    .title('Unpublished reports')
                    .filter(
                      '_type == "report" && accessState == "secret"'
                    )
                ),
              S.listItem()
                .title('Needs review')
                .icon(GiCrackedGlass)
                .child(
                  // List out all categories
                  S.documentTypeList('report')
                    .title('Needs review')
                    .filter(
                      '_type == "report" && editorialState == "review"'
                    )
                ),
              S.listItem()
                .title('All Reports')
                .icon(GiCrackedGlass)
                .child(
                  S.documentList()
                    .title('All reports')
                    .schemaType('report')
                    .filter(
                      '_type == "report"'
                    )
                )
            ])
        ),
      S.divider(),
      // This returns an array of all the document types
      // defined in schema.js. We filter out those that we have
      // defined the structure above
      ...S.documentTypeListItems().filter(hiddenDocTypes),
      S.divider(),
      S.listItem()
        .title('Place')
        .icon(FaMapMarkedAlt)
        .child(
          S.list()
            .title('Places')
            .items([
              S.listItem()
                .title('Place by type')
                .icon(FaMapMarkedAlt)
                .child(
                  // List out all categories
                  S.documentTypeList('typeClass')
                    .title('Place by type')
                    .filter(
                      '_type == "typeClass" && references(*[_type == "systemCategory" && label.nor in ["Stedstype"]]._id)'
                    )
                    .child(catId =>
                      // List out project documents where the _id for the selected
                      // category appear as a _ref in the project’s categories array
                      S.documentList()
                        .schemaType('place')
                        .title('Place')
                        .filter(
                          '_type == "place" && $catId in hasType[]._ref'
                        )
                        .params({catId})
                    )
                ),
              S.listItem()
                .title('All places')
                .icon(FaMapMarkedAlt)
                .child(
                  S.documentList()
                    .title('All places')
                    .schemaType('place')
                    .filter(
                      '_type == "place"'
                    )
                )
            ])
        ),
      S.divider(),
      // TYPE
      S.listItem()
        .title('Type')
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
      // PROJECT
      S.listItem()
        .title('Project')
        .icon(FaProjectDiagram)
        .child(
          S.list()
            .title('Projects')
            .items([
              S.listItem()
                .title('Active projects')
                .icon(FaProjectDiagram)
                .child(
                // List out all categories
                  S.documentTypeList('project')
                    .title('Active projects')
                    .filter(
                      '_type == "project" && active'
                    )
                ),
              S.listItem()
                .title('Completed projects')
                .icon(FaProjectDiagram)
                .child(
                // List out all categories
                  S.documentTypeList('project')
                    .title('Completed projects')
                    .filter(
                      '_type == "project" && !active'
                    )
                ),
              S.listItem()
                .title('All projects')
                .icon(FaProjectDiagram)
                .child(
                  S.documentList()
                    .title('All projects')
                    .schemaType('project')
                    .filter(
                      '_type == "project"'
                    )
                )
            ])
        ),
      S.divider(),
      // SETTINGS SINGLETON
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
