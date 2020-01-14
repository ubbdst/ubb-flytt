<script>
  import BlockContent from '@movingbrands/svelte-portable-text'
  import ActivityStream from './ActivityStream.svelte'
  import Cards from './Cards.svelte'
  import MediaObjects from './MediaObjects.svelte'
  import ConditionAssignment from './ConditionAssignment.svelte'
  import Map from './Map.svelte'
  import Geojson from './Geojson.svelte'
  import Timeline from './Timeline.svelte'
  import MainImage from './MainImage.svelte'
  import BlockMadeObject from './BlockMadeObject.svelte'
  import BlockImage from './BlockImage.svelte'
  import ItemList from './ItemList.svelte'
  import InstagramPost from './InstagramPost.svelte'
  import InternalLink from './internalLink.svelte'
  import ImageCompare from './ImageCompare.svelte'

  function formatDate(date) {
    return new Date(date).toLocaleDateString()
  }

  export let content;
  export const customSerializers = {
    types: {
      mainImage: props => {
        return {
          component: BlockImage,
          childNodes: props.children,
          props: {
            image: props.node.image,
            manifest: props.node.manifest,
            source: props.node.source,
            caption: props.node.caption,
            alt: props.node.alt,
            id: props.node.id,
            rights: props.node.rights,
          }
        };
      },
      figure: props => {
        return {
          component: BlockImage,
          childNodes: props.children,
          props: {
            image: props.node.asset,
            // manifest: props.node.manifest,
            source: props.node.source,
            caption: props.node.caption,
            alt: props.node.alt,
            id: props.node.id,
            rights: props.node.rights,
          }
        };
      },
      madeObject: props => {
        return {
          component: BlockMadeObject,
          childNodes: props.children,
          props: {
            image: props.node.mainRepresentation,
            // manifest: props.node.mainManifest,
            source: props.node.source,
            alt: props.node.label,
            label: props.node.label,
            id: props.node._id
          }
        };
      },
      event: props => {
        return {
          component: ItemList,
          childNodes: props.children,
          props: {
            image: props.node.media,
            label: props.node.label.nor,
            id: props.node._id,
          }
        };
      },
      instagramPost: props => {
        return {
          component: InstagramPost,
          childNodes: props.children,
          props: {
            url: props.node.url
          }
        };
      },
      timeline: props => {
        return {
          component: Timeline,
          childNodes: props.children,
          props: {
            item: props.node
          }
        };
      },
      imageCompare: props => {
        return {
          component: ImageCompare,
          childNodes: props.children,
          props: {
            before: props.node.before[0].asset.url,
            after: props.node.after[0].asset.url,
            contain: true,
            caption: props.node.caption.nor
          }
        };
      },
      place: props => {
        return {
          component: Map,
          childNodes: props.children,
          props: {
            src: props.node,
            label: props.node.label.nor,
            height: '300px'
          }
        };
      },
      geojson: props => {
        return {
          component: Geojson,
          childNodes: props.children,
          props: {
            src: props.node,
            height: '500px'
          }
        };
      }
    },
    marks: {
      internalLink: props => {
        return {
          component: InternalLink,
          childNodes: props.children,
          props: {
            id: props.mark.reference._ref
          }
        };
      }
    }
  };
</script>

<style>

</style>

<BlockContent blocks={content} serializers={customSerializers} />
