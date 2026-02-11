export const metadata = {
  title: "Gift Cards | EmbMart",
  description:
    "Give the perfect gift to creators with EmbMart Gift Cards for premium embroidery designs.",
}

export default function GiftCardsPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-6">Gift Cards</h1>

      <p className="mb-6 text-muted-foreground">
        Looking for the perfect gift for an embroidery enthusiast or creative
        business? EmbMart Gift Cards make it easy to give creativity without
        limits.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">
        What Are EmbMart Gift Cards?
      </h2>
      <p className="mb-6">
        EmbMart Gift Cards allow recipients to purchase premium embroidery
        designs, digital assets, and subscription plans directly from our
        marketplace. They’re digital, flexible, and easy to use.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">Why Choose a Gift Card</h2>
      <ul className="list-disc pl-6 space-y-2 mb-6">
        <li>✔ Perfect for creators, designers, and embroidery businesses</li>
        <li>✔ No expiration date</li>
        <li>✔ Instant digital delivery</li>
        <li>✔ Can be used on any eligible EmbMart product</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-3">How It Works</h2>
      <ol className="list-decimal pl-6 space-y-2 mb-6">
        <li>Select a gift card value</li>
        <li>Complete the purchase securely</li>
        <li>Receive the gift card code via email</li>
        <li>Redeem during checkout on EmbMart</li>
      </ol>

      <h2 className="text-2xl font-semibold mt-8 mb-3">Who Can Use It?</h2>
      <p className="mb-6">
        EmbMart Gift Cards are ideal for hobbyists, professional embroidery
        shops, fashion brands, startups, and anyone passionate about quality
        embroidery design.
      </p>

      <blockquote className="border-l-4 pl-4 italic text-muted-foreground mb-8">
        A thoughtful gift for creators who stitch ideas into reality.
      </blockquote>

      <h3 className="text-xl font-semibold mb-2">Need help?</h3>
      <p>
        If you have questions about purchasing or redeeming gift cards, our
        support team is always ready to assist you.
      </p>
    </div>
  )
}
