import { Flame } from 'lucide-react';
import Image from 'next/image';

export default function Loading() {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-20 left-20 w-72 h-72 bg-orange-500 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-red-600 rounded-full blur-3xl animate-pulse delay-700"></div>
            </div>

            <div className="relative z-10 flex flex-col items-center justify-center space-y-8">
                <div className="relative">
                    <div className="absolute inset-0 bg-linear-to-r from-orange-500 to-red-600 rounded-full blur-2xl opacity-50 animate-pulse"></div>

                    <div className="relative bg-linear-to-br from-orange-500 to-red-600 p-6 rounded-full animate-bounce-slow">
                        <Flame className="w-16 h-16 text-white animate-flicker" />
                    </div>
                </div>

                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-bold text-white">
                        <span className="text-red-600">EVACUATION </span>
                        <span className="bg-linear-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                            PLAN
                        </span>
                    </h1>

                    <p className="text-gray-400 text-lg font-medium tracking-wide">
                        Fire Safety & Evacuation Planning Specialists
                    </p>
                </div>

                <div className="flex items-center space-x-2 mt-8">
                    <div className="w-3 h-3 bg-orange-500 rounded-full animate-bounce-dot"></div>
                    <div className="w-3 h-3 bg-orange-500 rounded-full animate-bounce-dot delay-150"></div>
                    <div className="w-3 h-3 bg-orange-500 rounded-full animate-bounce-dot delay-300"></div>
                </div>

                <div className="w-64 h-1 bg-gray-700 rounded-full overflow-hidden mt-4">
                    <div className="h-full bg-linear-to-r from-orange-500 to-red-600 rounded-full animate-loading-bar"></div>
                </div>
            </div>

            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
                <p className="text-gray-500 text-sm">Preparing your safety solutions...</p>
            </div>
        </div>
    );
}
