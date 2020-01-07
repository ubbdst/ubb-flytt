import S from '@sanity/desk-tool/structure-builder'
import {
  FaCog,
  FaBookDead,
  FaProjectDiagram,
  FaGlasses,
  FaGifts,
  FaTruckLoading,
  FaClipboard,
  FaEmpire,
  FaMapMarkedAlt,
  FaXRay
} from 'react-icons/fa'
import {
  GiBookshelf,
  GiCrackedGlass,
  GiCalendar,
  GiBoltSpellCast
} from 'react-icons/gi'
import {TiPen, TiGroup, TiUser} from 'react-icons/ti'
import {MdEvent} from 'react-icons/md'

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
    'material',
    'navigation',
    'experimental',
    'work',
    'visualItem',
    'language'
  ].includes(listItem.getId())

export default () =>
  S.list()
    .title('Innhold')
    .items([
      S.listItem()
        .title('Objekt')
        .icon(FaBookDead)
        .child(
          S.list()
            .title('Objekter')
            .items([
              S.listItem()
                .title('Objekt etter type')
                .icon(FaBookDead)
                .child(
                  // List out all categories
                  S.documentTypeList('typeClass')
                    .title('Objekt etter type')
                    .filter(
                      '_type == "typeClass" && references(*[_type == "systemCategory" && label.nor in ["Objekt-/verkstype"]]._id)'
                    )
                    .child(catId =>
                    // List out project documents where the _id for the selected
                    // category appear as a _ref in the project’s categories array
                      S.documentList()
                        .schemaType('madeObject')
                        .title('Objekt')
                        .filter(
                          '_type == "madeObject" && $catId in hasType[]._ref'
                        )
                        .params({catId})
                    )
                ),
              S.listItem()
                .title('Objekt etter deltype')
                .icon(FaBookDead)
                .child(
                  // List out all categories
                  S.documentTypeList('typeClass')
                    .title('Objekt etter deltype')
                    .filter(
                      '_type == "typeClass" && references(*[_type == "systemCategory" && label.nor in ["Seksjonstype"]]._id)'
                    )
                    .child(catId =>
                    // List out project documents where the _id for the selected
                    // category appear as a _ref in the project’s categories array
                      S.documentList()
                        .schemaType('madeObject')
                        .title('Objekt')
                        .filter(
                          '_type == "madeObject" && $catId in hasType[]._ref'
                        )
                        .params({catId})
                    )
                ),
              S.listItem()
                .title('Upubliserte objekter')
                .icon(FaBookDead)
                .child(
                // List out all categories
                  S.documentTypeList('madeObject')
                    .title('Upubliserte objekter')
                    .filter(
                      '_type == "madeObject" && accessState == "secret"'
                    )
                ),
              S.listItem()
                .title('Til gjennomgang')
                .icon(FaBookDead)
                .child(
                // List out all categories
                  S.documentTypeList('madeObject')
                    .title('Til gjennomgang')
                    .filter(
                      '_type == "madeObject" && editorialState == "review"'
                    )
                ),
              S.listItem()
                .title('Alle objekter')
                .icon(FaBookDead)
                .child(
                  S.documentList()
                    .title('Alle objekter')
                    .schemaType('madeObject')
                    .filter(
                      '_type == "madeObject"'
                    )
                )
            ])
        ),
      S.listItem()
        .title('Samlinger')
        .icon(GiBookshelf)
        .child(
          S.list()
            .title('Samlinger')
            .items([
              S.listItem()
                .title('Samlinger etter type')
                .icon(GiBookshelf)
                .child(
                  // List out all categories
                  S.documentTypeList('typeClass')
                    .title('Samlinger etter type')
                    .filter(
                      '_type == "typeClass" && references(*[_type == "systemCategory" && label.nor in ["Samlingstype"]]._id)'
                    )
                    .child(catId =>
                    // List out project documents where the _id for the selected
                    // category appear as a _ref in the project’s categories array
                      S.documentList()
                        .schemaType('collection')
                        .title('Samlinger')
                        .filter(
                          '_type == "collection" && $catId in hasType[]._ref'
                        )
                        .params({catId})
                    )
                ),
              S.listItem()
                .title('Alle samlinger')
                .icon(GiBookshelf)
                .child(
                  S.documentList()
                    .title('Alle samlinger')
                    .schemaType('collection')
                    .filter(
                      '_type == "collection"'
                    )
                )
            ])
        ),
      S.divider(),
      S.listItem()
        .title('Aktører')
        .icon(TiUser)
        .child(
          S.list()
            .title('Aktører')
            .items([
              S.listItem()
                .title('Aktører etter type')
                .icon(TiUser)
                .child(
                  // List out all categories
                  S.documentTypeList('typeClass')
                    .title('Aktører etter type')
                    .filter(
                      '_type == "typeClass" && references(*[_type == "systemCategory" && label.nor in ["Aktørtype"]]._id)'
                    )
                    .child(catId =>
                    // List out project documents where the _id for the selected
                    // category appear as a _ref in the project’s categories array
                      S.documentList()
                        .schemaType('actor')
                        .title('Aktører')
                        .filter(
                          '_type == "actor" && $catId in hasType[]._ref'
                        )
                        .params({catId})
                    )
                ),
              S.listItem()
                .title('Upubliserte poster')
                .icon(TiUser)
                .child(
                // List out all categories
                  S.documentTypeList('actor')
                    .title('Upubliserte objekter')
                    .filter(
                      '_type == "actor" && accessState == "secret"'
                    )
                ),
              S.listItem()
                .title('Til gjennomgang')
                .icon(TiUser)
                .child(
                // List out all categories
                  S.documentTypeList('actor')
                    .title('Til gjennomgang')
                    .filter(
                      '_type == "actor" && editorialState == "review"'
                    )
                ),
              S.listItem()
                .title('Alle Aktører')
                .icon(TiUser)
                .child(
                  S.documentList()
                    .title('Alle Aktører')
                    .schemaType('actor')
                    .filter(
                      '_type == "actor"'
                    )
                )
            ])
        ),
      S.listItem()
        .title('Grupper')
        .icon(TiGroup)
        .child(
          S.list()
            .title('Grupper')
            .items([
              S.listItem()
                .title('Grupper etter type')
                .icon(TiGroup)
                .child(
                  // List out all categories
                  S.documentTypeList('typeClass')
                    .title('Grupper etter type')
                    .filter(
                      '_type == "typeClass" && references(*[_type == "systemCategory" && label.nor in ["Gruppetype"]]._id)'
                    )
                    .child(catId =>
                    // List out project documents where the _id for the selected
                    // category appear as a _ref in the project’s categories array
                      S.documentList()
                        .schemaType('group')
                        .title('Grupper')
                        .filter(
                          '_type == "group" && $catId in hasType[]._ref'
                        )
                        .params({catId})
                    )
                ),
              S.listItem()
                .title('Upubliserte poster')
                .icon(TiGroup)
                .child(
                // List out all categories
                  S.documentTypeList('group')
                    .title('Upubliserte objekter')
                    .filter(
                      '_type == "group" && accessState == "secret"'
                    )
                ),
              S.listItem()
                .title('Til gjennomgang')
                .icon(TiGroup)
                .child(
                // List out all categories
                  S.documentTypeList('group')
                    .title('Til gjennomgang')
                    .filter(
                      '_type == "group" && editorialState == "review"'
                    )
                ),
              S.listItem()
                .title('Alle grupper')
                .icon(TiGroup)
                .child(
                  S.documentList()
                    .title('Alle grupper')
                    .schemaType('group')
                    .filter(
                      '_type == "group"'
                    )
                )
            ])
        ),
      S.divider(),
      // TYPE
      S.listItem()
        .title('Type')
        .icon(FaXRay)
        .child(
          S.list()
            .title('Typer')
            .items([
              S.listItem()
                .title('Typer etter category')
                .icon(FaXRay)
                .child(
                  // List out all categories
                  S.documentTypeList('systemCategory')
                    .title('Typer etter category')
                    .child(catId =>
                    // List out project documents where the _id for the selected
                    // category appear as a _ref in the project’s categories array
                      S.documentList()
                        .schemaType('typeClass')
                        .title('Typer')
                        .filter(
                          '_type == "typeClass" && $catId in systemCategory[]._ref'
                        )
                        .params({catId})
                    )
                ),
              S.listItem()
                .title('Alle typer')
                .icon(FaXRay)
                .child(
                  S.documentList()
                    .title('Alle typer')
                    .schemaType('typeClass')
                    .filter(
                      '_type == "typeClass"'
                    )
                )
            ])
        ),
      S.documentTypeListItem('concept').title('Emner'),
      S.documentTypeListItem('material').title('Material'),
      S.documentTypeListItem('language').title('Språk'),
      S.listItem()
        .title('Steder')
        .icon(FaMapMarkedAlt)
        .child(
          S.list()
            .title('Steder')
            .items([
              S.listItem()
                .title('Steder etter type')
                .icon(FaMapMarkedAlt)
                .child(
                  // List out all categories
                  S.documentTypeList('typeClass')
                    .title('Steder etter type')
                    .filter(
                      '_type == "typeClass" && references(*[_type == "systemCategory" && label.nor in ["Stedstype"]]._id)'
                    )
                    .child(catId =>
                    // List out project documents where the _id for the selected
                    // category appear as a _ref in the project’s categories array
                      S.documentList()
                        .schemaType('place')
                        .title('Steder')
                        .filter(
                          '_type == "place" && $catId in hasType[]._ref'
                        )
                        .params({catId})
                    )
                ),
              S.listItem()
                .title('Alle steder')
                .icon(FaMapMarkedAlt)
                .child(
                  S.documentList()
                    .title('Alle steder')
                    .schemaType('place')
                    .filter(
                      '_type == "place"'
                    )
                )
            ])
        ),
      S.divider(),
      S.listItem()
        .title('Perioder')
        .icon(FaEmpire)
        .child(
          S.list()
            .title('Perioder')
            .items([
              S.listItem()
                .title('Perioder etter type')
                .icon(FaEmpire)
                .child(
                  // List out all categories
                  S.documentTypeList('typeClass')
                    .title('Perioder etter type')
                    .filter(
                      '_type == "typeClass" && references(*[_type == "systemCategory" && label.nor in ["Hendelsestype"]]._id)'
                    )
                    .child(catId =>
                      // List out project documents where the _id for the selected
                      // category appear as a _ref in the project’s categories array
                      S.documentList()
                        .schemaType('period')
                        .title('Perioder')
                        .filter(
                          '_type == "period" && $catId in hasType[]._ref'
                        )
                        .params({catId})
                    )
                ),
              S.listItem()
                .title('Alle perioder')
                .icon(FaEmpire)
                .child(
                  S.documentTypeList('period')
                    .title('Alle perioder')
                )
            ])
        ),
      S.listItem()
        .title('Hendelser')
        .icon(MdEvent)
        .child(
          S.list()
            .title('Hendelser')
            .items([
              S.listItem()
                .title('Hendelser etter type')
                .icon(MdEvent)
                .child(
                  // List out all categories
                  S.documentTypeList('typeClass')
                    .title('Hendelser etter type')
                    .filter(
                      '_type == "typeClass" && references(*[_type == "systemCategory" && label.nor in ["Hendelsestype"]]._id)'
                    )
                    .child(catId =>
                      // List out project documents where the _id for the selected
                      // category appear as a _ref in the project’s categories array
                      S.documentList()
                        .schemaType('event')
                        .title('Hendelser')
                        .filter(
                          '_type == "event" && $catId in hasType[]._ref'
                        )
                        .params({catId})
                    )
                ),
              S.listItem()
                .title('Alle hendelser')
                .icon(MdEvent)
                .child(
                  S.documentList()
                    .title('Alle hendelser')
                    .schemaType('event')
                    .filter(
                      '_type == "event"'
                    )
                )
            ])
        ),
      // ACTIVITY
      S.listItem()
        .title('Aktiviteter')
        .icon(GiBoltSpellCast)
        .child(
          S.list()
            .title('Aktiviteter')
            .items([
              S.listItem()
                .title('Aktiviteter etter type')
                .icon(GiBoltSpellCast)
                .child(
                  // List out all categories
                  S.documentTypeList('typeClass')
                    .title('Aktiviteter etter type')
                    .filter(
                      '_type == "typeClass" && references(*[_type == "systemCategory" && label.nor in ["Hendelsestype"]]._id)'
                    )
                    .child(catId =>
                      // List out project documents where the _id for the selected
                      // category appear as a _ref in the project’s categories array
                      S.documentList()
                        .schemaType('activity')
                        .title('Aktiviteter')
                        .filter(
                          '_type == "activity" && $catId in hasType[]._ref'
                        )
                        .params({catId})
                    )
                ),
              S.listItem()
                .title('Alle aktiviteter')
                .icon(GiBoltSpellCast)
                .child(
                  S.documentList()
                    .title('Alle aktiviteter')
                    .schemaType('activity')
                    .filter(
                      '_type == "activity"'
                    )
                )
            ])
        ),
      S.divider(),
      S.listItem()
        .title('Tekster')
        .icon(TiPen)
        .child(
          S.list()
            .title('Tekster')
            .items([
              S.listItem()
                .title('Tekster etter type')
                .icon(TiPen)
                .child(
                // List out all categories
                  S.documentTypeList('typeClass')
                    .title('Tekster etter type')
                    .filter(
                      '_type == "typeClass" && references(*[_type == "systemCategory" && label.nor in ["Utstillingstypetype"]]._id)'
                    )
                    .child(catId =>
                    // List out project documents where the _id for the selected
                    // category appear as a _ref in the project’s categories array
                      S.documentList()
                        .schemaType('linguisticObject')
                        .title('Tekster')
                        .filter(
                          '_type == "linguisticObject" && $catId in hasType[]._ref'
                        )
                        .params({catId})
                    )
                ),
              S.listItem()
                .title('Upubliserte tekster')
                .icon(TiPen)
                .child(
                  // List out all categories
                  S.documentTypeList('linguisticObject')
                    .title('Upubliserte tekster')
                    .filter(
                      '_type == "linguisticObject" && accessState == "secret"'
                    )
                ),
              S.listItem()
                .title('Til gjennomgang')
                .icon(TiPen)
                .child(
                  // List out all categories
                  S.documentTypeList('linguisticObject')
                    .title('Til gjennomgang')
                    .filter(
                      '_type == "linguisticObject" && editorialState == "review"'
                    )
                ),
              S.listItem()
                .title('Alle tekster')
                .icon(TiPen)
                .child(
                  S.documentList()
                    .title('Alle tekster')
                    .schemaType('linguisticObject')
                    .filter(
                      '_type == "linguisticObject"'
                    )
                )
            ])
        ),
      S.listItem()
        .title('Utstillinger')
        .icon(FaGlasses)
        .child(
          S.list()
            .title('Utstillinger')
            .items([
              S.listItem()
                .title('Utstillinger etter type')
                .icon(FaGlasses)
                .child(
                // List out all categories
                  S.documentTypeList('typeClass')
                    .title('Utstillinger etter type')
                    .filter(
                      '_type == "typeClass" && references(*[_type == "systemCategory" && label.nor in ["Utstillingstypetype"]]._id)'
                    )
                    .child(catId =>
                    // List out project documents where the _id for the selected
                    // category appear as a _ref in the project’s categories array
                      S.documentList()
                        .schemaType('exhibition')
                        .title('Utstillinger')
                        .filter(
                          '_type == "Exhibition" && $catId in hasType[]._ref'
                        )
                        .params({catId})
                    )
                ),
              S.listItem()
                .title('Upubliserte utstillinger')
                .icon(FaGlasses)
                .child(
                  // List out all categories
                  S.documentTypeList('exhibition')
                    .title('Upubliserte utstillinger')
                    .filter(
                      '_type == "exhibition" && accessState == "secret"'
                    )
                ),
              S.listItem()
                .title('Til gjennomgang')
                .icon(FaGlasses)
                .child(
                  // List out all categories
                  S.documentTypeList('exhibition')
                    .title('Til gjennomgang')
                    .filter(
                      '_type == "exhibition" && editorialState == "review"'
                    )
                ),
              S.listItem()
                .title('Alle utstillinger')
                .icon(FaGlasses)
                .child(
                  S.documentList()
                    .title('Alle utstillinger')
                    .schemaType('exhibition')
                    .filter(
                      '_type == "exhibition"'
                    )
                )
            ])
        ),
      S.listItem()
        .title('Tidslinjer')
        .icon(GiCalendar)
        .child(
          S.list()
            .title('Tidslinjer')
            .items([
              S.listItem()
                .title('Tidslinjer etter type')
                .icon(GiCalendar)
                .child(
                // List out all categories
                  S.documentTypeList('typeClass')
                    .title('Tidslinjer etter type')
                    .filter(
                      '_type == "typeClass" && references(*[_type == "systemCategory" && label.nor in ["Rapporttype"]]._id)'
                    )
                    .child(catId =>
                    // List out project documents where the _id for the selected
                    // category appear as a _ref in the project’s categories array
                      S.documentList()
                        .schemaType('timeline')
                        .title('Tidslinjer')
                        .filter(
                          '_type == "timeline" && $catId in hasType[]._ref'
                        )
                        .params({catId})
                    )
                ),
              S.listItem()
                .title('Upubliserte tidslinjer')
                .icon(GiCalendar)
                .child(
                  // List out all categories
                  S.documentTypeList('timeline')
                    .title('Upubliserte tidslinjer')
                    .filter(
                      '_type == "timeline" && accessState == "secret"'
                    )
                ),
              S.listItem()
                .title('Til gjennomgang')
                .icon(GiCalendar)
                .child(
                  // List out all categories
                  S.documentTypeList('timeline')
                    .title('Til gjennomgang')
                    .filter(
                      '_type == "timeline" && editorialState == "review"'
                    )
                ),
              S.listItem()
                .title('Alle tidslinjer')
                .icon(GiCalendar)
                .child(
                  S.documentList()
                    .title('Alle tidslinjer')
                    .schemaType('timeline')
                    .filter(
                      '_type == "timeline"'
                    )
                )
            ])
        ),
      S.divider(),
      S.listItem()
        .title('Akkvisisjoner')
        .icon(FaGifts)
        .child(
          S.list()
            .title('Akkvisisjoner')
            .items([
              S.listItem()
                .title('Akkvisisjoner etter type')
                .icon(FaGifts)
                .child(
                // List out all categories
                  S.documentTypeList('typeClass')
                    .title('Akkvisisjoner etter type')
                    .filter(
                      '_type == "typeClass" && references(*[_type == "systemCategory" && label.nor in ["Akkvisisjonstype"]]._id)'
                    )
                    .child(catId =>
                    // List out project documents where the _id for the selected
                    // category appear as a _ref in the project’s categories array
                      S.documentList()
                        .schemaType('acquisition')
                        .title('Akkvisisjoner')
                        .filter(
                          '_type == "acquisition" && $catId in hasType[]._ref'
                        )
                        .params({catId})
                    )
                ),
              S.listItem()
                .title('Upubliserte akkvisisjoner')
                .icon(FaGifts)
                .child(
                  // List out all categories
                  S.documentTypeList('acquisition')
                    .title('Upubliserte akkvisisjoner')
                    .filter(
                      '_type == "acquisition" && accessState == "secret"'
                    )
                ),
              S.listItem()
                .title('Til gjennomgang')
                .icon(FaGifts)
                .child(
                  // List out all categories
                  S.documentTypeList('acquisition')
                    .title('Til gjennomgang')
                    .filter(
                      '_type == "acquisition" && editorialState == "review"'
                    )
                ),
              S.listItem()
                .title('Alle akkvisisjoner')
                .icon(FaGifts)
                .child(
                  S.documentList()
                    .title('Alle akkvisisjoner')
                    .schemaType('acquisition')
                    .filter(
                      '_type == "acquisition"'
                    )
                )
            ])
        ),
      S.listItem()
        .title('Flytt')
        .icon(FaTruckLoading)
        .child(
          S.list()
            .title('Flytt')
            .items([
              S.listItem()
                .title('Flytt etter type')
                .icon(FaTruckLoading)
                .child(
                // List out all categories
                  S.documentTypeList('typeClass')
                    .title('Flytt etter type')
                    .filter(
                      '_type == "typeClass" && references(*[_type == "systemCategory" && label.nor in ["Rapporttype"]]._id)'
                    )
                    .child(catId =>
                    // List out project documents where the _id for the selected
                    // category appear as a _ref in the project’s categories array
                      S.documentList()
                        .schemaType('move')
                        .title('Flytt')
                        .filter(
                          '_type == "move" && $catId in hasType[]._ref'
                        )
                        .params({catId})
                    )
                ),
              S.listItem()
                .title('Upubliserte flytt')
                .icon(FaTruckLoading)
                .child(
                  // List out all categories
                  S.documentTypeList('move')
                    .title('Upubliserte flytt')
                    .filter(
                      '_type == "move" && accessState == "secret"'
                    )
                ),
              S.listItem()
                .title('Til gjennomgang')
                .icon(FaTruckLoading)
                .child(
                  // List out all categories
                  S.documentTypeList('move')
                    .title('Til gjennomgang')
                    .filter(
                      '_type == "move" && editorialState == "review"'
                    )
                ),
              S.listItem()
                .title('Alle flytt')
                .icon(FaTruckLoading)
                .child(
                  S.documentList()
                    .title('Alle flytt')
                    .schemaType('move')
                    .filter(
                      '_type == "move"'
                    )
                )
            ])
        ),
      S.listItem()
        .title('Design eller prosedyrer')
        .icon(FaClipboard)
        .child(
          S.list()
            .title('Design eller prosedyrer')
            .items([
              S.listItem()
                .title('Design eller prosedyrer etter type')
                .icon(FaClipboard)
                .child(
                // List out all categories
                  S.documentTypeList('typeClass')
                    .title('Design eller prosedyrer etter type')
                    .filter(
                      '_type == "typeClass" && references(*[_type == "systemCategory" && label.nor in ["Rapporttype"]]._id)'
                    )
                    .child(catId =>
                    // List out project documents where the _id for the selected
                    // category appear as a _ref in the project’s categories array
                      S.documentList()
                        .schemaType('designOrProcedure')
                        .title('Design eller prosedyrer')
                        .filter(
                          '_type == "designOrProcedure" && $catId in hasType[]._ref'
                        )
                        .params({catId})
                    )
                ),
              S.listItem()
                .title('Upubliserte design eller prosedyrer')
                .icon(FaClipboard)
                .child(
                  // List out all categories
                  S.documentTypeList('designOrProcedure')
                    .title('Upubliserte design eller prosedyrer')
                    .filter(
                      '_type == "designOrProcedure" && accessState == "secret"'
                    )
                ),
              S.listItem()
                .title('Til gjennomgang')
                .icon(FaClipboard)
                .child(
                  // List out all categories
                  S.documentTypeList('designOrProcedure')
                    .title('Til gjennomgang')
                    .filter(
                      '_type == "designOrProcedure" && editorialState == "review"'
                    )
                ),
              S.listItem()
                .title('Alle design eller prosedyrer')
                .icon(FaClipboard)
                .child(
                  S.documentList()
                    .title('Alle design eller prosedyrer')
                    .schemaType('designOrProcedure')
                    .filter(
                      '_type == "designOrProcedure"'
                    )
                )
            ])
        ),
      S.listItem()
        .title('Rapporter')
        .icon(GiCrackedGlass)
        .child(
          S.list()
            .title('Rapporter')
            .items([
              S.listItem()
                .title('Rapporter etter type')
                .icon(GiCrackedGlass)
                .child(
                // List out all categories
                  S.documentTypeList('typeClass')
                    .title('Rapporter etter type')
                    .filter(
                      '_type == "typeClass" && references(*[_type == "systemCategory" && label.nor in ["Rapporttype"]]._id)'
                    )
                    .child(catId =>
                    // List out project documents where the _id for the selected
                    // category appear as a _ref in the project’s categories array
                      S.documentList()
                        .schemaType('report')
                        .title('Rapporter')
                        .filter(
                          '_type == "report" && $catId in hasType[]._ref'
                        )
                        .params({catId})
                    )
                ),
              S.listItem()
                .title('Upubliserte rapporter')
                .icon(GiCrackedGlass)
                .child(
                  // List out all categories
                  S.documentTypeList('report')
                    .title('Upubliserte rapporter')
                    .filter(
                      '_type == "report" && accessState == "secret"'
                    )
                ),
              S.listItem()
                .title('Til gjennomgang')
                .icon(GiCrackedGlass)
                .child(
                  // List out all categories
                  S.documentTypeList('report')
                    .title('Til gjennomgang')
                    .filter(
                      '_type == "report" && editorialState == "review"'
                    )
                ),
              S.listItem()
                .title('Alle rapporter')
                .icon(GiCrackedGlass)
                .child(
                  S.documentList()
                    .title('Alle rapporter')
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
      S.documentTypeListItem('work').title('Verk'),
      S.documentTypeListItem('visualItem').title('Visuell ting'),
      S.divider(),
      // PROJECT
      S.listItem()
        .title('Prosjekter')
        .icon(FaProjectDiagram)
        .child(
          S.list()
            .title('Prosjekter')
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
                .title('Alle projects')
                .icon(FaProjectDiagram)
                .child(
                  S.documentList()
                    .title('Alle projects')
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
        .title('Innstillinger')
        .icon(FaCog)
        .child(
          S.editor()
            .id('siteSettings')
            .schemaType('siteSettings')
            .documentId('siteSettings')
        ),
      S.documentTypeListItem('systemCategory').title('System kategorier'),
      S.documentTypeListItem('navigation').title('Navigasjon'),
      S.documentTypeListItem('experimental').title('Eksperiment')
    ])
