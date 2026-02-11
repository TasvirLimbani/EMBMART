"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Professional Embroiderer",
    content: "The quality of designs on EmbMart is exceptional. I've been using them for my business for over 2 years and my customers love the results. The instant download feature saves me so much time!",
    rating: 5,
    initials: "SJ",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Hobbyist",
    content: "As a beginner, I was worried about finding designs that work well on my small home machine. EmbMart has an amazing selection that stitches out perfectly every time. Highly recommend!",
    rating: 5,
    initials: "MC",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Small Business Owner",
    content: "The subscription plan is incredible value. I get access to thousands of designs at a fraction of what I'd pay elsewhere. Customer support is also top-notch and very responsive.",
    rating: 5,
    initials: "ER",
  },
  {
    id: 4,
    name: "David Thompson",
    role: "Textile Designer",
    content: "The variety of machine formats available is what sets EmbMart apart. Whether I'm working with Tajima or Brother machines, I always find compatible designs. Excellent marketplace!",
    rating: 5,
    initials: "DT",
  },
]

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  const nextTestimonial = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  const prevTestimonial = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)

  return (
    <section className="py-16 md:py-24 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl text-balance">
            What Our Customers Say
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground text-pretty">
            Join thousands of satisfied embroidery enthusiasts who trust EmbMart for their design needs
          </p>
        </div>

        <div className="relative mx-auto max-w-4xl">
          <div className="overflow-hidden rounded-2xl bg-card p-8 md:p-12 shadow-sm">
            <Quote className="mb-6 h-10 w-10 text-primary/30" />
            
            <div className="relative min-h-[200px]">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className={`transition-all duration-500 ${
                    index === currentIndex
                      ? "opacity-100"
                      : "opacity-0 absolute inset-0"
                  }`}
                >
                  <p className="mb-6 text-lg text-foreground md:text-xl leading-relaxed text-pretty">
                    "{testimonial.content}"
                  </p>
                  
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12 bg-primary text-primary-foreground">
                      <AvatarFallback className="bg-primary text-primary-foreground">{testimonial.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                    <div className="ml-auto flex gap-0.5">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              onClick={prevTestimonial}
              className="rounded-full border border-border bg-card p-2 text-foreground transition hover:border-primary hover:text-primary"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2.5 w-2.5 rounded-full transition ${
                    index === currentIndex ? "bg-primary w-8" : "bg-border"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            <button
              onClick={nextTestimonial}
              className="rounded-full border border-border bg-card p-2 text-foreground transition hover:border-primary hover:text-primary"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
