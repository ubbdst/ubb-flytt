<script context="module">
  import client from '../../sanityClient'
  import blocksToHtml from '@sanity/block-content-to-html'
  import serializers from '../../components/serializers'
  import jsonata from 'jsonata'

  import Timeline from '../../components/Timeline'

  export async function preload({ params }) {
		// the `slug` parameter is available because
    // this file is called [slug].html
    const { id } = params;
    const filter = '*[_id == $id][0]';
    const projection = `
      {
        ...,
        media[]{
          caption,
          credit,
          "url": asset->url
        },
        events[] {
          _type == 'reference' => @->{
            ...,
            "media": media{
              caption,
              credit,
              "url": coalesce(url, asset->url)
            }
          },
          _type == 'timelineSlide' => @{
            ...,
            "media": media[0]{
              caption,
              credit,
              "url": coalesce(url, asset->url)
            }
          }
        }
      }`;
    const query = filter + projection
    let data = await client.fetch(query, { id })
      .catch(err => this.error(500, err))
   
    return {data};
  };
</script>

<script>
  export let data;
</script>

<style>
</style>

<svelte:head>
  <title>{data.headline.nor}</title>
</svelte:head>

<nav class="breadcrumb is-centered is-small" aria-label="breadcrumbs">
  <ul>
    <li><a href="/">Hjem</a></li>
    <li><a href="/timelines">Tidslinjer</a></li>
    <li class="is-active"><a href="#" aria-current="page">{data.headline.nor}</a></li>
  </ul>
</nav>

<Timeline data={data} />
 