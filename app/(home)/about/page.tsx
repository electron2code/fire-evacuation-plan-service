import Image from "next/image";
import localFont from "next/font/local"
import { GraduationCap } from "lucide-react";
import { ReactNode } from "react";
import Link from "next/link";
import ContactCards from "@/components/web/contact-cards";

const calibriFont = localFont({
    src: "./calibri.ttf",
});

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
    ],

    softwares: [
        "Adobe Illustrator",
        "Adobe Photoshop",
        "AutoCAD",
    ],
    worksAt: [{
        CompanyLogo: <svg fill="#ffffff" width="30px" height="30px" viewBox="-2.5 -2 24 24" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin" className="jam jam-fiverr" stroke="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M16.25 16.25v-10h-10v-.625c0-1.034.841-1.875 1.875-1.875H10V0H8.125A5.632 5.632 0 0 0 2.5 5.625v.625H0V10h2.5v6.25H0V20h8.75v-3.75h-2.5V10h6.285v6.25H10V20h8.75v-3.75h-2.5z"></path><circle cx="14.375" cy="1.875" r="1.875"></circle></g></svg>,
        companyName: "Fiverr",
        profileLink: "",
        profileName: "Md. Sabbir Hossain"
    }]
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
                        <Image className="absolute w-full scale-[200px] h-full object-cover object-center" src={"/I-will-design-professional-emergency-evacuation-plan,-exit-plan,-safety-plan1.jpeg"} width={300} height={300} alt="Profile of SH Sabbir" />
                    </div>
                    <div className="flex flex-col justify-center w-full py-5">
                        <h1 className={`text-center text-3xl md:text-4xl text-gray-700 font-bold ${calibriFont.className}`}>Md. Sabbir Hossain</h1>
                        <h2 className="text-center text-2xl md:text-3xl text-gray-800 w-full mt-3">Professional Graphics Designer</h2>
                        <p className="text-center w-full px-5 mt-6 text-gray-800 tracking-wide">I am Md. Sabbir Hossain, I am a professional graphic designer full of knowledge and skills. I have a degree in graphic design with over 10 years of experience in fire emergency evacuation plans. I am a Level 2 seller working on fire emergency evacuation plans on Fiverr. I have been working on fire emergency evacuation plans on Fiverr since 2021. I have excellent knowledge of AutoCAD, Adobe Illustrator, Adobe Photoshop.
                            Feel free to contact thanks!</p>
                    </div>
                </section>

                <section className="mt-20 lg:mt-28">
                    <h3 className="text-gray-700 text-2xl font-bold">Skills</h3>
                    <ul className="flex flex-wrap mt-5 gap-1 max-w-md items-center">
                        {
                            skills.workingSkills.map((skill, index) => (
                                <li className="w-fit text-gray-700 tracking-wide text-nowrap px-3 py-2 rounded-sm border border-yellow-500/30 bg-gray-200 shadow" key={index}>{skill.title}</li>
                            ))
                        }
                    </ul>
                    <h3 className="text-gray-700 text-2xl font-bold mt-10">Softwares I use</h3>
                    <ul className="flex flex-wrap mt-5 gap-1 max-w-md items-center">
                        {
                            skills.softwares.map((software, index) => (
                                <li className="w-fit text-gray-700 tracking-wide text-nowrap px-3 py-2 rounded-sm border border-yellow-500/30 bg-gray-200 shadow" key={index}>{software}</li>
                            ))
                        }
                    </ul>
                    <h3 className="text-gray-700 text-2xl font-bold mt-10">Education</h3>
                    <div className="mt-4">
                        {
                            educations.map((edu, index) => (
                                <EducationCard key={index} institute={edu.institute} degree={edu.degree} years={edu.years} />
                            ))
                        }
                    </div>

                    <h3 className="text-gray-700 text-2xl font-bold mt-10">Works At</h3>
                    <div className="mt-4">
                        {
                            skills.worksAt.map((wat, index) => (
                                <WorkCard key={index} companyName={wat.companyName} CompanyLogo={wat.CompanyLogo} profileLink={wat.profileLink} profileName={wat.profileName} />
                            ))
                        }
                    </div>
                </section>

                <section className="mt-20">
                    <h2 className="text-2xl font-bold text-gray-700">Contact Me:</h2>
                    <p className="text-xl mt-3 font-bold text-gray-500">We're here to help.</p>
                    <div className="mt-10">
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
                <h4 className="text-base font-medium mb-1">{institute}</h4>
                <p className="text-gray-700">{degree}</p>
                <p className="text-gray-700">Graduated {years}</p>
            </div>
        </div>
    )
}

function WorkCard({ companyName, CompanyLogo, profileLink, profileName }: { companyName: string, CompanyLogo: ReactNode, profileLink: string, profileName: string }) {
    return (
        <div className="flex gap-2">
            <div>
                <div className="w-12 h-12 rounded-full bg-[#32a852] flex items-center justify-center">
                    {CompanyLogo}
                </div>
            </div>
            <div>
                <h4 className="text-base font-medium">{companyName}</h4>
                <Link className="text-blue-500 hover:text-blue-600 active:text-blue-800 visited:text-blue-900" href={profileLink}>{profileName}</Link>
            </div>
        </div>
    )
}