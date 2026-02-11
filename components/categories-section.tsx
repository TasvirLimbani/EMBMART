import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

const categories = [
  {
    name: "Small Machines",
    description: "Perfect for home embroidery machines",
    image: "/images/category-small-machines.jpg",
    href: "/designs/small-machines",
    count: "2,500+ designs",
  },
  {
    name: "Multi Needle",
    description: "Professional multi-head machine designs",
    image: "/images/category-multi-needle.jpg",
    href: "/designs/multi-needle",
    count: "3,200+ designs",
  },
  {
    name: "Cording",
    description: "Raised texture cording patterns",
    image: "/images/category-cording.jpg",
    href: "/designs/cording",
    count: "1,800+ designs",
  },
  {
    name: "Sequins",
    description: "Sparkling sequin embroidery designs",
    image: "/images/category-sequins.jpg",
    href: "/designs/sequins",
    count: "1,500+ designs",
  },
  {
    name: "Chain Stitch",
    description: "Traditional chain stitch patterns",
    image: "/images/category-chain-stitch.jpg",
    href: "/designs/chain-stitch",
    count: "2,100+ designs",
  },
]

export function CategoriesSection() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl text-balance">
            Explore Design Categories
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground text-pretty">
            Browse our extensive collection of embroidery designs organized by machine type and technique
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className="group relative overflow-hidden rounded-xl bg-card shadow-sm transition hover:shadow-lg"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <Image
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  width={400}
                  height={300}
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="mb-1 font-semibold text-foreground group-hover:text-primary transition">
                  {category.name}
                </h3>
                <p className="mb-2 text-sm text-muted-foreground">{category.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-primary">{category.count}</span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-primary" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
