export type Event = {
  slug: string
  title: string
  dateStart: string
  dateEnd?: string
  cardDescription: string
  cardImageUrl: string
  cardImageAlt: string
  Description: string
  ImageUrlList: { url: string; alt: string }[]
  practicalInfo: string
}

export const events: Event[] = [
  {
    slug: "exposition-ete-2024",
    title: "Exposition d'été 2024",
    dateStart: "2024-07-01",
    dateEnd: "2024-08-31",
    cardDescription:
      "Découvrez notre exposition d'été 2024 mettant en vedette des artistes contemporains locaux et internationaux. Plongez dans un monde d'art innovant et inspirant tout au long de l'été.",
    cardImageUrl: "https://picsum.photos/800/600?random=21",
    cardImageAlt: "Affiche de l'exposition d'été 2024",
    Description: `L'exposition d'été 2024 présente une collection diversifiée d'œuvres d'art contemporain, allant de la peinture à la sculpture en passant par les installations multimédias. Les visiteurs auront l'occasion de découvrir des créations uniques qui explorent des thèmes pertinents tels que l'identité, la technologie et l'environnement.

    Parmi les artistes exposés, on retrouve des talents émergents ainsi que des figures établies du monde de l'art. Chaque œuvre a été soigneusement sélectionnée pour offrir une expérience immersive et engageante aux visiteurs.

    En plus de l'exposition principale, des événements spéciaux tels que des ateliers, des conférences et des visites guidées seront organisés tout au long de l'été pour enrichir l'expérience des visiteurs.`,
    ImageUrlList: [
      {
        url: "https://picsum.photos/800/600?random=22",
        alt: "Installation artistique de l'exposition d'été 2024",
      },
      {
        url: "https://picsum.photos/800/600?random=23",
        alt: "Peinture contemporaine présentée dans l'exposition d'été 2024",
      },
      {
        url: "https://picsum.photos/800/600?random=24",
        alt: "Sculpture moderne exposée lors de l'exposition d'été 2024",
      },
    ],
    practicalInfo: `L'exposition d'été 2024 se tiendra du 1er juillet au 31 août 2024, du mardi au dimanche, de 10h00 à 18h00. L'entrée est gratuite pour tous les visiteurs.

    Adresse : Espace29, 123 Rue de l'Art, 75000 Paris, France.

    Accessibilité : L'Espace29 est entièrement accessible aux personnes à mobilité réduite. N'hésitez pas à nous contacter pour toute demande spécifique.

    Pour plus d'informations sur les événements spéciaux et les ateliers, veuillez consulter notre site web ou nous suivre sur les réseaux sociaux.`,
  },
  {
    slug: "atelier-de-peinture-pour-enfants",
    title: "Atelier de peinture pour enfants",
    dateStart: "2024-09-15",
    cardDescription:
      "Rejoignez notre atelier de peinture spécialement conçu pour les enfants âgés de 6 à 12 ans. Cet atelier ludique et éducatif permettra aux jeunes artistes de découvrir les bases de la peinture tout en s'amusant.",
    cardImageUrl: "https://picsum.photos/800/600?random=31",
    cardImageAlt: "Enfants participant à un atelier de peinture",
    Description: `L'atelier de peinture pour enfants est une opportunité unique pour les jeunes artistes de développer leur créativité et leurs compétences artistiques dans un environnement amusant et encourageant. Sous la supervision d'artistes professionnels, les enfants apprendront différentes techniques de peinture, exploreront l'utilisation des couleurs et exprimeront leurs idées à travers l'art.

    Chaque session de l'atelier comprendra des activités pratiques, des démonstrations et des discussions sur l'art. Les enfants auront également l'occasion de créer leurs propres œuvres d'art qu'ils pourront emporter chez eux à la fin de l'atelier.

    L'atelier est conçu pour être interactif et engageant, favorisant la confiance en soi et l'expression personnelle chez les jeunes participants.`,
    ImageUrlList: [
      {
        url: "https://picsum.photos/800/600?random=32",
        alt: "Œuvres d'art créées par des enfants lors de l'atelier de peinture",
      },
      {
        url: "https://picsum.photos/800/600?random=33",
        alt: "Enfant peignant sur une toile pendant l'atelier",
      },
      {
        url: "https://picsum.photos/800/600?random=34",
        alt: "Groupe d'enfants participant à l'atelier de peinture",
      },
    ],
    practicalInfo: `L'atelier de peinture pour enfants aura lieu le 15 septembre 2024, de 14h00 à 16h00, à l'Espace29.

    L'atelier est ouvert aux enfants âgés de 6 à 12 ans. Le nombre de places est limité, il est donc recommandé de s'inscrire à l'avance.

    Matériel : Tout le matériel nécessaire (peintures, pinceaux, toiles, tabliers) sera fourni aux participants.

    Tarifs : Le coût de l'atelier est de 20 € par enfant. Les inscriptions peuvent être effectuées en ligne via notre site web ou directement à l'Espace29.`,
  }
]