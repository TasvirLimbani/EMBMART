export const metadata = {
  title: "Cookie Policy | EmbMart",
  description:
    "Learn how EmbMart uses cookies and similar technologies to improve your experience.",
}

export default function CookiePolicyPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-6">Cookie Policy</h1>

      <p className="mb-6 text-muted-foreground">
        This Cookie Policy explains how <strong>EmbMart</strong> uses cookies
        and similar technologies when you visit our website.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">What Are Cookies?</h2>
      <p className="mb-6">
        Cookies are small text files stored on your device when you visit a
        website. They help websites remember user preferences, improve
        performance, and deliver a better browsing experience.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">
        How We Use Cookies
      </h2>
      <p className="mb-4">
        EmbMart uses cookies for the following purposes:
      </p>

      <ul className="list-disc pl-6 space-y-2 mb-6">
        <li>
          <strong>Essential Cookies</strong> – Required for core site
          functionality such as login, security, and checkout
        </li>
        <li>
          <strong>Performance Cookies</strong> – Help us understand how visitors
          interact with our website
        </li>
        <li>
          <strong>Functional Cookies</strong> – Remember your preferences and
          settings
        </li>
        <li>
          <strong>Analytics Cookies</strong> – Allow us to improve our services
          and user experience
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-3">
        Third-Party Cookies
      </h2>
      <p className="mb-6">
        We may allow trusted third-party services to place cookies on your
        device for analytics, performance monitoring, or marketing purposes.
        These cookies are governed by the respective third-party privacy
        policies.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">
        Managing Your Cookies
      </h2>
      <p className="mb-6">
        You can control or disable cookies through your browser settings at any
        time. Please note that disabling certain cookies may affect the
        functionality and performance of the EmbMart website.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">
        Changes to This Policy
      </h2>
      <p className="mb-6">
        EmbMart may update this Cookie Policy from time to time to reflect
        changes in technology, law, or our business practices. Any updates will
        be posted on this page.
      </p>

      <blockquote className="border-l-4 pl-4 italic text-muted-foreground mb-8">
        Your privacy matters to us, and we are committed to transparency.
      </blockquote>

      <p>
        If you have any questions about our use of cookies, please contact our
        support team for further assistance.
      </p>
    </div>
  )
}
