import type { Collection } from "tinacms"

export const ArtistCollection: Collection = {
  name: "artist",
  label: "Artists",
  path: "src/content/artist",
  format: "mdx",
  ui: {
    router({ document }) {
      return `/artistes-poc/${document._sys.filename}`
    },
  },
  fields: [
    {
      type: "string",
      name: "firstName",
      label: "First Name",
      required: false,
    },
    {
      type: "string",
      name: "lastName",
      label: "Last Name",
      isTitle: true,
      required: true,
    },
    {
      type: "string",
      name: "title",
      label: "Title",
      required: false,
      description:
        "e.g., Artiste Plasticienne, Sculpteur, Peintre Contemporaine",
    },
    {
      type: "string",
      name: "email",
      label: "Email",
      required: false,
    },
    {
      type: "string",
      name: "websiteUrl",
      label: "Website URL",
      required: false,
    },
    {
      type: "string",
      name: "cardDescription",
      label: "Card Description",
      required: false,
      ui: {
        component: "textarea",
      },
      description: "Short description shown on artist list page cards",
    },
    {
      type: "string",
      name: "cardImageUrl",
      label: "Card Image",
      required: false,
      description: "Image shown on artist list page card",
    },
    {
      type: "string",
      name: "cardImageAlt",
      label: "Card Image Alt Text",
      required: false,
      description: "Accessibility description for card image",
    },
    {
      type: "string",
      name: "profileDescription",
      label: "Profile Description",
      required: false,
      ui: {
        component: "textarea",
      },
      description: "Long-form biography shown on artist detail page",
    },
    {
      type: "object",
      name: "profileImageUrlList",
      label: "Profile Images",
      list: true,
      required: false,
      ui: {
        itemProps: (item) => {
          return { label: item?.alt || "Image" }
        },
      },
      fields: [
        {
          type: "string",
          name: "imageUrl",
          label: "Image URL",
          required: false,
        },
        {
          type: "string",
          name: "alt",
          label: "Alt Text",
          required: false,
        },
      ],
    },
  ],
}
