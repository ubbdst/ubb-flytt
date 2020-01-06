<script context="module">
  import client from '../../sanityClient'

  import Block from '../../components/Block'

	export async function preload({ params }) {
		// the `slug` parameter is available because
    // this file is called [slug].html
    const { slug } = params
    const filter = '*[_type == "linguisticObject" && slug.current == $slug][0]'
    const projection = `{
      ...,
      body{
        nor[]{
          _type == 'reference' => @->{
            _id,
            _type,
            preferredIdentifier,
            label,
            headline,
            text,
            mainRepresentation,
            media,
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
        	},
          ...,
          children[]{
            ...
          }
        }
      },
      body[]{
        _type == 'reference' => @->{
          _id,
          _type,
          preferredIdentifier,
          label,
          mainRepresentation,
          media
        },
        ...,
        children[]{
          ...
        }
      },
    }`

    const query = filter + projection
    const post = await client.fetch(query, { slug }).catch(err => this.error(500, err))
    return { post: {
      ...post,
    } };
	}
</script>

<script>
	export let post;
</script>

<style>
	/*
		By default, CSS is locally scoped to the component,
		and any unused styles are dead-code-eliminated.
		In this page, Svelte can't know which elements are
		going to appear inside the {{{post.html}}} block,
		so we have to use the :global(...) modifier to target
		all elements inside .content
	*/

</style>

<svelte:head>
	<title>{post.label}</title>
</svelte:head>

<nav class="breadcrumb is-centered is-small" aria-label="breadcrumbs">
  <ul>
    <li><a href="/">Hjem</a></li>
    <li><a href="/articles">Artikler</a></li>
    <li class="is-active"><a href="#" aria-current="page">{post.label.nor}</a></li>
  </ul>
</nav>

<main class="section">
  <div class="text container">
    <div class='content'>
    <h1 class="title">{post.label.nor}</h1>
     <Block content={post.body.nor}/>
    </div>
  </div>
</main>
