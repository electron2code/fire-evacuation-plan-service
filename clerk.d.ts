// clerk.d.ts
import "next";

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: "admin" | "user";
    };
  }
}

export { };
