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
      type: "string",
      name: "title",
      label: "Title",
      required: true,
      description:
        "e.g., Exposition, Performance, Rencontre, Atelier, Conférence",
      isTitle: true,
    },
    {
      type: "datetime",
      name: "dateStart",
      label: "Start Date",
      required: true,
    },
    {
      type: "datetime",
      name: "dateEnd",
      label: "End Date",
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
      description: "Short description shown on Event list page cards",
    },
    {
      type: "string",
      name: "cardImageUrl",
      label: "Card Image",
      required: false,
      description: "Image shown on Event list page card",
    },
    {
      type: "string",
      name: "cardImageAlt",
      label: "Card Image Alt Text",
      required: false,
      description: "Accessibility description for card image",
    },
    {
      type: "rich-text",
      name: "description",
      label: "Event description",
      required: false,
      ui: {
        component: "textarea",
      },
      description: "Long-form description shown on event detail page",
    },
    {
      type: "object",
      name: "imageUrlList",
      label: "Event Images",
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
