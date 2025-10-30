import type { Collection } from "tinacms"

export const ArtistCollection: Collection = {
  name: "artist",
  label: "Artists",
  path: "src/content/artist",
  format: "mdx",
  ui: {
    router({ document }) {
      return `/artistes/${document._sys.filename}`
    },
  },
  fields: [
    {
      name: "firstName",
      type: "string",
      required: false,
      label: "First Name",
    },
    {
      name: "lastName",
      type: "string",
      required: true,
      isTitle: true,
      label: "Last Name",
    },
    {
      name: "title",
      type: "string",
      required: true,
      label: "Title",
      description:
        "e.g., Artiste Plasticienne, Sculpteur, Peintre Contemporaine",
    },
    {
      name: "email",
      type: "string",
      required: false,
      label: "Email",
    },
    {
      name: "websiteUrl",
      type: "string",
      required: false,
      label: "Website URL",
    },
    {
      name: "cardDescription",
      type: "rich-text",
      required: true,
      label: "Card Description",
      description: "Short description shown on artist list page cards",
      toolbarOverride: ["bold", "italic"],
    },
    {
      name: "cardImageUrl",
      type: "string",
      required: true,
      label: "Card Image",
      description: "Image shown on artist list page card",
    },
    {
      name: "cardImageAlt",
      type: "string",
      required: false,
      label: "Card Image Alt Text",
      description: "Accessibility description for card image",
    },
    {
      name: "profileDescription",
      type: "rich-text",
      required: true,
      isBody: true,
      label: "Profile Description",
      description: "Long-form biography shown on artist detail page",
    },
    {
      name: "profileImageUrlList",
      type: "object",
      required: false,
      list: true,
      label: "Profile Images",
      fields: [
        {
          type: "string",
          name: "imageUrl",
          label: "Image URL",
          required: true,
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
