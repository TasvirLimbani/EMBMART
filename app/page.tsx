import { HeroSection } from "@/components/hero-section"
import { CategoriesSection } from "@/components/categories-section"
import { TrendingSection } from "@/components/trending-section"
import { FeaturesSection } from "@/components/features-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { BrandsSection } from "@/components/brands-section"

export default function HomePage() {
  return (
    <main className="flex-1">
      <HeroSection />
      <CategoriesSection />
      <TrendingSection />
      <FeaturesSection />
      <TestimonialsSection />
      <BrandsSection />
    </main>
  )
}
