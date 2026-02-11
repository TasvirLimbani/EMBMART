"use client"

import { useState } from "react"
import { ChevronRight } from "lucide-react"

const faqs = [
  {
    question: "How to Create New Account?",
    answer:
      "Click on the Sign Up button, enter your name, email address, and password. Verify your email to activate your account.",
  },
  {
    question: "How to log in on embcart.com?",
    answer:
      "Click Login, enter your registered email and password, and submit. Use Forgot Password if needed.",
  },
  {
    question: "How to Update Profile?",
    answer:
      "After login, go to My Account > Profile to update personal details, password, and preferences.",
  },
  {
    question: "How to reset my password?",
    answer:
      "Click Forgot Password on the login page. Enter your registered email and follow the instructions sent to you.",
  },
  {
    question: "How to Purchase a Single Design?",
    answer:
      "Open the design page, click Buy Now, complete payment, and download the file from My Orders.",
  },
  {
    question: "How to Purchase Subscription Plan?",
    answer:
      "Visit the Subscription page, select a plan that suits you, and complete payment securely.",
  },
  {
    question: "How to Download Designs after Purchasing Plan?",
    answer:
      "With an active subscription, open any eligible design and click Download. Limits depend on your plan.",
  },
  {
    question: "What embroidery file formats are available?",
    answer:
      "We provide formats such as DST, PES, JEF, EXP, VP3, XXX, and more depending on the design.",
  },
  {
    question: "How to unzip downloaded design files?",
    answer:
      "Right-click the ZIP file and select Extract (Windows) or double-click the file on Mac.",
  },
  {
    question: "Can I use designs for commercial purposes?",
    answer:
      "Yes, designs can be used for commercial production. Reselling or sharing digital files is not allowed.",
  },
  {
    question: "Is there a download limit?",
    answer:
      "Download limits depend on your subscription plan. Single purchases can be re-downloaded anytime.",
  },
  {
    question: "What payment methods are accepted?",
    answer:
      "We accept UPI, credit cards, debit cards, net banking, and other secure payment methods.",
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer:
      "Yes, you can cancel your subscription from My Account. Access remains active until the billing period ends.",
  },
  {
    question: "Do you offer refunds?",
    answer:
      "Due to the digital nature of embroidery files, refunds are not available once a download is completed.",
  },
  {
    question: "What if a design does not work on my machine?",
    answer:
      "Please contact our support team with your machine details and we will assist you promptly.",
  },
  {
    question: "How can I contact customer support?",
    answer:
      "You can contact us via WhatsApp at +91 89800 53500 or email support@embcart.com.",
  },
]


export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <h1 className="text-4xl font-bold mb-6">FAQs</h1>

      <p className="mb-8 text-muted-foreground">
        Need help? Contact us on WhatsApp{" "}
        <strong>+91 89800 53500</strong> or email{" "}
        <strong>support@embcart.com</strong>.
      </p>

      <div className="space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index

          return (
            <div key={index} className="border rounded-lg">
              <button
                onClick={() =>
                  setOpenIndex(isOpen ? null : index)
                }
                className="w-full flex items-center gap-4 px-4 py-4 text-left"
              >
                <ChevronRight
                  className={`transition-transform ${isOpen ? "rotate-90" : ""
                    }`}
                />
                <span className="font-medium">
                  {faq.question}
                </span>
              </button>

              {isOpen && (
                <div className="px-12 pb-4 text-muted-foreground">
                  {faq.answer}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
