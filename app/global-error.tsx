"use client";


import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-100 text-slate-800">
        <div className="min-h-screen w-full flex flex-col items-center justify-center gap-4 px-6">
          <h1 className="text-3xl md:text-4xl font-bold text-center">
            Something went wrong
          </h1>
          <p className="text-sm text-slate-500 text-center max-w-xl">
            Please try again. If the problem persists, contact support.
          </p>
          <button
            type="button"
            onClick={() => reset()}
            className="px-6 py-3 rounded-lg bg-slate-900 text-white hover:bg-slate-800 active:bg-slate-950 transition-colors"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}

