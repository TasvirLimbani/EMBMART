export const metadata = {
  title: "About Us | EmbMart",
  description: "Learn more about EmbMart",
}

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-6">About Us</h1>

      <p className="mb-6 text-muted-foreground">
        Welcome to <strong>EmbMart</strong> — your trusted marketplace for
        premium embroidery designs, apparel assets, and creative resources
        crafted for makers, brands, and businesses.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">Who We Are</h2>
      <p className="mb-4">
        EmbMart was built with one clear goal:{" "}
        <strong>
          to make high-quality embroidery designs accessible, affordable, and
          easy to use
        </strong>.
      </p>
      <p className="mb-6">
        Our platform brings together professionally curated designs,
        transparent pricing, and a smooth digital experience so you can focus
        on what matters most — creating.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">What We Offer</h2>
      <ul className="list-disc pl-6 space-y-2 mb-6">
        <li><strong>Premium Embroidery Designs</strong> – Production-ready files</li>
        <li><strong>Flexible Plans</strong> – Simple subscription options</li>
        <li><strong>Instant Access</strong> – Download anytime</li>
        <li><strong>Commercial-Ready Assets</strong> – Client & resale use</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-3">Why Choose EmbMart</h2>
      <ul className="space-y-2 mb-6">
        <li>✔ Carefully tested designs</li>
        <li>✔ Clear pricing</li>
        <li>✔ Fast & secure downloads</li>
        <li>✔ Dedicated support</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-3">Our Mission</h2>
      <p className="mb-6">
        To empower creators worldwide by providing reliable embroidery
        resources that save time and improve quality.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">Our Vision</h2>
      <p className="mb-6">
        To become a global hub for embroidery and apparel design.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">Built for Creators</h2>
      <p className="mb-6">
        Whether you’re a startup or a large production unit, EmbMart scales
        with you.
      </p>

      <blockquote className="border-l-4 pl-4 italic text-muted-foreground mb-8">
        Create more. Worry less. Stitch better.
      </blockquote>

      <h3 className="text-xl font-semibold mb-2">Have questions?</h3>
      <p>
        Reach out through our support page and our team will help you quickly.
      </p>
    </div>
  )
}
