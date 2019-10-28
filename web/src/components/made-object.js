// import {format, distanceInWords, differenceInDays} from 'date-fns'
import React from 'react'
// import {Link} from 'gatsby'
import {buildImageObj} from '../lib/helpers'
import {imageUrlFor} from '../lib/image-url'
// import BlockContent from './block-content'
// import Container from './container'

import styles from './made-object.module.css'
import ActivityStream from './activity-stream'

function Project (props) {
  const {label, preferredIdentifier, mainRepresentation, _rawActivityStream} = props
  console.log(_rawActivityStream)
  return (
    <article className={styles.root}>
      <header className={styles.center}>
        <h1 className={styles.title}>{label}</h1>
        <p>{preferredIdentifier}</p>
      </header>
      {props.mainRepresentation && mainRepresentation.asset && (
        <div className={styles.mainImage}>
          <img
            src={imageUrlFor(buildImageObj(mainRepresentation))
              .maxWidth(980)
              .maxHeight(700)
              .fit('max')
              .url()}
            alt={mainRepresentation.alt}
          />
        </div>
      )}
      {props._rawActivityStream && _rawActivityStream && (
        <ActivityStream {...props._rawActivityStream} />
      )}
    </article>
  )
}

export default Project
