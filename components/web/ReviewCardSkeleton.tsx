export default function ReviewCardSkeleton() {
    return (
        <div className="w-82.5 p-5 rounded-xl bg-[#ffeeee] animate-pulse space-y-4">

            {/* Top row: Avatar + name + stars */}
            <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                    {/* Avatar */}
                    <div className="h-10 w-10 rounded-full bg-gray-300 relative overflow-hidden">
                        <Shimmer />
                    </div>

                    {/* Name + stars */}
                    <div className="space-y-2">
                        <div className="h-4 w-24 bg-gray-300 rounded relative overflow-hidden">
                            <Shimmer />
                        </div>
                        <div className="h-4 w-20 bg-gray-300 rounded relative overflow-hidden">
                            <Shimmer />
                        </div>
                    </div>
                </div>

                {/* Badge */}
                <div className="h-6 w-12 rounded-full bg-gray-300 relative overflow-hidden">
                    <Shimmer />
                </div>
            </div>

            {/* Date */}
            <div className="h-4 w-28 bg-gray-300 rounded relative overflow-hidden">
                <Shimmer />
            </div>

            {/* Review text */}
            <div className="h-4 w-40 bg-gray-300 rounded relative overflow-hidden">
                <Shimmer />
            </div>

            {/* Bottom: Platform + verified */}
            <div className="flex justify-between items-center pt-2">
                <div className="h-4 w-20 bg-gray-300 rounded relative overflow-hidden">
                    <Shimmer />
                </div>

                <div className="h-4 w-16 bg-gray-300 rounded relative overflow-hidden">
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