import prisma from "@/lib/prisma";
import Image from "next/image";

export default async function SafetyEquipmentsPage({ params }: { params: Promise<{ id: string }> }) {

    const { id } = await params;
    const safetyEquipmentMedia = await prisma.safetyEquipmentMedia.findMany({
        where: {
            contactSubmissionId: id
        }
    });

    return (
        <div>
            <h1 className="text-3xl font-bold text-transparent bg-linear-to-r from-blue-600 to-blue-300 bg-clip-text">Safety Equipments</h1>
            {
                !safetyEquipmentMedia.length && <p className="text-xl text-center font-bold">No safety equipments media</p>
            }
            <div className="columns-1 md:columns-2 lg:columns-3">
                {
                    safetyEquipmentMedia.map((sem) => {
                        if (sem.type.includes("image")) {
                            return (
                                <div key={sem.id} className="my-4">
                                    <Image className="w-full max-w-sm" width={300} height={200} src={sem.url} alt="Project Visual" />
                                </div>
                            )
                        } else if (sem.type.includes("video")) {
                            return (
                                <div key={sem.id} className="my-4">
                                    <video className="w-full max-w-sm" width={300} height={200} controls src={sem.url}></video>
                                </div>
                            )
                        } else if (sem.type.includes("pdf")) {
                            return (
                                <div key={sem.id} className="my-4">
                                    <iframe src={sem.url} width="100%" height="600px"> This browser does not support PDFs. Please download the PDF to view it: <a href="path/to/your.pdf">Download PDF</a></iframe>
                                </div>
                            )
                        }
                    })
                }
            </div>
        </div>
    )
}