import React from 'react'
import {graphql} from 'gatsby'
import Container from '../components/container'
import GraphQLErrorList from '../components/graphql-error-list'
import ProjectPreviewGrid from '../components/project-preview-grid'
import SEO from '../components/seo'
import Layout from '../containers/layout'
import {mapEdgesToNodes} from '../lib/helpers'

import {responsiveTitle1} from '../components/typography.module.css'

export const query = graphql`
  {
    allSanityMadeObject {
    totalCount
    edges {
      node {
        _id
        hasType
        preferredIdentifier
        label
        id
        mainRepresentation {
          asset {
            _id
            metadata {
              lqip
            }
            fluid {
              srcSet
            }
          }
        }
      }
    }
  }
}
`

const ArchivePage = props => {
  const {data, errors} = props
  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    )
  }
  const projectNodes =
    data && data.madeObjects && mapEdgesToNodes(data.allSanityMadeObject)
  return (
    <Layout>
      <SEO title='Archive' />
      <Container>
        <h1 className={responsiveTitle1}>Projects</h1>
        {projectNodes && projectNodes.length > 0 && <ProjectPreviewGrid nodes={projectNodes} />}
      </Container>
    </Layout>
  )
}

export default ArchivePage
