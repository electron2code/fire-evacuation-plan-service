import { Star, User } from "lucide-react";

interface ReviewUser {
    name: string | null;
    imageUrl: string | null;
}

interface Review {
    id: string;
    rating: number;
    comment: string;
    createdAt: Date;
    user: ReviewUser;
}

interface ReviewListProps {
    reviews: Review[];
}

export default function ReviewList({ reviews }: ReviewListProps) {
    if (reviews.length === 0) {
        return (
            <div className="text-center py-10 text-gray-500 bg-white rounded-xl border border-gray-200">
                No reviews yet. Be the first to review!
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-800">Reviews ({reviews.length})</h3>
            <div className="grid gap-6">
                {reviews.map((review) => (
                    <div key={review.id} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-100 border border-gray-200 flex items-center justify-center shrink-0">
                                    {review.user.imageUrl ? (
                                        <img
                                            src={review.user.imageUrl}
                                            alt={review.user.name || "User"}
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        <User className="w-5 h-5 text-gray-400" />
                                    )}
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 leading-none mb-1">
                                        {review.user.name || "Anonymous User"}
                                    </h4>
                                    <span className="text-xs text-gray-500">
                                        {new Date(review.createdAt).toLocaleDateString(undefined, {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </span>
                                </div>
                            </div>
                            <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-4 h-4 ${i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                                            }`}
                                    />
                                ))}
                            </div>
                        </div>
                        <p className="text-gray-600 leading-relaxed">{review.comment}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
