import Image from "next/image";
import localFont from "next/font/local"
import { GraduationCap } from "lucide-react";
import { ReactNode } from "react";
import Link from "next/link";
import ContactCards from "@/components/web/contact-cards";
import { Metadata } from "next";

const calibriFont = localFont({
    src: "./calibri.ttf",
});

export const metadata: Metadata = {
    title: "Md. Sabbir Hossain | Evacuation Plan Service",
    description: 'I am Md. Sabbir Hossain, I am a professional graphic designer full of knowledge and skills. I have a degree in graphic design with over 10 years of experience in fire emergency evacuation plans. I am a Level 2 seller working on fire emergency evacuation plans on Fiverr. I have been working on fire emergency evacuation plans on Fiverr since 2021. I have excellent knowledge of AutoCAD, Adobe Illustrator, Adobe Photoshop.Feel free to contact thanks!',
    generator: 'Next.js',
    applicationName: 'Evacuation plan service portal',
    referrer: 'origin-when-cross-origin',
    keywords: [
        'evacuation plan',
        'safety plan',
        'fire exit plan',
        'exit plan',
        'escape plan',
        'fire emergency evacuation plans',
        'fire safety planning',
        'california fire plan',
        'fire plan',
        'dillinger escape plan',
        'safety plan for suicidal ideation evac plans',
        'fire escape plan',
        'fire evacuation plan',
        'emergency evacuation plan',
        'fire emergency evacuation plan',
        'fire and evacuation plan',
        'fire evac plan',
        'emergency and evacuation plan',
        'emergency evac plan',
        'fire and emergency evacuation plan',
        'plan of evacuation',
        'fire drill procedure',
        'home fire escape plan',
        'home emergency escape plan',
        'emergency evacuation procedure',
        'evacuation plan example',
        'evacuation route signage',
        'emergency evacuation plan example',
        'emergency and evacuation procedures',
        'example of an emergency evacuation plan',
        'emergency exit plan',
        'evacuation procedures',
        'emergency evacuation procedures in the workplace',
        'evacuation plan drawing',
        'emergency evacuation plan template',
        'free editable fire evacuation plan template',
        'family evacuation plan',
        'how to create an evacuation plan',
        'safety plan template',
        'fire safety plan',
    ],
    authors: [{ name: 'Md. Sabbir Hossain' }, { name: 'Md. Sabbir Hossain', url: 'https://evacuationplanservice.com' }],
    creator: 'Electron2Code',
    publisher: 'Israfil Mallick',
    formatDetection: {
        email: true,
        address: true,
        telephone: true,
    },
    openGraph: {
        title: 'Md. Sabbir Hossain | Evacuation Plan Service',
        description: 'I am Md. Sabbir Hossain, I am a professional graphic designer full of knowledge and skills. I have a degree in graphic design with over 10 years of experience in fire emergency evacuation plans. I am a Level 2 seller working on fire emergency evacuation plans on Fiverr. I have been working on fire emergency evacuation plans on Fiverr since 2021. I have excellent knowledge of AutoCAD, Adobe Illustrator, Adobe Photoshop.Feel free to contact thanks!',
        type: 'article',
        publishedTime: '2026-01-01T00:00:00.000Z',
        authors: ['Md. Sabbir Hossain'],
        countryName: "Bangladesh",
        emails: "evacuationplanservice@gmail.com",
        phoneNumbers: ["+8801601770053"],
    },
}

