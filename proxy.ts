import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import prisma from './lib/prisma';

const isPublicRoute = createRouteMatcher(['/sign-in(.*)']);
const isAdminRoute = createRouteMatcher(['/dashboard(.*)']);

export default clerkMiddleware(async (auth, req) => {
  const user = await auth();
  if (user) {
    const userId = user.userId;
    const userInfo = user.sessionClaims;

    if (userId) {
      const isUserExist = await prisma.user.findUnique({
        where: {
          clerkId: userId,
        }
      });

      // console.log(isUserExist);

      if (!isUserExist) {
        if (userInfo) {
          await prisma.user.create({
            data: {
              clerkId: userId,
              email: `${userInfo.email}`,
              name: `${userInfo.name}`,
              imageUrl: `${userInfo.imageUrl}`
            }
          });
        }
      }
    }
  }

  if (isAdminRoute(req)) {
    const user = await auth();
    if (!user) {
      await auth.protect()
    }

    if (user.sessionClaims?.metadata) {
      const role = user.sessionClaims?.metadata.role as string
      if (role !== "admin") {
        return NextResponse.redirect(new URL("/", req.url));
      }
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