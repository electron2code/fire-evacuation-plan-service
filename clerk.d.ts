// clerk.d.ts
import "next";

declare global {
  interface ClerkSessionClaims {
    metadata?: {
      role?: "admin" | "user";
    };
  }
}

export {};
