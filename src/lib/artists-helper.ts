export type Artist = {
  slug?: string
  firstName?: string
  lastName: string
  title: string
  email?: string
  websiteUrl?: string
  cardDescription: string
  cardImageUrl: string
  cardImageAlt: string
  profileDescription: string
  profileImageUrlList: { url: string; alt: string }[]
}

export const formatArtistName = (artist: Artist) => {
  if (artist.firstName) {
    return `${artist.firstName} ${artist.lastName}`
  }
  return artist.lastName
}
