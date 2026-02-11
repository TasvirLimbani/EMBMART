export const metadata = {
  title: "Machine Formats | EmbMart",
  description:
    "Learn about embroidery machine file formats supported by EmbMart.",
}

export default function MachineFormatsPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-6">Embroidery Machine Formats</h1>

      <p className="mb-6 text-muted-foreground">
        EmbMart provides embroidery design files in multiple machine formats to
        ensure compatibility with a wide range of embroidery machines used by
        professionals and hobbyists.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">
        Supported File Formats
      </h2>

      <p className="mb-4">
        Each design available on EmbMart includes one or more of the following
        embroidery file formats:
      </p>

      <ul className="list-disc pl-6 space-y-2 mb-6">
        <li>
          <strong>DST</strong> – Tajima machines and many commercial embroidery
          systems
        </li>
        <li>
          <strong>PES</strong> – Brother, Babylock, and Bernina (via software)
        </li>
        <li>
          <strong>JEF</strong> – Janome embroidery machines
        </li>
        <li>
          <strong>EXP</strong> – Melco and Bernina embroidery systems
        </li>
        <li>
          <strong>VP3</strong> – Husqvarna Viking and Pfaff machines
        </li>
        <li>
          <strong>XXX</strong> – Singer embroidery machines
        </li>
        <li>
          <strong>HUS</strong> – Older Husqvarna models
        </li>
        <li>
          <strong>ART</strong> – Bernina embroidery machines
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-3">
        File Delivery & Structure
      </h2>
      <p className="mb-6">
        All embroidery designs are delivered as compressed ZIP files. Each ZIP
        contains the available machine formats along with color charts and
        design information when applicable.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">
        Machine Compatibility
      </h2>
      <p className="mb-6">
        While we strive to provide maximum compatibility, embroidery machines
        may vary in how they read stitch data. We recommend testing designs on
        scrap fabric before full production.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">
        Need a Specific Format?
      </h2>
      <p className="mb-6">
        If you need a format not listed above, contact our support team. We may
        be able to provide alternative formats or guidance based on your
        machine.
      </p>

      <blockquote className="border-l-4 pl-4 italic text-muted-foreground">
        Designed for precision. Tested for compatibility.
      </blockquote>
    </div>
  )
}
