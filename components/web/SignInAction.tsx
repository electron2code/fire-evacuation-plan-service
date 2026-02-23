"use client";

import { MessageSquarePlus } from "lucide-react";
import { Button } from "../ui/button";
import { useSignIn, useClerk } from "@clerk/nextjs";

export default function SignInAction() {
    const { isLoaded } = useSignIn();
    const { openSignIn } = useClerk();

    const handleSignIn = () => {
        if (isLoaded) {
            openSignIn();
        }
    }
    return (
        <div className="bg-amber-50 rounded-xl p-8 text-center border border-amber-100 sticky top-8">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquarePlus className="w-8 h-8 text-amber-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Have you used this service?</h3>
            <p className="text-gray-600 mb-6">Log in to share your experience with the community.</p>
            <Button onClick={handleSignIn} className="w-full bg-amber-600 hover:bg-amber-700 text-white">
                Sign In to Review
            </Button>
        </div>
    )
}