export const metadata = {
    title: "Privacy Policy | EmbMart",
    description:
        "Learn how EmbMart collects, uses, and protects your personal information.",
}

export default function PrivacyPolicyPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>

            <p className="mb-6 text-muted-foreground">
                At <strong>EmbMart</strong>, your privacy is important to us. This Privacy
                Policy explains how we collect, use, disclose, and protect your personal
                information when you use our website, services, and digital products.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-3">
                Information We Collect
            </h2>
            <p className="mb-4">
                We may collect the following types of information:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>
                    <strong>Personal Information</strong> – Name, email address, phone
                    number, and account details
                </li>
                <li>
                    <strong>Payment Information</strong> – Processed securely through
                    third-party payment gateways (we do not store card details)
                </li>
                <li>
                    <strong>Usage Data</strong> – Pages visited, downloads, and interaction
                    with our services
                </li>
                <li>
                    <strong>Device Information</strong> – Browser type, IP address, and
                    operating system
                </li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-3">
                How We Use Your Information
            </h2>
            <p className="mb-4">
                The information we collect may be used to:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>Provide and manage access to our services</li>
                <li>Process payments and deliver digital products</li>
                <li>Improve website functionality and user experience</li>
                <li>Send important updates, notifications, and support messages</li>
                <li>Prevent fraud and ensure platform security</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-3">
                Cookies & Tracking Technologies
            </h2>
            <p className="mb-6">
                EmbMart uses cookies and similar technologies to enhance your browsing
                experience. Cookies help us understand user behavior, remember
                preferences, and improve our services. You can manage cookie settings
                through your browser at any time.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-3">
                Sharing of Information
            </h2>
            <p className="mb-6">
                We do not sell or rent your personal information. Your data may be
                shared only with trusted third-party service providers who assist us in
                operating our website, processing payments, and delivering services,
                subject to strict confidentiality agreements.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-3">
                Data Security
            </h2>
            <p className="mb-6">
                We implement appropriate technical and organizational security measures
                to protect your personal data from unauthorized access, alteration, or
                disclosure. However, no method of transmission over the internet is
                completely secure.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-3">
                User Rights
            </h2>
            <p className="mb-4">
                As a user, you have the right to:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>Access and update your personal information</li>
                <li>Request deletion of your account and data</li>
                <li>Opt out of non-essential communications</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-3">
                Third-Party Links
            </h2>
            <p className="mb-6">
                Our website may contain links to third-party websites. EmbMart is not
                responsible for the privacy practices or content of those websites.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-3">
                Changes to This Policy
            </h2>
            <p className="mb-6">
                We may update this Privacy Policy from time to time. Any changes will be
                posted on this page, and continued use of the website constitutes
                acceptance of the updated policy.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-3">
                Contact Us
            </h2>
            <p className="mb-6">
                If you have any questions or concerns regarding this Privacy Policy or
                how your data is handled, please contact our support team.
            </p>

            <blockquote className="border-l-4 pl-4 italic text-muted-foreground">
                Your trust matters to us. We are committed to protecting your privacy.
            </blockquote>
        </div>
    )
}
