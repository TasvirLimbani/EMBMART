export interface Design {
  id: number
  name: string
  price: number
  originalPrice?: number
  image: string
  category: string
  isNew?: boolean
  isSale?: boolean
  description?: string
  stitchCount?: string
  colors?: number
  formats?: string[]
  size?: string
  machineType?: string
}

export const allDesigns: Design[] = [
  {
    id: 1,
    name: "Rose Flower Collection",
    price: 4.99,
    originalPrice: 9.99,
    image: "/images/design-1.jpg",
    category: "Floral",
    isNew: true,
    isSale: true,
    description: "Beautiful rose embroidery design perfect for home decor, clothing, and accessories. This elegant floral pattern features intricate petal details and realistic shading.",
    stitchCount: "12,450",
    colors: 8,
    formats: ["DST", "PES", "JEF", "EXP", "HUS", "VP3"],
    size: "4x4 inches",
    machineType: "Small Machines",
  },
  {
    id: 2,
    name: "Butterfly Dreams",
    price: 3.99,
    image: "/images/design-2.jpg",
    category: "Nature",
    isNew: true,
    isSale: false,
    description: "Stunning monarch butterfly design with vibrant wing patterns. Perfect for spring and summer projects, clothing embellishments, and nature-themed crafts.",
    stitchCount: "9,800",
    colors: 6,
    formats: ["DST", "PES", "JEF", "EXP", "HUS"],
    size: "5x5 inches",
    machineType: "Multi Needle",
  },
  {
    id: 3,
    name: "Peacock Elegance",
    price: 5.99,
    image: "/images/design-3.jpg",
    category: "Birds",
    isNew: false,
    isSale: false,
    description: "Majestic peacock feather design featuring iridescent color effects. Ideal for luxury projects, home textiles, and statement pieces.",
    stitchCount: "18,200",
    colors: 12,
    formats: ["DST", "PES", "JEF", "EXP", "HUS", "VP3", "XXX"],
    size: "6x8 inches",
    machineType: "Multi Needle",
  },
  {
    id: 4,
    name: "Mandala Art",
    price: 2.99,
    originalPrice: 6.99,
    image: "/images/design-4.jpg",
    category: "Geometric",
    isNew: false,
    isSale: true,
    description: "Intricate mandala pattern with perfect symmetry and spiritual aesthetics. Great for meditation cushions, wall art, and bohemian style projects.",
    stitchCount: "15,600",
    colors: 5,
    formats: ["DST", "PES", "JEF", "EXP"],
    size: "5x5 inches",
    machineType: "Small Machines",
  },
  {
    id: 5,
    name: "Vintage Border",
    price: 4.49,
    image: "/images/design-5.jpg",
    category: "Borders",
    isNew: true,
    isSale: false,
    description: "Classic vintage floral border design perfect for linens, towels, and decorative edges. Features elegant scrollwork and delicate flower motifs.",
    stitchCount: "8,900",
    colors: 4,
    formats: ["DST", "PES", "JEF", "EXP", "HUS"],
    size: "2x12 inches",
    machineType: "Small Machines",
  },
  {
    id: 6,
    name: "Hummingbird Garden",
    price: 3.49,
    originalPrice: 5.99,
    image: "/images/design-6.jpg",
    category: "Nature",
    isNew: false,
    isSale: true,
    description: "Delightful hummingbird surrounded by tropical flowers. Perfect for garden-themed projects, summer wear, and nature lovers.",
    stitchCount: "11,300",
    colors: 9,
    formats: ["DST", "PES", "JEF", "EXP", "HUS", "VP3"],
    size: "4x6 inches",
    machineType: "Multi Needle",
  },
  {
    id: 7,
    name: "Celtic Knot Pattern",
    price: 3.99,
    image: "/images/design-1.jpg",
    category: "Geometric",
    isNew: false,
    isSale: false,
    description: "Traditional Celtic knot design with endless loop symbolism. Perfect for Irish-themed projects and heritage crafts.",
    stitchCount: "7,500",
    colors: 3,
    formats: ["DST", "PES", "JEF"],
    size: "4x4 inches",
    machineType: "Small Machines",
  },
  {
    id: 8,
    name: "Tropical Leaves Set",
    price: 6.99,
    originalPrice: 12.99,
    image: "/images/design-2.jpg",
    category: "Nature",
    isNew: true,
    isSale: true,
    description: "Set of 5 tropical leaf designs including monstera, palm, and fern patterns. Perfect for modern botanical decor.",
    stitchCount: "22,000",
    colors: 7,
    formats: ["DST", "PES", "JEF", "EXP", "HUS", "VP3"],
    size: "Various",
    machineType: "Multi Needle",
  },
]

export function getDesignById(id: number): Design | undefined {
  return allDesigns.find((design) => design.id === id)
}

export function getDesignsByCategory(category: string): Design[] {
  return allDesigns.filter((design) => design.category.toLowerCase() === category.toLowerCase())
}

export function getTrendingDesigns(): Design[] {
  return allDesigns.slice(0, 6)
}
