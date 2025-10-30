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
      name: "name",
      type: "string",
      required: true,
      isTitle: true,
      label: "Season Name",
      description: "e.g., Saison 2024-2025",
    },
    {
      name: "dateStart",
      type: "datetime",
      required: true,
      label: "Start Date",
      description: "Start date of the season",
    },
    {
      name: "dateEnd",
      type: "datetime",
      required: true,
      label: "End Date",
      description: "End date of the season",
    },
  ],
}
