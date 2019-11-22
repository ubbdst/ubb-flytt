<script context="module">
  import blocksToHtml from '@sanity/block-content-to-html'
  import client from '../../sanityClient'
  import serializers from '../../components/serializers'
	export async function preload({ params }) {
		// the `slug` parameter is available because
    // this file is called [slug].html
    const { slug } = params
    const filter = '*[_type == "post" && slug.current == $slug][0]'
    const projection = `{
      ...,
      body[]{
        ...,
        children[]{
          ...,
          _type == 'authorReference' => {
            author->
          }
        }
      }
    }`

    const query = filter + projection
    const post = await client.fetch(query, { slug }).catch(err => this.error(500, err))
    return { post: {
      ...post,
      body: blocksToHtml({blocks: post.body, serializers, ...client.clientConfig })
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
    <li class="is-active"><a href="#" aria-current="page">{post.label}</a></li>
  </ul>
</nav>

<main class="section">
  <div class="container">
    <div class='content'>
    <h1 class="title">{post.label}</h1>
      {@html post.body}
    </div>
  </div>
</main>
