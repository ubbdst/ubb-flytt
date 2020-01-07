// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'

// Singletons
import siteSettings from './singletons/siteSettings'

// Texts
import genericText from './texts/genericText'
import reportText from './texts/reportText'
import simpleText from './texts/simpleText'
import localeBlock from './texts/localeBlock'
import localeString from './texts/localeString'
import localeSlug from './texts/localeSlug'
import localeBlockSimple from './texts/localeBlockSimple'
import localeBlockReport from './texts/localeBlockReport'

// Images
import mainRepresentation from './images/mainRepresentation'
import figure from './images/figure'
import mainImage from './images/mainImage'
import imageCompare from './images/imageCompare'

// Document schemas
import actor from './documents/actor'
import work from './documents/work'
import collection from './documents/collection'
import group from './documents/group'
import linguisticObject from './documents/linguisticObject'
import report from './documents/report/report'
import visualItem from './documents/visualItem'
import event from './documents/event'
import experimental from './documents/experimental'
import move from './documents/move'
import relocation from './documents/relocation'
import place from './documents/place'
import designOrProcedure from './documents/designOrProcedure'
import project from './documents/project'
import typeClass from './documents/types/type'
import systemCategory from './documents/types/systemCategory'
import language from './documents/types/language'
import material from './documents/types/material'
import concept from './documents/types/concept'
import exhibition from './documents/exhibition'
import acquisition from './documents/acquisition'
import activity from './documents/activity'
import period from './documents/period'

// MadeObject
import madeObject from './documents/madeObject/madeObject'

// Timeline
import timeline from './documents/timeline/timeline'
import mediaObject from './documents/timeline/mediaObject'
import externalMediaObject from './documents/timeline/externalMediaObject'
import era from './documents/timeline/era'
import timelineSlide from './documents/timeline/timelineSlide'

// Site
import navigation from './site/navigation'
import navItem from './site/navItem'
import navSection from './site/navSection'
import openGraph from './site/openGraph'
import route from './site/route'

// Object types
import production from './objects/activities/production'
import creation from './objects/activities/creation'
import timespan from './objects/timespan'
import transformation from './objects/activities/transformation'
import endingActivity from './objects/activities/endingActivity'
import name from './objects/name'
import beginningActivity from './objects/activities/beginningActivity'
import actorInRole from './objects/actorInRole'
import dimension from './objects/dimension'
import measurement from './objects/activities/measurement'
import leaving from './objects/activities/leaving'
import joining from './objects/activities/joining'
import identifier from './objects/identifier'
import birth from './objects/activities/birth'
import death from './objects/activities/death'
import dissolution from './objects/activities/dissolution'
import formation from './objects/activities/formation'
import manifest from './objects/manifest'
import feature from './objects/feature'
import valueSlider from './objects/valueSlider'
import background from './objects/background'
import instagramPost from './objects/instagramPost'
import file from './objects/file'
import treatment from './documents/report/treatment'
import treatmentAssessment from './documents/report/treatmentAssessment'
import sampling from './documents/report/sampling'

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'special-collection',
  // Then proceed to concatenate our our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    // The following are document types which will appear
    // in the studio.
    madeObject,
    work,
    visualItem,
    collection,
    actor,
    group,
    period,
    event,
    activity,
    place,
    acquisition,
    move,
    relocation,
    report,
    project,
    linguisticObject,
    exhibition,
    timeline,
    designOrProcedure,
    typeClass,
    systemCategory,
    concept,
    language,
    material,
    experimental,
    navigation,
    route,
    siteSettings,
    // Objects
    name,
    birth,
    death,
    beginningActivity,
    production,
    transformation,
    endingActivity,
    creation,
    measurement,
    leaving,
    joining,
    formation,
    dissolution,
    timespan,
    actorInRole,
    dimension,
    feature,
    identifier,
    manifest,
    timelineSlide,
    valueSlider,
    era,
    background,
    instagramPost,
    file,
    navItem,
    navSection,
    openGraph,
    treatment,
    treatmentAssessment,
    sampling,
    imageCompare,
    // Text
    genericText,
    reportText,
    simpleText,
    localeBlock,
    localeBlockSimple,
    localeBlockReport,
    localeString,
    localeSlug,
    // Image
    mainImage,
    mainRepresentation,
    figure,
    mediaObject,
    externalMediaObject
  ])
})
