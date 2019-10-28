import React from 'react'
import {graphql} from 'gatsby'
import Container from '../components/container'
import GraphQLErrorList from '../components/graphql-error-list'
import MadeObject from '../components/made-object'
import SEO from '../components/seo'
import Layout from '../containers/layout'

export const query = graphql`
  query MadeObjectTemplateQuery($id: String!) {
    madeObject: sanityMadeObject(id: {eq: $id}) {
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
      _rawActivityStream(resolveReferences: {maxDepth: 10})
      rights
    }
  }
`

const MadeObjectTemplate = props => {
  const {data, errors} = props
  const madeObject = data && data.madeObject
  return (
    <Layout>
      {errors && <SEO title='GraphQL Error' />}
      {madeObject && <SEO title={madeObject.title || 'Untitled'} />}

      {errors && (
        <Container>
          <GraphQLErrorList errors={errors} />
        </Container>
      )}
      {madeObject && <MadeObject {...madeObject} />}
    </Layout>
  )
}

export default MadeObjectTemplate
