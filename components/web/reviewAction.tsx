"use client";
import { useAuth } from "@clerk/nextjs"
import AddReviewForm from "./add-review-form";
import SignInAction from "./SignInAction";

export default function ReviewAction({ serviceId }: { serviceId: string }) {
    const auth = useAuth();
    return auth.userId ? (
        <div className="sticky top-8">
            <AddReviewForm serviceId={serviceId} />
        </div>
    ) : (
        <SignInAction />
    )
}