"use client"

import React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { 
  ChevronRight, 
  Mail, 
  Phone, 
  MapPin, 
  Clock,
  Send,
  Loader2,
  Check
} from "lucide-react"

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
    setFormData({ name: "", email: "", subject: "", message: "" })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">Contact Us</span>
        </nav>
      </div>

      {/* Page Header */}
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Get in Touch</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Have questions about our embroidery designs or need help with your order? 
          We are here to assist you. Reach out to us using the form below or through our contact details.
        </p>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-card rounded-xl p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Email Us</h3>
                  <p className="text-muted-foreground text-sm mb-2">We reply within 24 hours</p>
                  <a href="mailto:support@embMart.com" className="text-primary hover:underline">
                    support@embMart.com
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-xl p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Call Us</h3>
                  <p className="text-muted-foreground text-sm mb-2">Mon-Fri from 9am to 6pm</p>
                  <a href="tel:+1234567890" className="text-primary hover:underline">
                    +91 96649 17815
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-xl p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Visit Us</h3>
                  <p className="text-muted-foreground text-sm">
                    C2-1215 IT PARK<br />
                    Mota Varachha, Surat<br />
                    Gujarat, India.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-xl p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Business Hours</h3>
                  <p className="text-muted-foreground text-sm">
                    Monday - Friday: 9:00 AM - 6:00 PM<br />
                    Saturday: 10:00 AM - 4:00 PM<br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-card rounded-xl p-6 md:p-8 shadow-sm">
              <h2 className="text-2xl font-semibold text-foreground mb-6">Send us a Message</h2>
              
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <Check className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Message Sent!</h3>
                  <p className="text-muted-foreground mb-6">
                    Thank you for contacting us. We will get back to you within 24 hours.
                  </p>
                  <Button onClick={() => setIsSubmitted(false)} variant="outline" className="bg-transparent">
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="text-foreground">Your Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter Name..."
                        className="mt-1 bg-background"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-foreground">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter Email..."
                        className="mt-1 bg-background"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="subject" className="text-foreground">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="How can we help?"
                      className="mt-1 bg-background"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="message" className="text-foreground">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us more about your inquiry..."
                      className="mt-1 bg-background min-h-[150px]"
                      required
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full sm:w-auto bg-primary text-primary-foreground"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Frequently Asked Questions</h2>
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="bg-card rounded-xl p-6 shadow-sm">
            <h3 className="font-semibold text-foreground mb-2">What formats do your designs come in?</h3>
            <p className="text-muted-foreground text-sm">
              Our designs are available in multiple formats including DST, PES, JEF, EXP, HUS, VP3, and more to ensure compatibility with all major embroidery machines.
            </p>
          </div>
          <div className="bg-card rounded-xl p-6 shadow-sm">
            <h3 className="font-semibold text-foreground mb-2">How do I download my purchased designs?</h3>
            <p className="text-muted-foreground text-sm">
              After completing your purchase, you will receive an email with download links. You can also access your downloads from your account dashboard.
            </p>
          </div>
          <div className="bg-card rounded-xl p-6 shadow-sm">
            <h3 className="font-semibold text-foreground mb-2">Can I get a refund?</h3>
            <p className="text-muted-foreground text-sm">
              Due to the digital nature of our products, we generally do not offer refunds. However, if you have issues with a design, please contact our support team.
            </p>
          </div>
          <div className="bg-card rounded-xl p-6 shadow-sm">
            <h3 className="font-semibold text-foreground mb-2">Do you offer custom designs?</h3>
            <p className="text-muted-foreground text-sm">
              Yes! We offer custom embroidery design services. Contact us with your requirements and we will provide a quote.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
