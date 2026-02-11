"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

const slides = [
  {
    id: 1,
    title: "Premium Embroidery Designs",
    subtitle: "Latest Collections",
    description: "Discover thousands of high-quality embroidery designs for all machine types",
    image: "/images/hero-embroidery.jpg",
    cta: "Browse Designs",
  },
  {
    id: 2,
    title: "Top Trending Patterns",
    subtitle: "Best Sellers",
    description: "Explore our most popular designs loved by embroidery enthusiasts worldwide",
    image: "/images/design-1.jpg",
    cta: "Shop Now",
  },
  {
    id: 3,
    title: "Free Design Collection",
    subtitle: "Limited Time",
    description: "Download free embroidery designs to get started with your next project",
    image: "/images/design-3.jpg",
    cta: "Get Free Designs",
  },
]

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length)
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)

  return (
    <section className="relative w-full overflow-hidden bg-muted">
      <div className="relative h-[400px] sm:h-[500px] md:h-[600px]">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={slide.image || "/placeholder.svg"}
              alt={slide.title}
              fill
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-foreground/50" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="container mx-auto px-4 text-center">
                <span className="mb-2 inline-block rounded-full bg-primary px-4 py-1 text-sm font-medium text-primary-foreground">
                  {slide.subtitle}
                </span>
                <h1 className="mb-4 text-3xl font-bold text-white sm:text-4xl md:text-5xl lg:text-6xl text-balance">
                  {slide.title}
                </h1>
                <p className="mx-auto mb-6 max-w-2xl text-lg text-white/90 text-pretty">
                  {slide.description}
                </p>
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                  {slide.cta}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-card/80 p-2 text-foreground transition hover:bg-card"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-card/80 p-2 text-foreground transition hover:bg-card"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2.5 w-2.5 rounded-full transition ${
              index === currentSlide ? "bg-primary w-8" : "bg-card/60"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
