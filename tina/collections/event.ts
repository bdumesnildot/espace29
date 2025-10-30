import type { Collection } from "tinacms"

export const EventCollection: Collection = {
  name: "event",
  label: "Events",
  path: "src/content/event",
  format: "mdx",
  ui: {
    router({ document }) {
      return `/agenda/${document._sys.filename}`
    },
  },
  fields: [
    {
      name: "title",
      type: "string",
      required: true,
      isTitle: true,
      label: "Title",
      description:
        "e.g., Exposition, Performance, Rencontre, Atelier, Conférence",
    },
    {
      name: "dateStart",
      type: "datetime",
      required: true,
      label: "Start Date",
    },
    {
      name: "dateEnd",
      type: "datetime",
      required: false,
      label: "End Date",
    },
    {
      name: "cardDescription",
      type: "rich-text",
      required: false,
      label: "Card Description",
      description: "Short description shown on Event list page cards",
      toolbarOverride: ["bold", "italic"],
    },
    {
      name: "cardImageUrl",
      type: "string",
      required: false,
      label: "Card Image",
      description: "Image shown on Event list page card",
    },
    {
      name: "cardImageAlt",
      type: "string",
      required: false,
      label: "Card Image Alt Text",
      description: "Accessibility description for card image",
    },
    {
      name: "description",
      type: "rich-text",
      required: true,
      isBody: true,
      label: "Event description",
      description: "Long-form description shown on event detail page",
    },
    {
      name: "imageUrlList",
      type: "object",
      required: false,
      list: true,
      label: "Event Images",
      fields: [
        {
          name: "imageUrl",
          type: "string",
          required: true,
          label: "Image URL",
        },
        {
          name: "alt",
          type: "string",
          required: false,
          label: "Alt Text",
        },
      ],
    },
  ],
}
