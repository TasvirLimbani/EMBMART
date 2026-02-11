const brands = [
  // { name: "Deshun", img: "/brands/deshun.png" },
  { name: "Barudan", img: "/brands/barudan.jpg" },
  { name: "Brother", img: "/brands/brother.png" },
  { name: "Janome", img: "/brands/janome.png" },
  { name: "Singer", img: "/brands/Ricoma.jpg" },
  { name: "Bernina", img: "/brands/singer.png" },
  { name: "Husqvarna", img: "/brands/usha.png" },
  { name: "Benina", img: "/brands/benina.png" },
  { name: "Tejima", img: "/brands/tajima.jpg" },
  { name: "HSW", img: "/brands/HSW.jpg" },

]

export function BrandsSection() {
  return (
    <section className="py-12 md:py-16 bg-background border-y border-border">
      <div className="container mx-auto px-4">
        <div className="mb-8 md:mb-12 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-muted-foreground">
            Compatible With All Major Machine{" "}
            <span className="text-red-600">Brands</span>
          </h2>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {brands.map((brand) => (
            <div
              key={brand.name}
              className="flex items-center justify-center px-4 py-2"
            >
              <img
                src={brand.img}
                alt={brand.name}
                className="h-10 md:h-25 object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}