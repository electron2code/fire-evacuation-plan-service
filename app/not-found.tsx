import Link from "next/link";

export const dynamic = "force-dynamic";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-100 px-6 text-slate-800">
      <h1 className="text-3xl md:text-5xl font-bold">Page not found</h1>
      <p className="mt-3 text-sm md:text-base text-slate-500 text-center max-w-xl">
        The page you’re looking for doesn’t exist or may have been moved.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex items-center justify-center rounded-lg bg-slate-900 px-6 py-3 text-white hover:bg-slate-800 active:bg-slate-950 transition-colors"
      >
        Go home
      </Link>
    </div>
  );
}

