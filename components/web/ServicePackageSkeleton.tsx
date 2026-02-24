export default function ServicePageSkeleton() {
    return (
        <div className="w-full flex gap-6 p-4">

            {/* LEFT SIDE */}
            <div className="flex-1 space-y-4">

                {/* Big image card */}
                <div className="w-full h-82.5 bg-gray-300 rounded-xl relative overflow-hidden">
                    <Shimmer />
                </div>

                {/* Title */}
                <div className="h-7 w-80 bg-gray-300 rounded-md relative overflow-hidden">
                    <Shimmer />
                </div>

                {/* Description lines */}
                <div className="space-y-3">
                    <div className="h-4 w-[90%] bg-gray-300 rounded-md relative overflow-hidden">
                        <Shimmer />
                    </div>
                    <div className="h-4 w-[85%] bg-gray-300 rounded-md relative overflow-hidden">
                        <Shimmer />
                    </div>
                    <div className="h-4 w-[70%] bg-gray-300 rounded-md relative overflow-hidden">
                        <Shimmer />
                    </div>
                </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="w-95 space-y-5">

                {/* Tabs */}
                <div className="grid grid-cols-3 gap-2">
                    <div className="h-10 bg-gray-300 rounded-md relative overflow-hidden">
                        <Shimmer />
                    </div>
                    <div className="h-10 bg-gray-200 rounded-md relative overflow-hidden">
                        <Shimmer />
                    </div>
                    <div className="h-10 bg-gray-200 rounded-md relative overflow-hidden">
                        <Shimmer />
                    </div>
                </div>

                {/* Package box */}
                <div className="border p-4 rounded-md space-y-4">

                    <div className="h-5 w-24 bg-gray-300 rounded relative overflow-hidden">
                        <Shimmer />
                    </div>

                    <div className="h-4 w-[95%] bg-gray-300 rounded relative overflow-hidden">
                        <Shimmer />
                    </div>
                    <div className="h-4 w-[80%] bg-gray-300 rounded relative overflow-hidden">
                        <Shimmer />
                    </div>

                    {/* Price */}
                    <div className="h-6 w-28 bg-gray-300 rounded relative overflow-hidden mt-4">
                        <Shimmer />
                    </div>
                </div>

                {/* Continue button */}
                <div className="h-12 w-full bg-gray-300 rounded-md relative overflow-hidden">
                    <Shimmer />
                </div>

                {/* Seller box */}
                <div className="p-4 border rounded-xl flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-gray-300 relative overflow-hidden">
                        <Shimmer />
                    </div>

                    <div className="space-y-2 w-full">
                        <div className="h-4 w-28 bg-gray-300 rounded relative overflow-hidden">
                            <Shimmer />
                        </div>
                        <div className="h-4 w-36 bg-gray-300 rounded relative overflow-hidden">
                            <Shimmer />
                        </div>
                    </div>
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