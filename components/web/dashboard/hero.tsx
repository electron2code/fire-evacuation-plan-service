"use client";

import TextEditor from "@/components/ui/text-editor";
import { HeroSlider } from "./hero-slider";

export default function Hero() {
    return (
        <div className="min-h-100 w-full pr-20 overflow-x-hidden pb-20">
            <div className="mt-10 px-16 min-h-100">
                <TextEditor />
            </div>
            <div className="mt-8">
                <HeroSlider />
            </div>
        </div>
    )
}