const skills =
{
    "workingSkills": [
        {
            title: "Fire Emergency Evacuation Plan",
        },
        {
            title: "Fire Life Safety Plan"
        },
        {
            title: "Escape Plan"
        },
        {
            title: "Fire Emergency Exit Plan"
        },
        {
            title: "Site Plan"
        },
        {
            title: "Floor Plan Redesign"
        },
        {
            title: "Zone Plan"
        }
    ],

    softwares: [
        "Adobe Illustrator",
        "Adobe Photoshop",
        "AutoCAD",
    ],
    worksAt: [
        {
            CompanyLogo: <svg fill="#ffffff" width="30px" height="30px" viewBox="-2.5 -2 24 24" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin" className="jam jam-fiverr" stroke="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M16.25 16.25v-10h-10v-.625c0-1.034.841-1.875 1.875-1.875H10V0H8.125A5.632 5.632 0 0 0 2.5 5.625v.625H0V10h2.5v6.25H0V20h8.75v-3.75h-2.5V10h6.285v6.25H10V20h8.75v-3.75h-2.5z"></path><circle cx="14.375" cy="1.875" r="1.875"></circle></g></svg>,
            companyName: "Fiverr",
            profileLink: "https://www.fiverr.com/shuvo7770053?public_mode=true",
            profileName: "Md. Sabbir Hossain"
        },
        {
            CompanyLogo: <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 283.89 283.98"><path d="M305.67,425.66c-78.62-.57-141.89-63.63-141.61-142.57a141.94,141.94,0,0,1,283.88.85C447.78,362.41,384.67,425.38,305.67,425.66Zm12.69-156.58c-1.58-3-3.29-5.88-4.66-8.92q-7.51-16.65-14.82-33.41a2.5,2.5,0,0,0-2.7-1.73c-6.95.07-13.91.09-20.86,0-1.79,0-2.41.47-2.39,2.34.08,8.91,0,17.82,0,26.73,0,10.75.27,21.51-.19,32.23-.37,8.68-5.51,15.7-15,16.73-5.88.64-11.54-.1-15.92-4.7-3.93-4.13-5.2-9.23-5.19-14.79,0-18.77,0-37.54,0-56.31,0-1.71-.45-2.27-2.23-2.25-7,.11-14,.05-21.05.05-3,0-3,0-3,3,0,18.58-.07,37.16,0,55.74a50.59,50.59,0,0,0,7.76,27.31,37,37,0,0,0,20,15.76,55,55,0,0,0,27.3,1.59,37.35,37.35,0,0,0,19.06-9.11c8.21-7.48,12.38-17.06,14-27.84.51-3.26.62-6.58.92-10a5.15,5.15,0,0,1,.4.49c3.72,6,7.46,12,11.1,18.07a4.09,4.09,0,0,1,.42,2.49c-.27,1.94-.74,3.84-1.16,5.75q-5.94,27.65-11.89,55.27c-.21,1-.29,2-.47,3.25,8.47,0,16.61,0,24.75-.06.45,0,1.14-.74,1.29-1.26.46-1.63.7-3.32,1-5q3-14.64,6-29.27c.69-3.36,1.29-6.73,2-10.31l1.95,1c10.85,5.69,22.43,8,34.47,6,27-4.53,42.54-30.17,37.47-55.29a45.47,45.47,0,0,0-49.5-36.17c-14.23,1.56-25.11,8.71-32.72,20.73C322.24,260.94,320.47,265,318.36,269.08Z" transform="translate(-164.06 -141.68)"/><path d="M361.69,303a37.19,37.19,0,0,1-21.44-8,1.93,1.93,0,0,1-.74-1.5c1.47-5.79,2.81-11.64,4.63-17.33a21,21,0,0,1,6.88-10c8.84-7.13,23.07-4.28,29,5.81,3.89,6.67,4.09,13.45.2,20.12C376.05,299.15,369.85,302.94,361.69,303Z" transform="translate(-164.06 -141.68)"/></svg>,
            companyName: "Upwork",
            profileLink: "https://www.upwork.com/freelancers/emergencyevacuationplan",
            profileName: "Md. Sabbir Hossain"
        }
    ]
}

const educations = [
    {
        institute: "Rhode Island University of Design",
        degree: "M.A.B. Degree professional graphics designer",
        years: "2016",
    }
]

