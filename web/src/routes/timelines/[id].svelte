<script context="module">
  import client from '../../sanityClient'
  import blocksToHtml from '@sanity/block-content-to-html'
  import serializers from '../../components/serializers'
  import jsonata from 'jsonata'
  import dayjs from 'dayjs'

  export async function preload({ params }) {
		// the `slug` parameter is available because
    // this file is called [slug].html
    const { id } = params;
    const filter = '*[_id == $id][0]';
    const projection = `
      {
        ...,
        title{
          ...,
          media{
            caption,
            credit,
            "url": asset->url
          }
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
            "media": media{
              caption,
              credit,
              "url": coalesce(url, asset->url)
            }
          }
        }
      }`;
    const query = filter + projection
    let data = await client.fetch(query, { id }).catch(err => this.error(500, err))
   
    console.log(JSON.stringify(data, undefined, 2));
    
    const events = await data.events.map(
      function (event, i) {
      if(event._type == 'event') {
        return {
          start_date: {
            year: dayjs(event.timespan[0].beginOfTheBegin ? event.timespan[0].beginOfTheBegin : event.timespan[0].date).format("YYYY"),
            day: dayjs(event.timespan[0].beginOfTheBegin ? event.timespan[0].beginOfTheBegin : event.timespan[0].date).format("DD"),
            month: dayjs(event.timespan[0].beginOfTheBegin ? event.timespan[0].beginOfTheBegin : event.timespan[0].date).format("MM")
          },
          end_date: {
            year: dayjs(event.timespan[0].endOfTheEnd ? event.timespan[0].endOfTheEnd : event.timespan[0].date).format("YYYY"),
            day: dayjs(event.timespan[0].endOfTheEnd ? event.timespan[0].endOfTheEnd : event.timespan[0].date).format("DD"),
            month: dayjs(event.timespan[0].endOfTheEnd ? event.timespan[0].endOfTheEnd : event.timespan[0].date).format("MM")
          },
          media: Object.assign({}, event.media, {
            caption: event.media.caption,
            credit: event.media.credit
          }),
          text: Object.assign({}, {
            headline: event.label,
            text: event.description
              ? blocksToHtml({
                  blocks: event.description.nor.filter(({ _key = "" }) => _key)
                })
              : ""
          })
        }
      }
      if(event._type == 'timelineSlide') {
        return {
          start_date: {
            year: dayjs(event.timespan[0].beginOfTheBegin ? event.timespan[0].beginOfTheBegin : event.timespan[0].date).format("YYYY"),
            day: dayjs(event.timespan[0].beginOfTheBegin ? event.timespan[0].beginOfTheBegin : event.timespan[0].date).format("DD"),
            month: dayjs(event.timespan[0].beginOfTheBegin ? event.timespan[0].beginOfTheBegin : event.timespan[0].date).format("MM")
          },
          end_date: {
            year: dayjs(event.timespan[0].endOfTheEnd ? event.timespan[0].endOfTheEnd : event.timespan[0].date).format("YYYY"),
            day: dayjs(event.timespan[0].endOfTheEnd ? event.timespan[0].endOfTheEnd : event.timespan[0].date).format("DD"),
            month: dayjs(event.timespan[0].endOfTheEnd ? event.timespan[0].endOfTheEnd : event.timespan[0].date).format("MM")
          },
          media: Object.assign({}, event.media, {
            caption: event.media.caption,
            credit: event.media.credit
          }),
          text: Object.assign({}, {
            headline: event.text.headline,
            text: event.text.text
              ? blocksToHtml({
                  blocks: event.text.text.nor.filter(({ _key = "" }) => _key)
                })
              : ""
          })
        }
      }
    });





/*       ({ start_date = new Date(), end_date = new Date(), media = {}, text }) => ({
        start_date: {
          year: dayjs(start_date).format("YYYY"),
          day: dayjs(start_date).format("DD"),
          month: dayjs(start_date).format("MM")
        },
        end_date: {
          year: dayjs(start_date).format("YYYY"),
          day: dayjs(start_date).format("DD"),
          month: dayjs(start_date).format("MM")
        },
        media,
        text: Object.assign({}, text, {
          text: text.text
            ? blocksToHtml({
                blocks: text.text.nor.filter(({ _key = "" }) => _key)
              })
            : ""
        })
      })
    ); */

    const { title } = data;

    const tl = await Object.assign({}, data, {
      title: {
        text: {
          headline: title.text.headline,
          text: title.text.text.nor ? blocksToHtml({
                blocks: title.text.text.nor.filter(({ _key = "" }) => _key)
              })
            : ""
        },
        /* background: Object.assign({}, title.background, {
          color: title.background.color.hex ? title.background.color.hex : '#dddddd'
        }), */
        media: Object.assign({}, title.media, {
          caption: title.media.caption
            ? blocksToHtml({
                blocks: title.media.caption.filter(({ _key = "" }) => _key)
              })
            : "",
          credit: title.media.credit
            ? blocksToHtml({
                blocks: title.media.credit.filter(({ _key = "" }) => _key)
              })
            : ""
        })
      },
      events
    });

    //const { media = {}, title = { text: {} }, events = [] } = data;
    /* const timeline = {
      title: {
        text: {
          headline: title.text.headline,
          text: "test"
        }
      },
      media,
      events: events.map(
        ({
          media = {},
          text: { headline = "", text = "" } = {},
          start_date = ""
        }) => ({
          text: {
            headline,
            text: text
              ? blocksToHtml({ blocks: text.filter(({ _key = "" }) => _key) })
              : ""
          },
          media,
          start_date: {
            year: dayjs(start_date).format("YYYY"),
            day: dayjs(start_date).format("DD"),
            month: dayjs(start_date).format("MM")
          }
        })
      )
    }; */
    console.log(tl);
    return {tl};
  };
</script>

<script>
  import { onMount } from 'svelte';
  export let tl;

  onMount(() => {
    const options = {
      debug: true
    }
    async function timeline()  { 
      await tl;
      const timeline = new TL.Timeline('timeline-embed', tl, options);
    }
    timeline();
  })
</script>

<style>
</style>

<svelte:head>
  <title>{tl.title.text.headline}</title>
</svelte:head>
 
 <div id='timeline-embed' style="width: 100%; height: 600px"></div>