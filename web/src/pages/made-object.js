import React from 'react'
import {graphql} from 'gatsby'
import {mapEdgesToNodes} from '../lib/helpers'
import Container from '../components/container'
import GraphQLErrorList from '../components/graphql-error-list'
import MadeObjectPreviewGrid from '../components/made-object-preview-grid'
import SEO from '../components/seo'
import Layout from '../containers/layout'

export const query = graphql`
  query MadeObjectssPageQuery {
    site: sanitySiteSettings(_id: {regex: "/(drafts.|)siteSettings/"}) {
      title
      description
      keywords
    }
    madeObjects: allSanityMadeObject(
      sort: {fields: _createdAt, order: DESC},
    ) {
      edges {
        node {
          id
          label
          preferredIdentifier
          _rawActivityStream(resolveReferences: {maxDepth: 10})
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

const MadeObjectsPage = props => {
  const {data, errors} = props

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    )
  }

  const site = (data || {}).site
  const madeObjectNodes = (data || {}).madeObjects
    ? mapEdgesToNodes(data.madeObjects)
    : []

  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.'
    )
  }

  return (
    <Layout>
      <SEO title={site.title} description={site.description} keywords={site.keywords} />
      <Container>
        <h1 hidden>Welcome to {site.title}</h1>
        {madeObjectNodes && (
          <MadeObjectPreviewGrid
            title='Sist registrerte objekt'
            nodes={madeObjectNodes}
            browseMoreHref='/madeobject/'
          />
        )}
      </Container>
    </Layout>
  )
}

export default MadeObjectsPage
