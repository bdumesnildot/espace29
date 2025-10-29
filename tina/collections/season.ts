import type { Collection } from "tinacms"

export const SeasonCollection: Collection = {
  name: "season",
  label: "Seasons",
  path: "src/content/season",
  format: "mdx",
  ui: {
    router({ document }) {
      return `/agenda/${document._sys.filename}`
    },
  },
  fields: [
    {
      type: "string",
      name: "name",
      label: "Season Name",
      description: "e.g., Saison 2024-2025",
      isTitle: true,
      required: true,
    },
    {
      type: "datetime",
      name: "dateStart",
      label: "Start Date",
      description: "Start date of the season",
      required: true,
    },
    {
      type: "datetime",
      name: "dateEnd",
      label: "End Date",
      description: "End date of the season",
      required: true,
    },
  ],
}
