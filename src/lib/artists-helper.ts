export type Artist = {
  slug: string
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

export const artists: Artist[] = [
  {
    slug: "marie-dubois",
    firstName: "Marie",
    lastName: "Dubois",
    title: "Artiste Plasticienne",
    email: "marie.dubois@example.com",
    websiteUrl: "https://marieduboisart.com",
    cardDescription:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
    cardImageUrl: "https://picsum.photos/800/600?random=1",
    cardImageAlt: "Portrait d'artiste dans son atelier",
    profileDescription: `Marie Dubois est une artiste plasticienne renommée, connue pour ses œuvres innovantes qui explorent les thèmes de l'identité et de la mémoire. Son travail a été exposé dans de nombreuses galeries à travers le monde, et elle continue de repousser les limites de l'art contemporain avec chaque nouvelle création. 

      Elle utilise une variété de médiums, y compris la peinture, la sculpture et les installations multimédias, pour créer des expériences immersives qui captivent et inspirent les spectateurs. Marie est également engagée dans des projets communautaires visant à promouvoir l'art et la culture dans les espaces publics.
      
      En plus de son travail artistique, Marie Dubois est une conférencière passionnée et une éducatrice, partageant son expertise et son amour de l'art avec la prochaine génération d'artistes.`,
    profileImageUrlList: [
      {
        url: "https://picsum.photos/800/600?random=11",
        alt: "Œuvre d'art abstraite de Marie Dubois",
      },
      {
        url: "https://picsum.photos/800/600?random=12",
        alt: "Marie Dubois travaillant sur une sculpture",
      },
      {
        url: "https://picsum.photos/800/600?random=13",
        alt: "Installation artistique de Marie Dubois dans une galerie",
      },
    ],
  },
  {
    slug: "antoine-martin",
    firstName: "Antoine",
    lastName: "Martin",
    title: "Sculpteur",
    email: "antoine.martin@example.com",
    websiteUrl: "https://antoinemartinart.com",
    cardDescription:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt.",
    cardImageUrl: "https://picsum.photos/800/600?random=2",
    cardImageAlt: "Sculpteur travaillant dans son atelier",
    profileDescription:
      "Antoine Martin est un sculpteur talentueux, dont le travail explore les formes organiques et les matériaux naturels. Ses sculptures ont été exposées dans plusieurs galeries à travers le pays.",
    profileImageUrlList: [
      {
        url: "https://picsum.photos/800/600?random=21",
        alt: "Sculpture en bois d'Antoine Martin",
      },
      {
        url: "https://picsum.photos/800/600?random=22",
        alt: "Antoine Martin travaillant sur une sculpture",
      },
      {
        url: "https://picsum.photos/800/600?random=23",
        alt: "Installation artistique d'Antoine Martin dans une galerie",
      },
    ],
  },
  {
    slug: "sophie-bernard",
    firstName: "Sophie",
    lastName: "Bernard",
    title: "Peintre Contemporaine",
    email: "sophie.bernard@example.com",
    websiteUrl: "https://sophiebernardart.com",
    cardDescription:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis.",
    cardImageUrl: "https://picsum.photos/800/600?random=3",
    cardImageAlt: "Peintre dans son atelier",
    profileDescription:
      "Sophie Bernard est une peintre contemporaine dont les œuvres vibrantes et expressives captivent les spectateurs. Son utilisation audacieuse de la couleur et de la texture lui a valu une reconnaissance internationale.",
    profileImageUrlList: [
      {
        url: "https://picsum.photos/800/600?random=31",
        alt: "Peinture abstraite de Sophie Bernard",
      },
      {
        url: "https://picsum.photos/800/600?random=32",
        alt: "Sophie Bernard en train de peindre",
      },
      {
        url: "https://picsum.photos/800/600?random=33",
        alt: "Exposition des œuvres de Sophie Bernard dans une galerie",
      },
    ],
  },
  {
    slug: "lucas-moreau",
    firstName: "Lucas",
    lastName: "Moreau",
    title: "Photographe",
    email: "lucas.moreau@example.com",
    websiteUrl: "https://lucasmoreauart.com",
    cardDescription:
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores.",
    cardImageUrl: "https://picsum.photos/800/600?random=4",
    cardImageAlt: "Photographe préparant une installation",
    profileDescription:
      "Lucas Moreau est un photographe primé, spécialisé dans la photographie de paysage et de portrait. Son travail a été publié dans plusieurs magazines internationaux et il continue de capturer des images époustouflantes à travers le monde.",
    profileImageUrlList: [
      {
        url: "https://picsum.photos/800/600?random=41",
        alt: "Portrait photographique de Lucas Moreau",
      },
      {
        url: "https://picsum.photos/800/600?random=42",
        alt: "Lucas Moreau en pleine séance photo en extérieur",
      },
      {
        url: "https://picsum.photos/800/600?random=43",
        alt: "Exposition des photographies de Lucas Moreau dans une galerie",
      },
    ],
  },
]
