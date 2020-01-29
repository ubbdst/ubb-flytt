<script>
  import { onMount } from "svelte";
  import blocksToHtml from "@sanity/block-content-to-html";
  import serializers from "./serializers";
  import dayjs from "dayjs";

  export let item;

  console.log(JSON.stringify(item, undefined, 2));

  const events = item.events.map(function(event, i) {
    if (event._type == "event") {
      return {
        start_date: {
          year: dayjs(
            event.timespan[0].beginOfTheBegin
              ? event.timespan[0].beginOfTheBegin
              : event.timespan[0].date
          ).format("YYYY"),
          day: dayjs(
            event.timespan[0].beginOfTheBegin
              ? event.timespan[0].beginOfTheBegin
              : event.timespan[0].date
          ).format("DD"),
          month: dayjs(
            event.timespan[0].beginOfTheBegin
              ? event.timespan[0].beginOfTheBegin
              : event.timespan[0].date
          ).format("MM")
        },
        end_date: {
          year: dayjs(
            event.timespan[0].endOfTheEnd
              ? event.timespan[0].endOfTheEnd
              : event.timespan[0].date
          ).format("YYYY"),
          day: dayjs(
            event.timespan[0].endOfTheEnd
              ? event.timespan[0].endOfTheEnd
              : event.timespan[0].date
          ).format("DD"),
          month: dayjs(
            event.timespan[0].endOfTheEnd
              ? event.timespan[0].endOfTheEnd
              : event.timespan[0].date
          ).format("MM")
        },
        media: event.media
          ? Object.assign({}, event.media, {
              caption: event.media.caption,
              credit: event.media.credit
            })
          : "",
        text: Object.assign(
          {},
          {
            headline: event.label.nor,
            text: event.description
              ? blocksToHtml({
                  blocks: event.description.nor.filter(({ _key = "" }) => _key)
                })
              : ""
          }
        )
      };
    }
    if (event._type == "timelineSlide") {
      return {
        start_date: {
          year: dayjs(
            event.timespan[0].beginOfTheBegin
              ? event.timespan[0].beginOfTheBegin
              : event.timespan[0].date
          ).format("YYYY"),
          day: dayjs(
            event.timespan[0].beginOfTheBegin
              ? event.timespan[0].beginOfTheBegin
              : event.timespan[0].date
          ).format("DD"),
          month: dayjs(
            event.timespan[0].beginOfTheBegin
              ? event.timespan[0].beginOfTheBegin
              : event.timespan[0].date
          ).format("MM")
        },
        end_date: {
          year: dayjs(
            event.timespan[0].endOfTheEnd
              ? event.timespan[0].endOfTheEnd
              : event.timespan[0].date
          ).format("YYYY"),
          day: dayjs(
            event.timespan[0].endOfTheEnd
              ? event.timespan[0].endOfTheEnd
              : event.timespan[0].date
          ).format("DD"),
          month: dayjs(
            event.timespan[0].endOfTheEnd
              ? event.timespan[0].endOfTheEnd
              : event.timespan[0].date
          ).format("MM")
        },
        media: event.media
          ? Object.assign({}, event.media, {
              url: event.media.url ? event.media.url : null,
              caption: event.media.caption ? event.media.caption : null,
              credit: event.media.credit ? event.media.credit : null
            })
          : "",
        text: Object.assign(
          {},
          {
            headline: event.headline.nor,
            text: event.text.nor
              ? blocksToHtml({
                  blocks: event.text.nor.filter(({ _key = "" }) => _key)
                })
              : ""
          }
        )
      };
    }
  });

  const tl = Object.assign({}, item, {
    title: {
      text: {
        headline: item.headline.nor,
        text: item.text.nor
          ? blocksToHtml({
              blocks: item.text.nor.filter(({ _key = "" }) => _key)
            })
          : ""
      },
      /* background: Object.assign({}, title.background, {
          color: title.background.color.hex ? title.background.color.hex : '#dddddd'
        }), */
      media: {
        url: item.media[0].url ? item.media[0].url : null,
        caption: item.media[0].caption
          ? blocksToHtml({
              blocks: item.media[0].caption.filter(({ _key = "" }) => _key)
            })
          : "",
        credit: item.media[0].credit
          ? blocksToHtml({
              blocks: item.media[0].credit.filter(({ _key = "" }) => _key)
            })
          : ""
      }
    },
    events
  });

  onMount(() => {
    const options = {
      debug: false
    };
    async function timeline() {
      await tl;
      const timeline = new TL.Timeline("timeline-embed", tl, options);
    }
    timeline();
  });
</script>

<style>

</style>

<div class="container is-fluid">
  <div id="timeline-embed" style="width: 100%; height: 600px" />
</div>
