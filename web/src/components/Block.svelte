<script>
  import BlockContent from '@movingbrands/svelte-portable-text'
  import ActivityStream from './ActivityStream'
  import Cards from './Cards'
  import MediaObjects from './MediaObjects'
  import ConditionAssignment from './ConditionAssignment'
  import Map from './Map'
  import Timeline from './Timeline'
  import MainImage from './MainImage'
  import BlockMadeObject from './BlockMadeObject'
  import BlockImage from './BlockImage'
  import ItemList from './ItemList'
  import InstagramPost from './InstagramPost'
  import InternalLink from './internalLink'
  import ImageCompare from './ImageCompare.svelte';

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
            manifest: props.node.manifest,
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
            manifest: props.node.manifest,
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
            data: props.node
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
            contain: true
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

<div class="content">
  <BlockContent blocks={content} serializers={customSerializers} />
</div>