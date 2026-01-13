import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export default function AuthAction() {
    return (
        <>
            <SignedIn>
                <UserButton />
            </SignedIn>
            <SignedOut>
                <SignInButton />
            </SignedOut>
        </>
    )
}