/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

async function createProjectPages (graphql, actions, reporter) {
  const {createPage} = actions
  const result = await graphql(`
    {
      allSanityMadeObject {
        totalCount
        edges {
          node {
            _id
            id
          }
        }
      }
    }
  `)

  if (result.errors) throw result.errors

  const madeObjectEdges = (result.data.allSanityMadeObject || {}).edges || []

  madeObjectEdges
    .forEach(edge => {
      const id = edge.node.id
      // const slug = edge.node.slug.current
      const path = `/made-object/${id}/`

      reporter.info(`Creating object page: ${path}`)

      createPage({
        path,
        component: require.resolve('./src/templates/madeObject.js'),
        context: {id}
      })
    })
}

exports.createPages = async ({graphql, actions, reporter}) => {
  await createProjectPages(graphql, actions, reporter)
}
