export type EventSeason = {
  slug: string
  name: string
  dateStart: string
  dateEnd: string
}

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

export const eventSeasons: EventSeason[] = [
  {
    slug: "2023-2024",
    name: "Saison 2023-2024",
    dateStart: "2023-09-01",
    dateEnd: "2024-08-31",
  },
  {
    slug: "2024-2025",
    name: "Saison 2024-2025",
    dateStart: "2024-09-01",
    dateEnd: "2025-08-31",
  },
]

export const events: Event[] = [
  // Saison 2023-2024 events
  {
    slug: "exposition-automne-2023",
    title: "Exposition d'automne 2023",
    dateStart: "2023-10-01",
    dateEnd: "2023-11-30",
    cardDescription:
      "Une exposition captivante célébrant les couleurs et textures de l'automne à travers les œuvres d'artistes locaux.",
    cardImageUrl: "https://picsum.photos/800/600?random=1",
    cardImageAlt: "Affiche de l'exposition d'automne 2023",
    Description: `L'exposition d'automne 2023 capture l'essence de cette saison magique à travers une sélection d'œuvres inspirées par les changements naturels et les transformations de la lumière automnale.`,
    ImageUrlList: [
      {
        url: "https://picsum.photos/800/600?random=2",
        alt: "Œuvre automnale 1",
      },
      {
        url: "https://picsum.photos/800/600?random=3",
        alt: "Œuvre automnale 2",
      },
    ],
    practicalInfo:
      "Exposition du 1er octobre au 30 novembre 2023, entrée libre.",
  },
  {
    slug: "conference-art-numerique",
    title: "Conférence Art Numérique",
    dateStart: "2023-11-15",
    cardDescription:
      "Une conférence passionnante sur l'évolution de l'art numérique et ses perspectives d'avenir.",
    cardImageUrl: "https://picsum.photos/800/600?random=4",
    cardImageAlt: "Conférence art numérique",
    Description:
      "Découvrez les dernières tendances en art numérique avec des experts reconnus.",
    ImageUrlList: [
      { url: "https://picsum.photos/800/600?random=5", alt: "Conférence 1" },
    ],
    practicalInfo: "Conférence le 15 novembre 2023 à 19h, inscription requise.",
  },
  {
    slug: "atelier-sculpture-hiver",
    title: "Atelier Sculpture d'Hiver",
    dateStart: "2024-01-20",
    dateEnd: "2024-02-20",
    cardDescription:
      "Un atelier intensif de sculpture pour explorer les matériaux et techniques traditionnelles.",
    cardImageUrl: "https://picsum.photos/800/600?random=6",
    cardImageAlt: "Atelier sculpture hiver",
    Description:
      "Apprenez les bases de la sculpture avec des artistes professionnels.",
    ImageUrlList: [
      { url: "https://picsum.photos/800/600?random=7", alt: "Sculpture 1" },
      { url: "https://picsum.photos/800/600?random=8", alt: "Sculpture 2" },
    ],
    practicalInfo:
      "Atelier tous les samedis de janvier à février 2024, 50€ par session.",
  },
  {
    slug: "exposition-printemps-2024",
    title: "Exposition de Printemps 2024",
    dateStart: "2024-03-15",
    dateEnd: "2024-05-15",
    cardDescription:
      "Célébrez le renouveau printanier avec cette exposition colorée et pleine de vie.",
    cardImageUrl: "https://picsum.photos/800/600?random=9",
    cardImageAlt: "Exposition printemps 2024",
    Description:
      "Une explosion de couleurs et de vie pour célébrer l'arrivée du printemps.",
    ImageUrlList: [
      { url: "https://picsum.photos/800/600?random=10", alt: "Printemps 1" },
      { url: "https://picsum.photos/800/600?random=11", alt: "Printemps 2" },
      { url: "https://picsum.photos/800/600?random=12", alt: "Printemps 3" },
    ],
    practicalInfo: "Exposition du 15 mars au 15 mai 2024, entrée libre.",
  },
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

  // Saison 2024-2025 events
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
  },
  {
    slug: "exposition-photographie-contemporaine",
    title: "Exposition Photographie Contemporaine",
    dateStart: "2024-10-01",
    dateEnd: "2024-12-15",
    cardDescription:
      "Une exploration fascinante de la photographie contemporaine avec des œuvres de photographes émergents et établis.",
    cardImageUrl: "https://picsum.photos/800/600?random=35",
    cardImageAlt: "Exposition photographie contemporaine",
    Description:
      "Découvrez les nouvelles perspectives de la photographie contemporaine à travers des œuvres saisissantes.",
    ImageUrlList: [
      {
        url: "https://picsum.photos/800/600?random=36",
        alt: "Photo contemporaine 1",
      },
      {
        url: "https://picsum.photos/800/600?random=37",
        alt: "Photo contemporaine 2",
      },
      {
        url: "https://picsum.photos/800/600?random=38",
        alt: "Photo contemporaine 3",
      },
    ],
    practicalInfo:
      "Exposition du 1er octobre au 15 décembre 2024, entrée libre.",
  },
  {
    slug: "concert-jazz-novembre",
    title: "Concert de Jazz",
    dateStart: "2024-11-22",
    cardDescription:
      "Une soirée jazz exceptionnelle avec des musiciens renommés dans l'intimité de notre espace.",
    cardImageUrl: "https://picsum.photos/800/600?random=39",
    cardImageAlt: "Concert de jazz",
    Description:
      "Laissez-vous emporter par les mélodies envoûtantes du jazz dans une ambiance feutrée.",
    ImageUrlList: [
      { url: "https://picsum.photos/800/600?random=40", alt: "Concert jazz 1" },
      { url: "https://picsum.photos/800/600?random=41", alt: "Concert jazz 2" },
    ],
    practicalInfo:
      "Concert le 22 novembre 2024 à 20h30, billets 25€, réservation obligatoire.",
  },
  {
    slug: "atelier-ceramique-hiver-2025",
    title: "Atelier Céramique d'Hiver",
    dateStart: "2025-01-10",
    dateEnd: "2025-03-10",
    cardDescription:
      "Apprenez l'art de la céramique dans cet atelier pratique et créatif pendant les mois d'hiver.",
    cardImageUrl: "https://picsum.photos/800/600?random=42",
    cardImageAlt: "Atelier céramique hiver",
    Description:
      "Découvrez les techniques traditionnelles et modernes de la céramique avec des experts.",
    ImageUrlList: [
      { url: "https://picsum.photos/800/600?random=43", alt: "Céramique 1" },
      { url: "https://picsum.photos/800/600?random=44", alt: "Céramique 2" },
      { url: "https://picsum.photos/800/600?random=45", alt: "Céramique 3" },
    ],
    practicalInfo:
      "Atelier tous les mercredis de janvier à mars 2025, 40€ par session.",
  },
  {
    slug: "exposition-street-art",
    title: "Exposition Street Art",
    dateStart: "2025-02-15",
    dateEnd: "2025-04-30",
    cardDescription:
      "Plongez dans l'univers vibrant du street art avec cette exposition qui célèbre l'art urbain.",
    cardImageUrl: "https://picsum.photos/800/600?random=46",
    cardImageAlt: "Exposition street art",
    Description:
      "Une immersion dans la culture street art avec des œuvres authentiques et provocantes.",
    ImageUrlList: [
      { url: "https://picsum.photos/800/600?random=47", alt: "Street art 1" },
      { url: "https://picsum.photos/800/600?random=48", alt: "Street art 2" },
      { url: "https://picsum.photos/800/600?random=49", alt: "Street art 3" },
    ],
    practicalInfo: "Exposition du 15 février au 30 avril 2025, entrée libre.",
  },
  {
    slug: "festival-art-contemporain-2025",
    title: "Festival d'Art Contemporain",
    dateStart: "2025-05-15",
    dateEnd: "2025-06-15",
    cardDescription:
      "Un mois entier dédié à l'art contemporain avec expositions, performances et rencontres d'artistes.",
    cardImageUrl: "https://picsum.photos/800/600?random=50",
    cardImageAlt: "Festival art contemporain 2025",
    Description:
      "Le rendez-vous incontournable de l'art contemporain avec des événements exceptionnels.",
    ImageUrlList: [
      { url: "https://picsum.photos/800/600?random=51", alt: "Festival 1" },
      { url: "https://picsum.photos/800/600?random=52", alt: "Festival 2" },
      { url: "https://picsum.photos/800/600?random=53", alt: "Festival 3" },
      { url: "https://picsum.photos/800/600?random=54", alt: "Festival 4" },
    ],
    practicalInfo:
      "Festival du 15 mai au 15 juin 2025, programmation complète sur notre site.",
  },
  {
    slug: "performance-danse-contemporaine",
    title: "Performance Danse Contemporaine",
    dateStart: "2025-06-28",
    cardDescription:
      "Une performance unique de danse contemporaine qui explore les limites entre art et mouvement.",
    cardImageUrl: "https://picsum.photos/800/600?random=55",
    cardImageAlt: "Performance danse contemporaine",
    Description:
      "Assistez à une performance exceptionnelle qui repousse les frontières de l'art chorégraphique.",
    ImageUrlList: [
      { url: "https://picsum.photos/800/600?random=56", alt: "Danse 1" },
      { url: "https://picsum.photos/800/600?random=57", alt: "Danse 2" },
    ],
    practicalInfo:
      "Performance le 28 juin 2025 à 19h, places limitées, réservation indispensable.",
  },
]
