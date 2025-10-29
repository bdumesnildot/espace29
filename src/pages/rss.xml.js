import rss from "@astrojs/rss"
import { getCollection } from "astro:content"
import config from "../content/config/config.json"

export async function GET(context) {
  const artistCollection = await getCollection("artist")
  const artistItems = artistCollection.map((artist) => ({
    ...artist.data,
    link: `/artistes/${artist.id}/`,
  }))

  const eventCollection = await getCollection("event")
  const eventItems = eventCollection.map((event) => ({
    ...event.data,
    link: `/agenda/${event.id}/`,
  }))

  return rss({
    title: config.seo.title,
    description: config.seo.description,
    site: context.site,
    items: [...artistItems, ...eventItems],
  })
}
