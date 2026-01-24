import { User } from "lucide-react";
import { StarRating } from "./star-rating";
import type { Review } from "@/lib/types";

interface ReviewCardProps {
  review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
  const formattedDate = new Date(review.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="bg-card border border-border rounded-xl p-5">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
          <User className="w-5 h-5 text-secondary-foreground" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1">
            <h4 className="font-medium text-foreground">{review.user_name}</h4>
            <span className="text-xs text-muted-foreground">{formattedDate}</span>
          </div>
          <StarRating rating={review.rating} size="sm" />
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
            {review.comment}
          </p>
        </div>
      </div>
    </div>
  );
}
