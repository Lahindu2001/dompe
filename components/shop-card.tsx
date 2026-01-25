import Link from "next/link";
import Image from "next/image";
import { MapPin, Star, Phone } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { Shop } from "@/lib/types";
import { CATEGORIES } from "@/lib/types";

interface ShopCardProps {
  shop: Shop;
}

export function ShopCard({ shop }: ShopCardProps) {
  const categoryLabel = CATEGORIES.find(c => c.id === shop.categories[0])?.name || shop.categories[0];

  return (
    <Link href={`/shops/${shop.id}`}>
      <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 h-full">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={shop.image || "/placeholder.svg"}
            alt={shop.shop_name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            unoptimized={shop.image?.includes('drive.google.com')}
          />
          <div className="absolute top-3 left-3">
            <Badge variant="secondary" className="bg-card/90 backdrop-blur-sm text-foreground">
              {categoryLabel}
            </Badge>
          </div>
          <div className="absolute top-3 right-3">
            <div className="flex items-center gap-1 bg-card/90 backdrop-blur-sm px-2 py-1 rounded-full">
              <Star className="w-3.5 h-3.5 fill-accent text-accent" />
              <span className="text-sm font-medium text-foreground">{shop.rating}</span>
            </div>
          </div>
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold text-foreground text-lg mb-1 group-hover:text-primary transition-colors line-clamp-1" style={{ fontFamily: 'var(--font-display)' }}>
            {shop.shop_name}
          </h3>
          <div className="flex items-center gap-1.5 text-muted-foreground text-sm mb-3">
            <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="line-clamp-1">{shop.address}</span>
          </div>
          <div className="flex flex-wrap gap-1.5 mb-3">
            {shop.services.slice(0, 3).map((service) => (
              <span
                key={service}
                className="text-xs px-2 py-0.5 bg-secondary text-secondary-foreground rounded-full"
              >
                {service}
              </span>
            ))}
            {shop.services.length > 3 && (
              <span className="text-xs px-2 py-0.5 bg-muted text-muted-foreground rounded-full">
                +{shop.services.length - 3} more
              </span>
            )}
          </div>
          <div className="flex items-center justify-between pt-3 border-t border-border">
            <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
              <Phone className="w-3.5 h-3.5" />
              <span>{shop.phone_number}</span>
            </div>
            <span className="text-xs text-muted-foreground">
              {shop.review_count} reviews
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
