import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SearchBar } from "@/components/search-bar";
import { ShopCard } from "@/components/shop-card";
import { CategoryCard } from "@/components/category-card";
import { Button } from "@/components/ui/button";
import { shops } from "@/lib/data";
import { CATEGORIES } from "@/lib/types";
import Link from "next/link";
import { ArrowRight, TrendingUp, Users, Store, Star } from "lucide-react";

export default function HomePage() {
  const featuredShops = shops.slice(0, 6);
  const topRatedShops = [...shops].sort((a, b) => b.rating - a.rating).slice(0, 3);

  // Calculate category counts
  const categoryCounts = CATEGORIES.map(cat => ({
    ...cat,
    count: shops.filter(shop => shop.categories.includes(cat.id)).length,
  }));

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-primary overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <div className="text-center max-w-3xl mx-auto">
              <h1 
                className="text-3xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-4 text-balance"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Discover Local Shops in Dompe
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 text-pretty">
                Your complete guide to all businesses in Dompe town. Find shops, read reviews, and connect with local merchants.
              </p>
              <SearchBar size="large" className="max-w-2xl mx-auto" />
              <div className="flex flex-wrap justify-center gap-3 mt-6">
                <span className="text-sm text-primary-foreground/70">Popular:</span>
                <Link href="/shops?category=grocery" className="text-sm text-primary-foreground/90 hover:text-primary-foreground underline underline-offset-2">
                  Grocery
                </Link>
                <Link href="/shops?category=restaurant" className="text-sm text-primary-foreground/90 hover:text-primary-foreground underline underline-offset-2">
                  Restaurants
                </Link>
                <Link href="/shops?category=pharmacy" className="text-sm text-primary-foreground/90 hover:text-primary-foreground underline underline-offset-2">
                  Pharmacy
                </Link>
                <Link href="/shops?category=electronics" className="text-sm text-primary-foreground/90 hover:text-primary-foreground underline underline-offset-2">
                  Electronics
                </Link>
              </div>
            </div>
          </div>
          {/* Wave decoration */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
              <path d="M0 100V50C240 83 480 100 720 100C960 100 1200 83 1440 50V100H0Z" className="fill-background" />
            </svg>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-8 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-secondary mx-auto mb-3 flex items-center justify-center">
                  <Store className="w-6 h-6 text-primary" />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-foreground">{shops.length}+</div>
                <div className="text-sm text-muted-foreground">Local Shops</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-secondary mx-auto mb-3 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-foreground">{CATEGORIES.length}</div>
                <div className="text-sm text-muted-foreground">Categories</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-secondary mx-auto mb-3 flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-foreground">1,500+</div>
                <div className="text-sm text-muted-foreground">Happy Users</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-secondary mx-auto mb-3 flex items-center justify-center">
                  <Star className="w-6 h-6 text-primary" />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-foreground">2,000+</div>
                <div className="text-sm text-muted-foreground">Reviews</div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground" style={{ fontFamily: 'var(--font-display)' }}>
                  Browse Categories
                </h2>
                <p className="text-muted-foreground mt-1">Find shops by category</p>
              </div>
              <Link href="/categories">
                <Button variant="outline" className="hidden sm:flex items-center gap-2 bg-transparent">
                  View All
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 md:gap-4">
              {categoryCounts.slice(0, 6).map((category) => (
                <CategoryCard
                  key={category.id}
                  id={category.id}
                  name={category.name}
                  icon={category.icon}
                  count={category.count}
                  size="small"
                />
              ))}
            </div>
            <Link href="/categories" className="sm:hidden">
              <Button variant="outline" className="w-full mt-4 bg-transparent">
                View All Categories
              </Button>
            </Link>
          </div>
        </section>

        {/* Featured Shops Section */}
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground" style={{ fontFamily: 'var(--font-display)' }}>
                  Featured Shops
                </h2>
                <p className="text-muted-foreground mt-1">Discover popular businesses in Dompe</p>
              </div>
              <Link href="/shops">
                <Button variant="outline" className="hidden sm:flex items-center gap-2 bg-transparent">
                  View All
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredShops.map((shop) => (
                <ShopCard key={shop.id} shop={shop} />
              ))}
            </div>
            <Link href="/shops" className="sm:hidden">
              <Button variant="outline" className="w-full mt-6 bg-transparent">
                View All Shops
              </Button>
            </Link>
          </div>
        </section>

        {/* Top Rated Section */}
        <section className="py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground" style={{ fontFamily: 'var(--font-display)' }}>
                Top Rated Shops
              </h2>
              <p className="text-muted-foreground mt-1">Highest rated businesses by our community</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {topRatedShops.map((shop, index) => (
                <div key={shop.id} className="relative">
                  {index === 0 && (
                    <div className="absolute -top-3 left-4 z-10 bg-accent text-accent-foreground text-xs font-semibold px-3 py-1 rounded-full">
                      #1 Top Rated
                    </div>
                  )}
                  <ShopCard shop={shop} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 md:py-16 bg-primary">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4" style={{ fontFamily: 'var(--font-display)' }}>
              Own a Shop in Dompe?
            </h2>
            <p className="text-primary-foreground/80 mb-6 max-w-xl mx-auto">
              List your business on Dompee.lk and reach thousands of potential customers in the area. It&apos;s free to get started!
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/register">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  Register Your Shop
                </Button>
              </Link>
              <Link href="/about">
                <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                  Learn More
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
