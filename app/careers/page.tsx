export const metadata = {
    title: "Careers | EmbMart",
    description: "Join the EmbMart team",
}

export default function CareersPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <h1 className="text-4xl font-bold mb-6">Careers</h1>

            <p className="mb-6 text-muted-foreground">
                At EmbMart, we believe creativity and technology go hand in hand.
            </p>

            <p className="mb-6">
                We are building a global platform for embroidery professionals and
                creators. Our team values quality, innovation, and continuous learning.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-3">Why Work With Us</h2>
            <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>Creative and collaborative environment</li>
                <li>Remote-friendly opportunities</li>
                <li>Impactful work with global users</li>
                <li>Growth-focused culture</li>
            </ul>

            <p>
                Interested in joining us? Reach out through our Contact page with your
                portfolio or resume.
            </p>
        </div>
    )
}
