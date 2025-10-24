import { defineCollection, z } from "astro:content"
import client from "../tina/__generated__/client"

const blog = defineCollection({
  loader: async () => {
    const postsResponse = await client.queries.blogConnection()

    // Map Tina posts to the correct format for Astro
    return (postsResponse.data.blogConnection.edges || [])
      ?.filter((post) => !!post)
      .map((post) => {
        const node = post?.node

        if (!node?._sys) {
          throw new Error("Missing _sys field")
        }

        return {
          ...node,
          id: node._sys.relativePath.replace(/\.mdx?$/, ""), // Generate clean URLs
          tinaInfo: node._sys, // Include Tina system info if needed
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
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().nullish(),
  }),
})

const page = defineCollection({
  loader: async () => {
    const postsResponse = await client.queries.pageConnection()

    return (postsResponse.data.pageConnection.edges || [])
      ?.filter((post) => !!post)
      .map((post) => {
        const node = post.node

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
    seoTitle: z.string().optional(),
    body: z.any().optional(),
  }),
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

export const collections = { blog, page, artist }
