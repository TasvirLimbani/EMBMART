import PDFDocument from "pdfkit"

export async function generateInvoice(order: any): Promise<Buffer> {
  return new Promise((resolve) => {
    const doc = new PDFDocument({ size: "A4", margin: 50 })
    const buffers: Buffer[] = []

    doc.on("data", buffers.push.bind(buffers))
    doc.on("end", () => {
      resolve(Buffer.concat(buffers))
    })

    doc.fontSize(18).text("INVOICE", { align: "center" })
    doc.moveDown()

    doc.fontSize(12).text(`Order ID: ${order.id}`)
    doc.text(`Product: ${order.product_name}`)
    doc.text(`Category: ${order.product_category}`)
    doc.text(`Quantity: ${order.quantity}`)
    doc.text(`Order Date: ${order.order_date}`)

    doc.moveDown()
    doc.text("Thank you for your order!", { align: "center" })

    doc.end()
  })
}
