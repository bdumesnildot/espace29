import { defineCollection, z } from "astro:content"
import client from "../tina/__generated__/client"

const tinaInfoSchema = z.object({
  filename: z.string(),
  basename: z.string(),
  path: z.string(),
  relativePath: z.string(),
})

const artist = defineCollection({
  loader: async () => {
    const artistsResponse = await client.queries.artistConnection()

    return (artistsResponse.data.artistConnection.edges || [])
      ?.filter((artist) => !!artist)
      .map((artist) => {
        const node = artist.node

        if (!node?._sys) {
          throw new Error("Missing _sys field")
        }

        return {
          ...node,
          id: node._sys.relativePath.replace(/\.mdx?$/, ""),
          tinaInfo: node._sys,
        }
      })
  },
  schema: z.object({
    tinaInfo: tinaInfoSchema,
    firstName: z.string().nullish(),
    lastName: z.string(),
    title: z.string(),
    email: z.string().nullish(),
    websiteUrl: z.string().nullish(),
    cardDescription: z.string().or(z.object({})),
    cardImageUrl: z.string().url(),
    cardImageAlt: z.string(),
    profileDescription: z.string().or(z.object({})),
    profileImageUrlList: z
      .array(
        z.object({
          imageUrl: z.string().url(),
          alt: z.string().nullish(),
        })
      )
      .nullish(),
  }),
})

const season = defineCollection({
  loader: async () => {
    const seasonsResponse = await client.queries.seasonConnection()

    return (seasonsResponse.data.seasonConnection.edges || [])
      ?.filter((season) => !!season)
      .map((season) => {
        const node = season.node

        if (!node?._sys) {
          throw new Error("Missing _sys field")
        }

        return {
          ...node,
          id: node._sys.relativePath.replace(/\.mdx?$/, ""),
          tinaInfo: node._sys,
        }
      })
  },
  schema: z.object({
    tinaInfo: tinaInfoSchema,
    name: z.string(),
    dateStart: z.string().datetime(),
    dateEnd: z.string().datetime(),
  }),
})

const event = defineCollection({
  loader: async () => {
    const eventsResponse = await client.queries.eventConnection()

    return (eventsResponse.data.eventConnection.edges || [])
      ?.filter((event) => !!event)
      .map((event) => {
        const node = event.node

        if (!node?._sys) {
          throw new Error("Missing _sys field")
        }

        return {
          ...node,
          id: node._sys.relativePath.replace(/\.mdx?$/, ""),
          tinaInfo: node._sys,
        }
      })
  },
  schema: z.object({
    tinaInfo: tinaInfoSchema,
    title: z.string(),
    dateStart: z.string().datetime(),
    dateEnd: z.string().datetime().nullish(),
    cardDescription: z.string().or(z.object({})),
    cardImageUrl: z.string().url(),
    cardImageAlt: z.string(),
    description: z.string().or(z.object({})),
    imageUrlList: z
      .array(
        z.object({
          imageUrl: z.string().url(),
          alt: z.string().nullish(),
        })
      )
      .nullish(),
  }),
})

export const collections = { artist, season, event }
