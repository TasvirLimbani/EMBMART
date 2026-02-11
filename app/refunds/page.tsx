export const metadata = {
    title: "Refund Policy | EmbMart",
    description:
        "Learn about EmbMart’s refund policy for embroidery designs, subscriptions, and digital products.",
}

export default function RefundPolicyPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <h1 className="text-4xl font-bold mb-6">Refund Policy</h1>

            <p className="mb-6 text-muted-foreground">
                At EmbMart, we strive to provide high-quality embroidery designs and
                digital products. Please read our refund policy carefully before making
                a purchase.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-3">
                Digital Products & Downloads
            </h2>
            <p className="mb-6">
                Due to the nature of digital products, all sales of embroidery design
                files and downloadable content are considered final once the file has
                been accessed or downloaded.
            </p>

            <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>Refunds are not available for downloaded files</li>
                <li>We do not offer exchanges for digital designs</li>
                <li>Please review product details carefully before purchasing</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-3">
                Subscription Plans
            </h2>
            <p className="mb-6">
                Subscription fees are billed in advance and are non-refundable. Once a
                subscription period has started, refunds or partial refunds are not
                provided for unused time.
            </p>

            <p className="mb-6">
                You may cancel your subscription at any time. After cancellation, you
                will continue to have access until the end of the current billing
                period.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-3">
                Exceptional Circumstances
            </h2>
            <p className="mb-6">
                Refunds may be considered only in rare situations, such as:
            </p>

            <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>Duplicate charges due to a technical error</li>
                <li>Payment processed incorrectly</li>
                <li>Purchased product is completely inaccessible due to system issues</li>
            </ul>

            <p className="mb-6">
                In such cases, our support team may investigate and issue a refund at
                EmbMart’s sole discretion.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-3">
                How to Request a Refund
            </h2>
            <ol className="list-decimal pl-6 space-y-2 mb-6">
                <li>Contact our support team within 7 days of purchase</li>
                <li>Provide your order ID and registered email address</li>
                <li>Clearly explain the issue you encountered</li>
            </ol>

            <p className="mb-6">
                Our team will review your request and respond within 3–5 business days.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-3">
                Policy Updates
            </h2>
            <p className="mb-6">
                EmbMart reserves the right to modify or update this refund policy at any
                time. Changes will be effective immediately upon posting on this page.
            </p>

            <blockquote className="border-l-4 pl-4 italic text-muted-foreground mb-8">
                We believe in transparency, fairness, and supporting creators at every
                step.
            </blockquote>

            <p>
                If you have any questions regarding this refund policy, please contact
                our support team for assistance.
            </p>
        </div>
    )
}
