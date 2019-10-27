// import {format, distanceInWords, differenceInDays} from 'date-fns'
import React from 'react'
// import {Link} from 'gatsby'
import {buildImageObj} from '../lib/helpers'
import {imageUrlFor} from '../lib/image-url'
// import BlockContent from './block-content'
import Container from './container'

import styles from './project.module.css'

function Project (props) {
  const {label, mainRepresentation} = props
  return (
    <article className={styles.root}>
      {props.mainRepresentation && mainRepresentation.asset && (
        <div className={styles.mainImage}>
          <img
            src={imageUrlFor(buildImageObj(mainRepresentation))
              .width(1200)
              .height(Math.floor((9 / 16) * 1200))
              .fit('crop')
              .url()}
            alt={mainRepresentation.alt}
          />
        </div>
      )}
      <Container>
        <div className={styles.grid}>
          <div className={styles.mainContent}>
            <h1 className={styles.title}>{label}</h1>
          </div>
          <aside className={styles.metaContent}>
            <p>kjk</p>
          </aside>
        </div>
      </Container>
    </article>
  )
}

export default Project
