export const metadata = {
    title: "Tutorials | EmbMart",
    description:
        "Step-by-step embroidery tutorials to help you get started and improve your skills.",
}

export default function TutorialsPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <h1 className="text-4xl font-bold mb-6">Tutorials</h1>

            <p className="mb-6 text-muted-foreground">
                Our tutorials are designed to help embroidery beginners and
                professionals get the most out of EmbMart designs and embroidery
                machines.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-3">
                Getting Started
            </h2>
            <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>How to create and verify your EmbMart account</li>
                <li>How to browse and search for embroidery designs</li>
                <li>Understanding embroidery file formats</li>
                <li>Downloading and managing your designs</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-3">
                Machine Setup & Usage
            </h2>
            <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>Preparing your embroidery machine for first use</li>
                <li>Hooping fabric correctly for clean stitch results</li>
                <li>Thread and needle selection tips</li>
                <li>Loading embroidery files into your machine</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-3">
                Design & Stitching Tips
            </h2>
            <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>Test stitching before final production</li>
                <li>Stabilizer selection for different fabrics</li>
                <li>Managing stitch density and thread tension</li>
                <li>Reducing thread breaks and machine errors</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-3">
                Troubleshooting
            </h2>
            <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>Common embroidery errors and how to fix them</li>
                <li>What to do if a design does not stitch properly</li>
                <li>Machine compatibility issues</li>
                <li>Improving stitch quality on difficult fabrics</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-3">
                Advanced Learning
            </h2>
            <p className="mb-6">
                We regularly update our tutorials with advanced embroidery techniques,
                production optimization tips, and best practices for professional
                embroidery businesses.
            </p>

            <blockquote className="border-l-4 pl-4 italic text-muted-foreground mb-8">
                Learn the process. Master the stitch. Create with confidence.
            </blockquote>

            <p>
                Need help with a specific issue? Visit our FAQ page or contact our
                support team for personalized assistance.
            </p>
        </div>
    )
}
