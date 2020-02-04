// Not working

export function normalizeTL(data) {
  const events = data.events.map(function (event, i) {
    if (event._type == "event") {
      return {
        start_date: {
          year: dayjs(
            event.timespan[0].beginOfTheBegin ?
            event.timespan[0].beginOfTheBegin :
            event.timespan[0].date
          ).format("YYYY"),
          day: dayjs(
            event.timespan[0].beginOfTheBegin ?
            event.timespan[0].beginOfTheBegin :
            event.timespan[0].date
          ).format("DD"),
          month: dayjs(
            event.timespan[0].beginOfTheBegin ?
            event.timespan[0].beginOfTheBegin :
            event.timespan[0].date
          ).format("MM")
        },
        end_date: {
          year: dayjs(
            event.timespan[0].endOfTheEnd ?
            event.timespan[0].endOfTheEnd :
            event.timespan[0].date
          ).format("YYYY"),
          day: dayjs(
            event.timespan[0].endOfTheEnd ?
            event.timespan[0].endOfTheEnd :
            event.timespan[0].date
          ).format("DD"),
          month: dayjs(
            event.timespan[0].endOfTheEnd ?
            event.timespan[0].endOfTheEnd :
            event.timespan[0].date
          ).format("MM")
        },
        media: Object.assign({}, event.media, {
          caption: event.media.caption,
          credit: event.media.credit
        }),
        text: Object.assign({}, {
          headline: event.label.nor,
          text: event.description ?
            blocksToHtml({
              blocks: event.description.nor.filter(({
                _key = ""
              }) => _key)
            }) : ""
        })
      };
    }
    if (event._type == "timelineSlide") {
      return {
        start_date: {
          year: dayjs(
            event.timespan[0].beginOfTheBegin ?
            event.timespan[0].beginOfTheBegin :
            event.timespan[0].date
          ).format("YYYY"),
          day: dayjs(
            event.timespan[0].beginOfTheBegin ?
            event.timespan[0].beginOfTheBegin :
            event.timespan[0].date
          ).format("DD"),
          month: dayjs(
            event.timespan[0].beginOfTheBegin ?
            event.timespan[0].beginOfTheBegin :
            event.timespan[0].date
          ).format("MM")
        },
        end_date: {
          year: dayjs(
            event.timespan[0].endOfTheEnd ?
            event.timespan[0].endOfTheEnd :
            event.timespan[0].date
          ).format("YYYY"),
          day: dayjs(
            event.timespan[0].endOfTheEnd ?
            event.timespan[0].endOfTheEnd :
            event.timespan[0].date
          ).format("DD"),
          month: dayjs(
            event.timespan[0].endOfTheEnd ?
            event.timespan[0].endOfTheEnd :
            event.timespan[0].date
          ).format("MM")
        },
        media: Object.assign({}, event.media, {
          url: event.media.url ? event.media.url : null,
          caption: event.media.caption ? event.media.caption : null,
          credit: event.media.credit ? event.media.credit : null
        }),
        text: Object.assign({}, {
          headline: event.headline.nor,
          text: event.text.nor ?
            blocksToHtml({
              blocks: event.text.nor.filter(({
                _key = ""
              }) => _key)
            }) : ""
        })
      };
    }
  });

  const tl = Object.assign({}, data, {
    title: {
      text: {
        headline: data.headline.nor,
        text: data.text.nor ?
          blocksToHtml({
            blocks: data.text.nor.filter(({
              _key = ""
            }) => _key)
          }) : ""
      },
      /* background: Object.assign({}, title.background, {
        color: title.background.color.hex ? title.background.color.hex : '#dddddd'
      }), */
      media: {
        url: data.media[0].url ? data.media[0].url : null,
        caption: data.media[0].caption ?
          blocksToHtml({
            blocks: data.media[0].caption.filter(({
              _key = ""
            }) => _key)
          }) : "",
        credit: data.media[0].credit ?
          blocksToHtml({
            blocks: data.media[0].credit.filter(({
              _key = ""
            }) => _key)
          }) : ""
      }
    },
    events
  });
  return {
    tl
  };
}
