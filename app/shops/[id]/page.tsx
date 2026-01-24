"use client";

import React from "react"

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { StarRating } from "@/components/star-rating";
import { ReviewCard } from "@/components/review-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { getShopById, getReviewsByShopId, reviews as allReviews } from "@/lib/data";
import { CATEGORIES, type Review } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import { use, useState } from "react";
import {
  MapPin,
  Phone,
  MessageCircle,
  ExternalLink,
  Youtube,
  ArrowLeft,
  Clock,
  CheckCircle,
  Star,
} from "lucide-react";

export default function ShopDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const shop = getShopById(id);
  const shopReviews = getReviewsByShopId(id);

  const [userRating, setUserRating] = useState(0);
  const [reviewComment, setReviewComment] = useState("");
  const [localReviews, setLocalReviews] = useState<Review[]>(shopReviews);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  if (!shop) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-2">Shop Not Found</h1>
            <p className="text-muted-foreground mb-4">The shop you&apos;re looking for doesn&apos;t exist.</p>
            <Link href="/shops">
              <Button>Browse All Shops</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const categoryLabel = CATEGORIES.find(c => c.id === shop.categories[0])?.name || shop.categories[0];

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (userRating === 0 || !reviewComment.trim()) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    const newReview: Review = {
      id: `new-${Date.now()}`,
      shop_id: id,
      user_id: 'guest',
      user_name: 'Guest User',
      rating: userRating,
      comment: reviewComment.trim(),
      created_at: new Date().toISOString().split('T')[0],
    };

    setLocalReviews([newReview, ...localReviews]);
    setUserRating(0);
    setReviewComment("");
    setIsSubmitting(false);
    setShowSuccess(true);

    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="bg-muted/30 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Link href="/shops" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to Shops
            </Link>
          </div>
        </div>

        {/* Shop Header */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Image */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-muted">
                <Image
                  src={shop.image || "/placeholder.svg"}
                  alt={shop.shop_name}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary" className="bg-card/90 backdrop-blur-sm">
                    {categoryLabel}
                  </Badge>
                </div>
              </div>

              {/* Info */}
              <div>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <h1 
                      className="text-2xl md:text-3xl font-bold text-foreground mb-2"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {shop.shop_name}
                    </h1>
                    <div className="flex items-center gap-3">
                      <StarRating rating={shop.rating} size="md" />
                      <span className="text-sm text-muted-foreground">
                        {shop.rating} ({shop.review_count} reviews)
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-foreground">{shop.address}</p>
                      {shop.google_maps_url && (
                        <a
                          href={shop.google_maps_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-primary hover:underline inline-flex items-center gap-1 mt-1"
                        >
                          View on Google Maps
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                    <a href={`tel:${shop.phone_number}`} className="text-foreground hover:text-primary transition-colors">
                      {shop.phone_number}
                    </a>
                  </div>

                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                    <span className="text-foreground">Reg No: {shop.reg_no}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                    <span className="text-foreground">Owner: {shop.shop_owner_name}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 mb-6">
                  <a
                    href={`https://wa.me/${shop.whatsapp_number}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="gap-2">
                      <MessageCircle className="w-4 h-4" />
                      WhatsApp
                    </Button>
                  </a>
                  <a href={`tel:${shop.phone_number}`}>
                    <Button variant="outline" className="gap-2 bg-transparent">
                      <Phone className="w-4 h-4" />
                      Call Now
                    </Button>
                  </a>
                  {shop.youtube_link && (
                    <a href={shop.youtube_link} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" className="gap-2 bg-transparent">
                        <Youtube className="w-4 h-4" />
                        Watch Video
                      </Button>
                    </a>
                  )}
                </div>

                {/* Services */}
                <div>
                  <h3 className="font-semibold text-foreground mb-3">Services Offered</h3>
                  <div className="flex flex-wrap gap-2">
                    {shop.services.map((service) => (
                      <Badge key={service} variant="secondary">
                        {service}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <section className="py-8 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 
              className="text-xl md:text-2xl font-bold text-foreground mb-6"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Customer Reviews
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Review Form */}
              <div className="lg:col-span-1">
                <div className="bg-card border border-border rounded-xl p-6 sticky top-24">
                  <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Star className="w-5 h-5 text-accent" />
                    Write a Review
                  </h3>

                  {showSuccess && (
                    <div className="bg-primary/10 border border-primary/20 text-primary rounded-lg p-3 mb-4 text-sm">
                      Thank you! Your review has been submitted successfully.
                    </div>
                  )}

                  <form onSubmit={handleSubmitReview}>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Your Rating
                      </label>
                      <StarRating
                        rating={userRating}
                        size="lg"
                        interactive
                        onRatingChange={setUserRating}
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Your Review
                      </label>
                      <Textarea
                        value={reviewComment}
                        onChange={(e) => setReviewComment(e.target.value)}
                        placeholder="Share your experience with this shop..."
                        rows={4}
                        className="resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full"
                      disabled={userRating === 0 || !reviewComment.trim() || isSubmitting}
                    >
                      {isSubmitting ? "Submitting..." : "Submit Review"}
                    </Button>

                    <p className="text-xs text-muted-foreground mt-3 text-center">
                      <Link href="/login" className="text-primary hover:underline">Sign in</Link>
                      {" "}for your review to be saved to your account
                    </p>
                  </form>
                </div>
              </div>

              {/* Reviews List */}
              <div className="lg:col-span-2">
                {localReviews.length > 0 ? (
                  <div className="space-y-4">
                    {localReviews.map((review) => (
                      <ReviewCard key={review.id} review={review} />
                    ))}
                  </div>
                ) : (
                  <div className="bg-card border border-border rounded-xl p-8 text-center">
                    <div className="w-16 h-16 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
                      <Star className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h3 className="font-medium text-foreground mb-2">No Reviews Yet</h3>
                    <p className="text-muted-foreground">
                      Be the first to review this shop!
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
