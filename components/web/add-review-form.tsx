'use client'

import { createReview } from "@/actions/review";
import { useActionState } from "react";
import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

interface AddReviewFormProps {
    serviceId: string;
}

const initialState = {
    message: "",
    success: false,
};

export default function AddReviewForm({ serviceId }: AddReviewFormProps) {
    const [state, formAction, isPending] = useActionState(createReview, initialState);
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);

    useEffect(() => {
        if (state.message) {
            if (state.success) {
                toast.success(state.message);
                // Reset form (optional, handled by key or manual reset if needed)
                setRating(0);
                (document.getElementById("review-form") as HTMLFormElement)?.reset();
            } else {
                toast.error(state.message);
            }
        }
    }, [state]);

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Write a Review</h3>
            <form id="review-form" action={formAction} className="space-y-6">
                <input type="hidden" name="serviceId" value={serviceId} />
                <input type="hidden" name="rating" value={rating} />

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                    <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                type="button"
                                className="focus:outline-none transition-transform hover:scale-110"
                                onMouseEnter={() => setHoverRating(star)}
                                onMouseLeave={() => setHoverRating(0)}
                                onClick={() => setRating(star)}
                            >
                                <Star
                                    className={`w-8 h-8 ${star <= (hoverRating || rating)
                                            ? "text-yellow-400 fill-yellow-400"
                                            : "text-gray-300"
                                        }`}
                                />
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
                        Your Review
                    </label>
                    <textarea
                        id="comment"
                        name="comment"
                        rows={4}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all resize-none bg-gray-50"
                        placeholder="Share your experience with this service..."
                        required
                        minLength={5}
                    />
                </div>

                <div className="flex justify-end">
                    <Button
                        type="submit"
                        disabled={isPending || rating === 0}
                        className="bg-amber-600 hover:bg-amber-700 text-white font-medium px-8"
                    >
                        {isPending ? "Submitting..." : "Post Review"}
                    </Button>
                </div>
            </form>
        </div>
    );
}