export default function AboutPage() {
    return (
        <div className="bg-gray-100 min-h-screen pb-20">
            <div className="w-full max-w-7xl mx-auto px-4 md:px-6">
                <section className="flex flex-col items-center justify-center mt-10">
                    <div className="relative w-65 h-65 md:w-80 md:h-80 rounded-full bg-gray-300 shrink-0 overflow-hidden">
                        <Image className="absolute w-full scale-[200px] h-full object-cover object-center" src={"/I-will-design-professional-emergency-evacuation-plan,-exit-plan,-safety-plan1.jpeg"} width={1000} height={1000} alt="Profile of SH Sabbir" />
                    </div>
                    <div className="flex flex-col justify-center w-full py-5">
                        <h1 className={`text-center text-3xl md:text-4xl text-orange-600 font-bold ${calibriFont.className}`}>Md. Sabbir Hossain</h1>
                        <h2 className="text-center text-2xl md:text-3xl text-black w-full mt-3">Professional Graphics Designer</h2>
                        <p className="text-center w-full px-5 mt-6 text-black tracking-wide">I am Md. Sabbir Hossain, I am a professional graphic designer full of knowledge and skills. I have a degree in graphic design with over 10 years of experience in fire emergency evacuation plans. I am a Level 2 seller working on fire emergency evacuation plans on Fiverr. I have been working on fire emergency evacuation plans on Fiverr since 2021. I have excellent knowledge of AutoCAD, Adobe Illustrator, Adobe Photoshop.
                            Feel free to contact thanks!</p>
                    </div>
                </section>

                <section className="mt-20 lg:mt-28">
                    <h3 className="text-orange-600 text-2xl font-bold">Skills</h3>
                    <ul className="flex flex-wrap mt-5 gap-1 max-w-md items-center">
                        {
                            skills.workingSkills.map((skill, index) => (
                                <li className="w-fit text-black font-semibold tracking-wide text-nowrap px-3 py-2 rounded-sm border border-yellow-500/30 bg-gray-200 shadow" key={index}>{skill.title}</li>
                            ))
                        }
                    </ul>
                    <h3 className="text-orange-600 text-2xl font-bold mt-10">Softwares I use</h3>
                    <ul className="flex flex-wrap mt-5 gap-1 max-w-md items-center">
                        {
                            skills.softwares.map((software, index) => (
                                <li className="w-fit text-black font-semibold tracking-wide text-nowrap px-3 py-2 rounded-sm border border-yellow-500/30 bg-gray-200 shadow" key={index}>{software}</li>
                            ))
                        }
                    </ul>
                    <h3 className="text-orange-600 text-2xl font-bold mt-10">Education</h3>
                    <div className="mt-4">
                        {
                            educations.map((edu, index) => (
                                <EducationCard key={index} institute={edu.institute} degree={edu.degree} years={edu.years} />
                            ))
                        }
                    </div>

                    <h3 className="text-orange-600 text-2xl font-bold mt-10">Works At</h3>
                    <div className="mt-4">
                        {
                            skills.worksAt.map((wat, index) => (
                                <WorkCard key={index} companyName={wat.companyName} CompanyLogo={wat.CompanyLogo} profileLink={wat.profileLink} profileName={wat.profileName} />
                            ))
                        }
                    </div>
                </section>

                <section className="mt-20">
                    <h2 className="text-2xl font-bold text-orange-600">Contact Me:</h2>
                    <p className="text-xl mt-3 font-bold text-black">We're here to help.</p>
                    <div className="mt-20">
                        <ContactCards />
                    </div>
                </section>
            </div>
        </div>
    )
}


function EducationCard({ institute, degree, years }: { institute: string, degree: string, years: string }) {
    return (
        <div className="flex gap-2">
            <div className="p-1">
                <GraduationCap className="size-5 text-gray-700 -mt-0.5" />
            </div>
            <div>
                <h4 className="text-black text-base font-medium mb-1">{institute}</h4>
                <p className="text-black">{degree}</p>
                <p className="text-black">Graduated {years}</p>
            </div>
        </div>
    )
}

function WorkCard({ companyName, CompanyLogo, profileLink, profileName }: { companyName: string, CompanyLogo: ReactNode, profileLink: string, profileName: string }) {
    return (
        <div className="flex gap-2 mt-4">
            <div>
                <div className={`w-12 h-12 rounded-full ${companyName === "Upwork"? "bg-transparent": "bg-[#32a852]"} flex items-center justify-center`}>
                    {CompanyLogo}
                </div>
            </div>
            <div>
                <h4 className="text-black text-base font-medium">{companyName}</h4>
                <Link className="text-blue-500 hover:text-blue-600 active:text-blue-800 visited:text-blue-900" href={profileLink} target="_blank">{profileName}</Link>
            </div>
        </div>
    )
}