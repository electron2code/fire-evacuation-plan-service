import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isPublicRoute = createRouteMatcher(['/sign-in(.*)']);
const isAdminRoute = createRouteMatcher(['/dashboard(.*)']);

export default clerkMiddleware(async (auth, req) => {
  
  if (isAdminRoute(req)) {
    const user = await auth();
    if (!user) {
      await auth.protect()
    } 
    const role = user.sessionClaims?.metadata?.role;

    if (role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
  // if (!isPublicRoute(req)) {
  // }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};