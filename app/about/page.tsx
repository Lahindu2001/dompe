import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MapPin, Users, Store, Heart, Target, Eye } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-primary py-12 md:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 
              className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              About Dompee.lk
            </h1>
            <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
              Connecting the community of Dompe with local businesses since 2024
            </p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-card border border-border rounded-2xl p-8">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <Target className="w-7 h-7 text-primary" />
                </div>
                <h2 className="text-xl font-bold text-foreground mb-4" style={{ fontFamily: 'var(--font-display)' }}>
                  Our Mission
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  To create a comprehensive digital platform that connects the people of Dompe with local businesses, 
                  making it easier for residents to discover, explore, and support the shops that make our community unique.
                </p>
              </div>

              <div className="bg-card border border-border rounded-2xl p-8">
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
                  <Eye className="w-7 h-7 text-accent" />
                </div>
                <h2 className="text-xl font-bold text-foreground mb-4" style={{ fontFamily: 'var(--font-display)' }}>
                  Our Vision
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  To become the most trusted and comprehensive business directory for Dompe and surrounding areas, 
                  fostering economic growth and strengthening community bonds through digital connectivity.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4" style={{ fontFamily: 'var(--font-display)' }}>
                Our Story
              </h2>
            </div>
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p className="mb-4">
                Dompee.lk was born from a simple observation: while Dompe has a vibrant local economy with numerous 
                shops and businesses, finding information about them was often difficult. Phone numbers were scattered, 
                locations were hard to find, and there was no central place to learn about the services each shop offered.
              </p>
              <p className="mb-4">
                We set out to change that. Our platform brings together all the businesses in Dompe town into one 
                easy-to-use directory. Whether you&apos;re looking for a pharmacy, a restaurant, or a hardware store, 
                Dompee.lk helps you find exactly what you need.
              </p>
              <p>
                Today, we&apos;re proud to serve the Dompe community by connecting residents with local businesses and 
                helping shop owners reach more customers than ever before.
              </p>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4" style={{ fontFamily: 'var(--font-display)' }}>
                What We Stand For
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-14 h-14 rounded-full bg-secondary mx-auto mb-4 flex items-center justify-center">
                  <MapPin className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Local First</h3>
                <p className="text-sm text-muted-foreground">
                  We prioritize and promote local businesses that serve our community
                </p>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 rounded-full bg-secondary mx-auto mb-4 flex items-center justify-center">
                  <Users className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Community</h3>
                <p className="text-sm text-muted-foreground">
                  Building stronger connections between residents and merchants
                </p>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 rounded-full bg-secondary mx-auto mb-4 flex items-center justify-center">
                  <Store className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Accessibility</h3>
                <p className="text-sm text-muted-foreground">
                  Making business information easy to find and access for everyone
                </p>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 rounded-full bg-secondary mx-auto mb-4 flex items-center justify-center">
                  <Heart className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Trust</h3>
                <p className="text-sm text-muted-foreground">
                  Providing accurate, verified information you can rely on
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 md:py-16 bg-primary">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4" style={{ fontFamily: 'var(--font-display)' }}>
              Join Our Growing Community
            </h2>
            <p className="text-primary-foreground/80 mb-6 max-w-xl mx-auto">
              Whether you&apos;re a shop owner looking to reach more customers or a resident searching for local services, 
              Dompee.lk is here for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/register">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  Register Your Shop
                </Button>
              </Link>
              <Link href="/shops">
                <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                  Explore Shops
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
