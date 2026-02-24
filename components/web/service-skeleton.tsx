export default function ServiceSkeleton() {
    return (
        <div className="w-full flex gap-10 p-6 animate-pulse">

            {/* LEFT SIDE IMAGE SKELETON */}
            <div className="w-105 h-65 bg-gray-300 rounded-xl relative overflow-hidden">
                <Shimmer />
            </div>

            {/* RIGHT SIDE TEXT SKELETON */}
            <div className="flex flex-col justify-center flex-1 space-y-4">
                {/* Title */}
                <div className="h-7 w-64 bg-gray-300 rounded-md relative overflow-hidden">
                    <Shimmer />
                </div>

                {/* Paragraph lines */}
                <div className="space-y-3">
                    <div className="h-4 w-full bg-gray-300 rounded-md relative overflow-hidden">
                        <Shimmer />
                    </div>
                    <div className="h-4 w-[90%] bg-gray-300 rounded-md relative overflow-hidden">
                        <Shimmer />
                    </div>
                    <div className="h-4 w-[80%] bg-gray-300 rounded-md relative overflow-hidden">
                        <Shimmer />
                    </div>
                    <div className="h-4 w-[60%] bg-gray-300 rounded-md relative overflow-hidden">
                        <Shimmer />
                    </div>
                </div>

                {/* Button */}
                <div className="mt-4 h-10 w-40 bg-gray-300 rounded-full relative overflow-hidden">
                    <Shimmer />
                </div>
            </div>
        </div>
    );
}

function Shimmer() {
    return (
        <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
    );
}