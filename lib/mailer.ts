// import nodemailer from "nodemailer"

// export async function sendInvoiceMail({
//   to,
//   customer,
//   invoiceNo,
//   pdf,
// }: {
//   to: string
//   customer: string
//   invoiceNo: string
//   pdf: Buffer
// }) {
//   console.log("📤 Sending mail to:", to)

//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: process.env.MAIL_USER,
//       pass: process.env.MAIL_PASS,
//     },
//   })

//   // 🔥 VERIFY SMTP (THIS CATCHES 90% ISSUES)
//   await transporter.verify()
//   console.log("✅ SMTP VERIFIED")

//   await transporter.sendMail({
//     from: `"EmbMart" <${process.env.MAIL_USER}>`,
//     to,
//     subject: `Invoice ${invoiceNo}`,
//     text: `Hello ${customer}, your invoice is attached.`,
//     attachments: [
//       {
//         filename: `invoice-${invoiceNo}.pdf`,
//         content: pdf,
//       },
//     ],
//   })
// }
