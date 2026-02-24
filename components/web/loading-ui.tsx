export default function LoadingUi() {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center relative overflow-hidden">
            <div className="relative z-10 flex flex-col items-center justify-center">
                <div className="relative">
                    <div className="absolute inset-0 bg-linear-to-r from-orange-500 to-red-600 rounded-full blur-2xl opacity-50 animate-pulse-slow"></div>
                    <div className="relative p-6 rounded-full animate-bounce-slow">
                        <svg width={100} height={100} id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 57.56 73.04"><defs><style></style><linearGradient id="linear-gradient" x1="21.22" y1="50" x2="78.78" y2="50" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#f08d27" /><stop offset="1" stopColor="#d32b2b" /></linearGradient></defs><path fill="url(#linear-gradient)" d="M51.92,51.72c-5.7,5.73-7.1,13.07-8.06,21.37-1.68-1.72-3-3-4.24-4.38-1.61-1.81-2-1.82-2.82.56-1.51,4.43-1.71,8.84.86,13,.54.89,1.16,1.73,1.69,2.63a1.82,1.82,0,0,1,.25.95c-.43.22-1,.56-1.37.43-10.88-3.92-19.3-13-16.45-26.5,1-4.67,3.4-9.05,5.15-13.57,1-2.57,1.92-5.18,3-7.73a8.84,8.84,0,0,1,1.51-1.88,8,8,0,0,1,1.88,1.61c1.06,1.76,1.94,3.64,3.07,5.81,7.25-8,11.24-16.92,9.88-27.82a11,11,0,0,1,.37-2.75,10.1,10.1,0,0,1,2.42.7c8.92,5,14.9,12.46,17.07,22.5.83,3.82.52,7.88.74,11.83,0,.6.14,1.19.21,1.79.48-.18,1.11-.21,1.42-.55a37.26,37.26,0,0,0,3.61-4.34c.8-1.18,1.46-1.56,2.2-.2,6.51,12,6.4,27-3.47,36.07a21.36,21.36,0,0,1-11.47,5.24c.07-.32,0-.73.22-1,6.34-7.45,4.55-12.52-.18-18.59-.64-.81-1.39-1.55-2.06-2.35C54.29,61,51.72,57.07,51.92,51.72Z" transform="translate(-21.22 -13.48)" /><path fill="#231f20" d="M50.29,71.74h-1.6c-.33,0-.48.25-.67.45l-1.53,1.61a2.54,2.54,0,0,1-.54.44.82.82,0,0,1-1.07-.15.75.75,0,0,1-.16-1,3.63,3.63,0,0,1,.51-.66c.69-.75,1.4-1.49,2.1-2.23a1.23,1.23,0,0,1,1-.43c1.28,0,2.55,0,3.83,0a2.38,2.38,0,0,1,2.16,1.29c.45.81.92,1.61,1.33,2.45a.94.94,0,0,0,1,.59c.74,0,1.49,0,2.23,0a2.5,2.5,0,0,1,.55.05,1,1,0,0,1,.73,1.06.94.94,0,0,1-.94.86c-1.3,0-2.6,0-3.9,0a.91.91,0,0,1-.83-.52c-.3-.45-.59-.89-.87-1.35-.14-.22-.23-.16-.34,0-.6,1-1.2,2-1.83,3a.65.65,0,0,0,.09.92c.44.48.82,1,1.25,1.49a3.57,3.57,0,0,1,.87,1.86c.21,1.23.52,2.44.77,3.67a1.06,1.06,0,0,1-.54,1.24,1.08,1.08,0,0,1-1.29-.13,1.39,1.39,0,0,1-.39-.71c-.25-1.06-.48-2.12-.67-3.19a2.33,2.33,0,0,0-.62-1.29c-.59-.64-1.15-1.33-1.74-2-.28-.31-.33-.3-.56.06-.46.71-.9,1.41-1.33,2.13a1.27,1.27,0,0,1-1.25.69c-1.4,0-2.79,0-4.18,0a1.1,1.1,0,0,1-1.2-1,1.17,1.17,0,0,1,1.14-1.24c.79,0,1.58,0,2.37,0,1.33,0,1.32,0,2-1.12,1.22-2,2.46-4,3.69-6.06C50,72.27,50.11,72.05,50.29,71.74Z" transform="translate(-21.22 -13.48)" /><path fill="#231f20" d="M53.2,68.11a2,2,0,1,1,4.08,0,2.05,2.05,0,0,1-2.1,2.11A2,2,0,0,1,53.2,68.11Z" transform="translate(-21.22 -13.48)" /></svg>
                        <h1 className="text-gray-800 text-center text-base font-bold">Evacuation <span className="bg-linear-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">Plan</span> <br /> Service</h1>
                    </div>
                </div>
                <div className="w-64 h-1 bg-gray-300 rounded-full overflow-hidden mt-8 relative">
                    <div className="h-full bg-linear-to-r from-orange-500 to-red-600 rounded-full animate-loading-bar absolute"></div>
                </div>
            </div>

            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
                <p className="text-gray-500 text-sm">Preparing your safety solutions...</p>
            </div>
        </div>
    );
}
