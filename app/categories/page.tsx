import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CategoryCard } from "@/components/category-card";
import { shops } from "@/lib/data";
import { CATEGORIES } from "@/lib/types";

export default function CategoriesPage() {
  const categoryCounts = CATEGORIES.map(cat => ({
    ...cat,
    count: shops.filter(shop => shop.categories.includes(cat.id)).length,
  }));

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-primary py-10 md:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 
              className="text-2xl md:text-4xl font-bold text-primary-foreground mb-2"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Shop Categories
            </h1>
            <p className="text-primary-foreground/80">
              Browse shops by category to find exactly what you need
            </p>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
              {categoryCounts.map((category) => (
                <CategoryCard
                  key={category.id}
                  id={category.id}
                  name={category.name}
                  icon={category.icon}
                  count={category.count}
                />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
