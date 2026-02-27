"use client";
import { ArrowUp } from "lucide-react";

export default function ScrollToTopButton() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (<button
        onClick={scrollToTop}
        className="fixed bottom-20 right-8 w-12 h-12 bg-orange-500 hover:bg-orange-600 rounded-full flex items-center justify-center shadow-lg transition-colors z-50"
        aria-label="Scroll to top"
    >
        <ArrowUp className="w-6 h-6" />
    </button>)
}