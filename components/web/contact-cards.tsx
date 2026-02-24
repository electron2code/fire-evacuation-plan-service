import Image from "next/image";
import Link from "next/link";

export default function ContactCards() {
    return (
        <div className="flex flex-wrap items-center gap-14 md:gap-3">
            <div className="w-full relative max-w-md px-4 shadow-[0_0_0_rgba(210, 210, 210, 0.5)] border border-gray-300 rounded">
                <div className="absolute left-1/2 -translate-x-1/2 -top-10 w-16 h-16 rounded-full bg-[#32a844] flex items-center justify-center">
                    <Image src="/whatsapp-icon.svg" width={48} height={48} alt="WhatsApp Icon" />
                </div>
                <div className="flex items-center gap-5 justify-start px-4 mt-4 pt-5">
                    <div className="w-14 h-14 rounded-full overflow-hidden flex items-center justify-center bg-gray-300">
                        <Image src="/I-will-design-professional-emergency-evacuation-plan,-exit-plan,-safety-plan-profile.jpeg"
                            width={56}
                            height={56}
                            alt="Profile of SH Sabbir"
                            className="object-cover object-center w-full h-full"
                        />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-800">MD. Sabbir Hossain</h3>
                        <p className="text-sm text-gray-500 leading-6">Please send a whatsapp message</p>
                    </div>
                </div>
                <div className="py-5 px-4">
                    <Link className="inline-block text-center bg-[#32a844] text-gray-50 font-bold px-5 py-2 rounded w-full" href="https://wa.me/+8801601770053">Whatsapp me</Link>
                </div>
            </div>
            <div className="w-full relative max-w-md px-4 shadow-[0_0_0_rgba(210, 210, 210, 0.5)] border border-gray-300 rounded">

                <div className="absolute left-1/2 -translate-x-1/2 -top-10 w-16 h-16 rounded-full bg-[#32a844] flex items-center justify-center">
                    <Image src="/email-icon.svg" width={40} height={40} alt="Gmail Icon" />
                </div>

                <div className="flex items-center gap-5 justify-start px-4 mt-4 pt-5">
                    <div className="shrink-0 w-14 h-14 rounded-full overflow-hidden flex items-center justify-center bg-gray-300">
                        <Image src="/I-will-design-professional-emergency-evacuation-plan,-exit-plan,-safety-plan-profile.jpeg"
                            width={56}
                            height={56}
                            alt="Profile of SH Sabbir"
                            className="object-cover object-center w-full h-full"
                        />
                    </div>
                    <div className="w-full">
                        <h3 className="text-xl font-bold text-gray-800">MD. Sabbir Hossain</h3>
                        <p className="text-sm wrap-normal text-gray-500 leading-6">Please send the message "Ask a question"</p>
                    </div>
                </div>
                <div className="py-5 px-4">
                    <Link className="inline-block text-center bg-[#32a844] text-gray-50 font-bold px-5 py-2 rounded w-full" href="mailto:evacuationplanservice@gmail.com">Email me</Link>
                </div>
            </div>
        </div>
    )
}