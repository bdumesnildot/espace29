import type { Artist } from "@tina/__generated__/types"

export const formatArtistName = (
  artist: Pick<Artist, "firstName" | "lastName">
) => {
  if (artist.firstName) {
    return `${artist.firstName} ${artist.lastName}`
  }
  return artist.lastName
}
