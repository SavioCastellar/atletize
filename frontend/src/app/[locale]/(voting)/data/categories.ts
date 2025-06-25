import { Medal, Star } from "lucide-react"

export const categories = [
  {
    id: "basketball",
    name: "Basketball MVP",
    description: "Vote for the most valuable basketball player of the season",
    icon: "medal"
  },
  {
    id: "soccer",
    name: "Soccer Star",
    description: "Choose the outstanding soccer player who made a difference",
    icon: "star"
  },
  {
    id: "volleyball",
    name: "Volleyball Excellence",
    description: "Select the volleyball player who showed exceptional skill",
    icon: "medal"
  }
]

export const candidates = {
  basketball: [
    {
      id: "b1",
      name: "Michael Johnson",
      team: "University Hawks",
      image: "/pessoa.svg"
    },
    {
      id: "b2",
      name: "Sarah Williams",
      team: "University Eagles",
      image: "/pessoa.svg"
    },
    {
      id: "b3",
      name: "David Chen",
      team: "University Lions",
      image: "/pessoa.svg"
    }
  ],
  soccer: [
    {
      id: "s1",
      name: "Emma Rodriguez",
      team: "University United",
      image: "/pessoa.svg"
    },
    {
      id: "s2",
      name: "James Wilson",
      team: "University City",
      image: "/pessoa.svg"
    },
    {
      id: "s3",
      name: "Lisa Thompson",
      team: "University Rovers",
      image: "/pessoa.svg"
    }
  ],
  volleyball: [
    {
      id: "v1",
      name: "Alex Martinez",
      team: "University Spikers",
      image: "/pessoa.svg"
    },
    {
      id: "v2",
      name: "Sophie Lee",
      team: "University Aces",
      image: "/pessoa.svg"
    },
    {
      id: "v3",
      name: "Tom Baker",
      team: "University Stars",
      image: "/pessoa.svg"
    }
  ]
}
