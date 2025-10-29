import { defineCollection, z } from "astro:content"
import client from "../tina/__generated__/client"

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
    tinaInfo: z.object({
      filename: z.string(),
      basename: z.string(),
      path: z.string(),
      relativePath: z.string(),
    }),
    firstName: z.string().nullable().optional(),
    lastName: z.string(),
    title: z.string(),
    email: z.string().nullable().optional(),
    websiteUrl: z.string().nullable().optional(),
    cardDescription: z.string(),
    cardImageUrl: z.string().url(),
    cardImageAlt: z.string(),
    profileDescription: z.string(),
    profileImageUrlList: z
      .array(
        z.object({
          imageUrl: z.string().url(),
          alt: z.string(),
        })
      )
      .nullable()
      .optional(),
  }),
})

export const collections = { artist }
