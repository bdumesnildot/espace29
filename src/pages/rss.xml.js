import rss from "@astrojs/rss"
import { getCollection } from "astro:content"
import config from "@content/config/config.json"

export async function GET(context) {
  const artistCollection = await getCollection("artist")
  const artistItems = artistCollection.reduce((acc, artist) => {
    const { firstName, lastName, tinaInfo } = artist.data
    const title = [firstName, lastName].filter(Boolean).join(" ") || artist.id
    const description = `Profile of ${title}`
    const pubDate = tinaInfo?.lastModified
      ? new Date(tinaInfo.lastModified)
      : new Date()

    acc.push({
      title,
      pubDate,
      description,
      link: `/artistes/${artist.id}/`,
    })
    return acc
  }, [])

  const eventCollection = await getCollection("event")
  const eventItems = eventCollection.reduce((acc, event) => {
    const { title, tinaInfo, dateStart } = event.data
    const description = `Event ${title} details available on the page`
    const pubDate = tinaInfo?.lastModified
      ? new Date(tinaInfo.lastModified)
      : dateStart
        ? new Date(dateStart)
        : new Date()

    acc.push({
      title,
      pubDate,
      description,
      link: `/agenda/${event.id}/`,
    })
    return acc
  }, [])

  return rss({
    title: config.seo.title,
    description: config.seo.description,
    site: context.site,
    items: [...artistItems, ...eventItems],
  })
}
