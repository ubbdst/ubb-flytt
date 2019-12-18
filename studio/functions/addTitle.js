/* eslint-disable */
const sanityClient = require('@sanity/client')

const client = sanityClient({
  'projectId': 'e56ijdvg',
  'dataset': 'production',
  // Remember to add a token with write access to your Netlify app’s environment variables.
  // Call it SANITY_TOKEN
  // https://docs.netlify.com/configure-builds/environment-variables/#declare-variables
  token: process.env.SANITY_FUNCTION_TOKEN,
  useCdn: false
})

const query = `*[_type == "move" ] { carriedOutBy[]->, "movedCount": count(moved), movedFrom->, movedTo->, timespan }`

// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
// $ sanity hook create add-missing-value production https://yourdomain.netlify.com/.netlify/functions/update-sanity-content
// Webhooks can also be added in the API settings on https://manage.sanity.io
exports.handler = async (event, context) => {
  const {body} = event
  const bodyParsed = JSON.parse(body)
  const {created} = bodyParsed.ids // get the ids of new documents
  console.log(created)

  try {
    const res = await created.map((trans, _id) => trans.patch(_id).setIfMissing({
      label: 'Missing TITLE!!!'
    }), client.transaction()).commit().catch(console.error)
    console.log(`Updated ${res.length} documents.`)
    return {
      statusCode: 200
    }
  } catch (err) {
    return {statusCode: 500, body: err.toString()}
  }
}
