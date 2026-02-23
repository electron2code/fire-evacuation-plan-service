import prisma from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";

export default async function PojectsVisualsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const projectVisualsMedia = await prisma.projectVisualsMedia.findMany({
        where: {
            contactSubmissionId: id
        }
    });

    return (
        <div>
            <h1 className="text-3xl font-bold text-transparent bg-linear-to-r from-blue-600 to-blue-300 bg-clip-text">Projects Visuals</h1>

            {
                !projectVisualsMedia.length && <p className="text-xl text-center font-bold">No project visuals media</p>
            }

            <div className="columns-1 md:columns-2 lg:columns-3 mt-6 md:mt-8">
                {
                    projectVisualsMedia.map((pvm) => {
                        if (pvm.type.includes("image")) {
                            return (
                                <div key={pvm.id} className="my-4">
                                    <Link download className="cursor-pointer" title="Click to download image" href={pvm.url}>
                                        <Image className="w-full max-w-sm" width={300} height={200} src={pvm.url} alt="Project Visual" />
                                    </Link>
                                </div>
                            )
                        } else if (pvm.type.includes("video")) {
                            return (
                                <div key={pvm.id} className="my-4">
                                    <video className="w-full max-w-sm" width={300} height={200} controls src={pvm.url}></video>
                                </div>
                            )
                        } else if (pvm.type.includes("pdf")) {
                            return (
                                <div key={pvm.id} className="my-4">
                                    <iframe src={pvm.url} width="100%" height="600px"> This browser does not support PDFs. Please download the PDF to view it: <Link href={pvm.url} download="Projects visual pdg ">Download PDF</Link></iframe>
                                </div>
                            )
                        }
                    })
                }
            </div>
        </div>
    )
}