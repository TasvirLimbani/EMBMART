export const metadata = {
  title: "Our Story | EmbMart",
  description: "The journey behind EmbMart",
}

export default function OurStoryPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-6">Our Story</h1>

      <p className="mb-6 text-muted-foreground">
        Every great platform starts with a problem — and EmbMart was no
        different.
      </p>

      <p className="mb-6">
        We saw embroidery creators struggling with poor-quality design files,
        inconsistent stitch results, and wasted production time. Many spent
        hours fixing files instead of creating products.
      </p>

      <p className="mb-6">
        EmbMart was founded to change that. Our goal was simple: provide
        embroidery designs that work perfectly the first time.
      </p>

      <p className="mb-6">
        Today, EmbMart supports creators, embroidery shops, and brands across
        the world — helping them stitch with confidence and scale their
        businesses.
      </p>

      <blockquote className="border-l-4 pl-4 italic text-muted-foreground">
        Built by creators. Trusted by professionals.
      </blockquote>
    </div>
  )
}
