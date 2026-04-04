"use client";

import { useClerk, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import {
    Upload,
    CheckCircle,
    Camera,
    TrashIcon
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import Image from "next/image";

export default function ContactForm({ serviceTitle, encodedMessage }: { serviceTitle: string, encodedMessage: string }) {
    const { openSignIn } = useClerk();
    const { isSignedIn, isLoaded } = useUser();
    const [formData, setFormData] = useState({
        projectAddress: "",
        fireEmergencyNumber: "",
        googleLocationLink: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSafetyEquipmentUploading, setIsSafetyEquipmentUploading] = useState<{
        uploading: boolean,
        progress: number,
    }>({
        uploading: false,
        progress: 0
    });
    const [isProjectVisualsUploading, setIsProjectVisualsUploading] = useState<{
        uploading: boolean,
        progress: number,
    }>({
        uploading: false,
        progress: 0
    });
    const [companyLogoKey, setCompanyLogoKey] = useState("");
    const [companyLogoUrl, setCompanyLogoUrl] = useState("");
    const [safetyEquipmentFiles, setSafetyEquipmentFiles] = useState<{
        url: string,
        key: string,
        type: string,
    }[]>([]);
    const [projectVisualsFiles, setProjectVisualsFiles] = useState<{
        url: string,
        key: string,
        type: string,
    }[]>([]);

    const onCompanyLogoChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null

        if (!file) {
            toast.error("Please input a valid company logo");

            return;
        }

        const fileName = file.name;
        const size = file.size;
        const contentType = file.type;

        try {
            const response = await fetch("/api/v1/client/s3", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    fileName,
                    size,
                    contentType
                })
            });

            if (!response.ok) {
                toast.error("Something went wrong file couldn't upload, try again");
                throw new Error("Something went wrong file couldn't upload, try again");
            }

            const { presignedUrl, key } = await response.json();

            if (!presignedUrl) {
                toast.error("Couldn't get response, try again");
                throw new Error("Couldn't get response, try again");
            }
            await new Promise<void>((resolve, reject) => {
                const xhr = new XMLHttpRequest();

                xhr.upload.onprogress = (event) => {
                    // if (event.lengthComputable) {
                    //     const progress = (event.loaded / event.total) * 100;
                    //     setDropFile((prev) => prev ? { ...prev, progress, uploading: true } : prev);
                    // }
                };

                xhr.onload = () => {
                    if (xhr.status === 200 || xhr.status === 204) {
                        const imageUrl = `${process.env.NEXT_PUBLIC_BUCKET_URL}/${key}`;
                        setCompanyLogoKey(key);
                        setCompanyLogoUrl(imageUrl);
                        toast.success("File uploaded successfully");
                        resolve();
                    } else {
                        toast.error(`Upload failed with status ${xhr.status}`);
                        reject(new Error(`Upload failed with status ${xhr.status}`));
                    }
                }

                xhr.onerror = () => {
                    toast.error("Network error during upload");
                    reject(new Error("Network error during upload"));
                }

                xhr.open("PUT", presignedUrl);
                xhr.setRequestHeader("Content-Type", file.type);
                xhr.send(file);
            });
        } catch (error) {
            // ...existing code...
        }

    }

    const onSafetyEquepmentChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null

        if (!file) {
            toast.error("Please input a valid company logo");

            return;
        }

        // ...existing code...

        const fileName = file.name;
        const size = file.size;
        const contentType = file.type;

        try {
            setIsSafetyEquipmentUploading({ ...isSafetyEquipmentUploading, uploading: true });
            const response = await fetch("/api/v1/client/s3", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    fileName,
                    size,
                    contentType
                })
            });

            if (!response.ok) {
                toast.error("Something went wrong file couldn't upload, try again");
                throw new Error("Something went wrong file couldn't upload, try again");
            }

            const { presignedUrl, key } = await response.json();

            if (!presignedUrl) {
                toast.error("Couldn't get response, try again");
                throw new Error("Couldn't get response, try again");
            }
            await new Promise<void>((resolve, reject) => {
                const xhr = new XMLHttpRequest();

                xhr.upload.onprogress = (event) => {
                    if (event.lengthComputable) {
                        const progress = (event.loaded / event.total) * 100;
                        setIsSafetyEquipmentUploading({ uploading: progress < 100, progress });
                    }
                };

                xhr.onload = () => {
                    if (xhr.status === 200 || xhr.status === 204) {
                        const url = `${process.env.NEXT_PUBLIC_BUCKET_URL}/${key}`;
                        setSafetyEquipmentFiles(prev => [...prev, { key, url, type: file.type }]);
                        toast.success("File uploaded successfully");
                        resolve();
                    } else {
                        toast.error(`Upload failed with status ${xhr.status}`);
                        reject(new Error(`Upload failed with status ${xhr.status}`));
                    }
                }

                xhr.onerror = () => {
                    setIsSafetyEquipmentUploading({ ...isSafetyEquipmentUploading, uploading: false });
                    toast.error("Network error during upload");
                    reject(new Error("Network error during upload"));
                }

                xhr.open("PUT", presignedUrl);
                xhr.setRequestHeader("Content-Type", file.type);
                xhr.send(file);
            });
        } catch (error) {
            // ...existing code...
        }

    }
    const onProjectVisualsChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null

        if (!file) {
            toast.error("Please input a valid company logo");

            return;
        }

        // ...existing code...

        const fileName = file.name;
        const size = file.size;
        const contentType = file.type;

        try {
            setIsProjectVisualsUploading({ ...isProjectVisualsUploading, uploading: true });
            const response = await fetch("/api/v1/client/s3", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    fileName,
                    size,
                    contentType
                })
            });

            if (!response.ok) {
                toast.error("Something went wrong file couldn't upload, try again");
                throw new Error("Something went wrong file couldn't upload, try again");
            }

            const { presignedUrl, key } = await response.json();

            if (!presignedUrl) {
                toast.error("Couldn't get response, try again");
                throw new Error("Couldn't get response, try again");
            }
            await new Promise<void>((resolve, reject) => {
                const xhr = new XMLHttpRequest();

                xhr.upload.onprogress = (event) => {
                    if (event.lengthComputable) {
                        const progress = (event.loaded / event.total) * 100;
                        setIsProjectVisualsUploading({ uploading: progress < 100, progress });
                    }
                };

                xhr.onload = () => {
                    if (xhr.status === 200 || xhr.status === 204) {
                        const url = `${process.env.NEXT_PUBLIC_BUCKET_URL}/${key}`;
                        setProjectVisualsFiles((prev) => [...prev, { key, url, type: file.type }]);
                        setIsProjectVisualsUploading({ ...isProjectVisualsUploading, uploading: false });
                        toast.success("File uploaded successfully");
                        resolve();
                    } else {
                        toast.error(`Upload failed with status ${xhr.status}`);
                        reject(new Error(`Upload failed with status ${xhr.status}`));
                    }
                }

                xhr.onerror = () => {
                    setIsProjectVisualsUploading({ ...isProjectVisualsUploading, uploading: false });
                    toast.error("Network error during upload");
                    reject(new Error("Network error during upload"));
                }

                xhr.open("PUT", presignedUrl);
                xhr.setRequestHeader("Content-Type", file.type);
                xhr.send(file);
            });
        } catch (error) {
            // ...existing code...
        }
    }

    const handleDeleteCompanyLogo = async (key: string) => {
        try {
            const response = await fetch("/api/v1/client/s3", {
                method: "DELETE",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ key })
            });

            if (!response.ok) {
                toast.error("Something went wrong, try again");
                throw new Error("Something went wrong, try again");
            }
            setCompanyLogoKey("");
            setCompanyLogoUrl("");
        } catch (error) {
            // ...existing code...
        }
    }
    const handleDeleteSafetyEquepment = async (key: string) => {
        try {
            const response = await fetch("/api/v1/client/s3", {
                method: "DELETE",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ key })
            });

            if (!response.ok) {
                toast.error("Something went wrong, try again");
                throw new Error("Something went wrong, try again");
            }
            setSafetyEquipmentFiles((prev) => prev.filter((sftEF) => sftEF.key !== key));
        } catch (error) {
            // ...existing code...
        }
    }
    const handleDeleteProjectVisualsFile = async (key: string) => {
        try {
            const response = await fetch("/api/v1/client/s3", {
                method: "DELETE",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ key })
            });

            if (!response.ok) {
                toast.error("Something went wrong, try again");
                throw new Error("Something went wrong, try again");
            }
            setProjectVisualsFiles((prev) => prev.filter((pvf) => pvf.key !== key));
        } catch (error) {
            // ...existing code...
        }
    }

    const handleSubmitForm = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSubmitting(true);

        if (isLoaded && !isSignedIn) {
            openSignIn();
            setIsSubmitting(false);
            return;
        }
        if (!safetyEquipmentFiles.length) {
            toast.error("Please upload some Safety Equipment Location Photos of PDF");
            return;
        }

        if (!projectVisualsFiles.length) {
            toast.error("Please upload some Floor Plan or Project Video");
            return;
        }
        let message = `*New Service Request*\n\n` +
            `*Project Address:* ${formData.projectAddress}\n` +
            `*Fire Emergency Number:* ${formData.fireEmergencyNumber}\n` +
            `*Project Location Link:* ${formData.googleLocationLink}\n` +
            `*Company Logo:* ${companyLogoUrl}\n` +
            `*Safety Equipment Locations Files Links:* ${safetyEquipmentFiles.map((sef) => sef.url).join("\n")}\n` +
            `*Floor Plan / Project Visuals:* ${projectVisualsFiles.map((pvf) => pvf.url).join("\n")}\n`;

        // TODO
        try {
            const response = await fetch("/api/v1/client/contact-submission", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    projectAddress: formData.projectAddress,
                    emergencyNumber: formData.fireEmergencyNumber,
                    googleMapLink: formData.googleLocationLink,
                    companyLogo: {
                        url: companyLogoUrl,
                        key: companyLogoKey,
                    },
                    safetyEquipmentMedia: safetyEquipmentFiles,
                    projectVisualsMedia: projectVisualsFiles,
                })
            });

            if (!response.ok) {
                throw new Error(`Something went wrong with status ${response.status}`);
            }

            const allEncodedMessage = encodeURIComponent(message + encodedMessage);
            const phoneNumber = "+8801601770053";
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${allEncodedMessage}`;
            window.open(whatsappUrl, '_blank');
            setCompanyLogoKey("");
            setCompanyLogoUrl("");
            setProjectVisualsFiles([]);
            setSafetyEquipmentFiles([]);
            setFormData({
                projectAddress: "",
                fireEmergencyNumber: "",
                googleLocationLink: ""
            });
            (document.querySelector('[data-state="open"]') as HTMLDivElement).click();
        } catch (error: any) {
            console.error("Error: ", error.message);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="min-h-screen bg-[#f0f4f0] font-sans text-slate-700">
            {/* <div className="relative flex justify-center items-center bg-linear-to-r via-blue-200 from-blue-900 to-blue-500 py-10 gap-4 h-28 md:h-40 transition-all duration-300">
                <Image
                    src="/contact-image.png"
                    className="w-60 h-auto md:w-80 absolute -bottom-1/2 left-1/2 transform -translate-x-1/2 rotate-6 transition-all duration-300"
                    alt="Contact banner"
                    width={1536}
                    height={1024}
                />
            </div> */}

            <div className="w-full max-w-4xl mx-auto py-10 px-4">
                <h1 className="text-2xl md:text-3xl font-bold text-slate-800 z-10 mb-5">{serviceTitle}</h1>
                <form onSubmit={handleSubmitForm} className="space-y-4">
                    {/* 1. Project Address */}
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="bg-[#4a6741] text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">1</span>
                            <h3 className="font-bold text-lg text-[#3a5033]">Project Address</h3>
                        </div>
                        <input
                            required
                            onChange={(e) => setFormData(prev => ({ ...prev, projectAddress: e.target.value }))}
                            type="text"
                            placeholder="Project Address"
                            className="w-full border p-3 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        <p className="text-sm text-gray-500 mt-2">Enter your complete project address</p>
                    </div>

                    {/* 2. Fire Emergency Number */}
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="bg-[#e24c3d] text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">2</span>
                            <h3 className="font-bold text-lg text-[#3a5033]">Fire Emergency Number</h3>
                        </div>
                        <input
                            required
                            onChange={(e) => setFormData(prev => ({ ...prev, fireEmergencyNumber: e.target.value }))}
                            type="text"
                            placeholder="Enter your country's fire emergency contact number"
                            className="w-full border p-3 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        {/* 3. Google Location Link */}
                        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="bg-[#4a6741] text-white min-w-8 h-8 rounded-full flex items-center justify-center font-bold">3</span>
                                <h3 className="font-bold text-lg text-[#3a5033]">Google Location Link</h3>
                            </div>
                            <input
                                required
                                onChange={(e) => setFormData(prev => ({ ...prev, googleLocationLink: e.target.value }))}
                                type="url"
                                placeholder="Paste Google Maps location link here"
                                className="w-full border p-3 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>

                        {/* 4. Company Logo */}
                        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="bg-[#4a6741] text-white min-w-8 h-8 rounded-full flex items-center justify-center font-bold">4</span>
                                <h3 className="font-bold text-lg text-[#3a5033]">Company Logo <span className="text-gray-400 font-normal text-sm">(Optional)</span></h3>
                            </div>
                            <div className="flex items-center gap-2 border rounded-md bg-gray-50 overflow-hidden relative">
                                {!companyLogoUrl && (<button type="button" className="flex items-center gap-2 bg-white border-r px-4 py-2 hover:bg-gray-100 transition">
                                    <Upload size={18} className="text-gray-500" />
                                    <input
                                        required
                                        className="absolute inset-0 opacity-0"
                                        accept="image/png, image/jpeg, image/webp image/avif"
                                        type="file"
                                        onChange={onCompanyLogoChange}
                                    />
                                    <span className="font-medium">Upload File</span>
                                </button>)}
                                {
                                    companyLogoUrl ?
                                        (<div className="relative w-20 h-20">
                                            <Button type="button" onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                handleDeleteCompanyLogo(companyLogoKey);
                                            }} className="absolute right-0 top-0 h-5 w-5 p-2 cursor-pointer rounded-full bg-red-500 hover:bg-red-600">
                                                <TrashIcon className="size-4 text-white" />
                                            </Button>
                                            <Image src={companyLogoUrl} className="h-full w-full" alt="Company logo" width={50} height={50} />
                                        </div>)
                                        : <span className="text-xs text-gray-400 px-2 truncate italic">If your company has a logo, give it to me. If not, it's not necessary.</span>
                                }
                            </div>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        {/* 5. Safety Equipment */}
                        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="bg-[#4a6741] text-white min-w-8 h-8 rounded-full flex items-center justify-center font-bold">5</span>
                                <h3 className="font-bold text-lg text-[#3a5033]">Safety Equipment Locations</h3>
                            </div>
                            <p className="font-semibold text-sm mb-4">Upload Safety Equipment Location Photos:</p>
                            <ul className="space-y-2 mb-6 text-sm">
                                <li className="flex items-center justify-between">
                                    <div className="flex items-center gap-2"><CheckCircle size={16} className="text-green-600" /> Fire Extinguisher</div>
                                    <div className="w-6 h-6 bg-red-600 flex items-center justify-center text-[10px] text-white rounded-sm">
                                        <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 47.14 47.14"><defs><style></style></defs><rect fill="#ea2026" width="47.14" height="47.14" rx="1.56" /><path fill="#fff" d="M-117.8,47.4h-38.5a3.15,3.15,0,0,1-3.15-3.15V5.75A3.15,3.15,0,0,1-156.3,2.6h38.5a3.16,3.16,0,0,1,3.16,3.15v38.5A3.16,3.16,0,0,1-117.8,47.4ZM-156.3,3.09A2.66,2.66,0,0,0-159,5.75v38.5a2.66,2.66,0,0,0,2.66,2.66h38.5a2.67,2.67,0,0,0,2.67-2.66V5.75a2.67,2.67,0,0,0-2.67-2.66Z" transform="translate(160.62 -1.43)" /><path fill="#fff" d="M-139.91,17.45a3.9,3.9,0,0,0-2.86-3.72,9.3,9.3,0,0,0-.92-.16V10.91c.8-.18,1.56-.36,2.33-.52.25-.05.33-.18.32-.44,0-.44,0-.89,0-1.33,0-.25-.09-.34-.31-.41a5.71,5.71,0,0,0-2.28-.36,3.17,3.17,0,0,1-.52,0V6.26c-1.16,0-2.28,0-3.4,0-.08,0-.22.19-.23.3,0,.33,0,.66,0,1-.55,0-1,0-1.49,0a1.23,1.23,0,0,0-.69.27c-1.29,1.15-2.56,2.31-3.83,3.49a1.45,1.45,0,0,0-.37.59,11.1,11.1,0,0,0-.48,3.58c0,1.09,0,1.08,1,1.07.29,0,.38-.11.41-.39,0-.62.13-1.25.23-1.86a1,1,0,0,1,.25-.51c.85-.87,1.76-1.69,2.57-2.61.53-.61,1.11-.46,1.73-.44v2.79l-.31,0a3.52,3.52,0,0,0-3.19,2.69,7.79,7.79,0,0,0-.28,2.15q0,12,0,24c0,.91.33,1.24,1.21,1.24h9.93c.91,0,1.2-.3,1.2-1.22V18.22C-139.88,18-139.89,17.7-139.91,17.45Zm-1.44,8.63h-9.33V20.39h9.33Z" transform="translate(160.62 -1.43)" /><path fill="#fff" d="M-130.07,21.5a15.78,15.78,0,0,0,.09,2.29,11.58,11.58,0,0,0,2.82,5.81c2,2.42,4.8,3.41,7.7,4.31v-5C-124.15,28.17-127.39,25.29-130.07,21.5Z" transform="translate(160.62 -1.43)" /><path fill="#fff" d="M-129.15,17.49a14.6,14.6,0,0,0,2.47,6c2.06,2.73,3.94,3.1,7.21,2.67a10,10,0,0,1-4.46-4.64c-.55-1.05-1-2.13-1.49-3.23a8.06,8.06,0,0,0-2.78-3.69,4.07,4.07,0,0,0-3.05-.64,1.92,1.92,0,0,0,.17.19A5.84,5.84,0,0,1-129.15,17.49Z" transform="translate(160.62 -1.43)" /><path fill="#fff" d="M-128.59,35.16a6.33,6.33,0,0,0,4.65,2.65,5.65,5.65,0,0,0,4.48-1.49l-1.2-.38A9.68,9.68,0,0,1-125.37,33a13.4,13.4,0,0,0-2-1.83,4.8,4.8,0,0,0-4-1,6,6,0,0,0-2.34,1.08l.52.15a6.17,6.17,0,0,1,3.29,2.11C-129.44,34.07-129,34.61-128.59,35.16Z" transform="translate(160.62 -1.43)" /><path fill="#fff" d="M-119.45,38.75c-3.93,1.11-7.5.67-10.62-2.33a13,13,0,0,0,1.53,4.1,5.8,5.8,0,0,0,3.29,2.59,21,21,0,0,0,5.51.63c.3,0,.3-.17.3-.38,0-1,0-2,0-3Z" transform="translate(160.62 -1.43)" /><path fill="#fff" d="M-119.45,23.87c0-1.71,0-3.31,0-4.9a.45.45,0,0,0-.24-.33A5.37,5.37,0,0,1-122,16.47a19.62,19.62,0,0,1-1.84-4.1c-.08-.25-.17-.5-.25-.75a10.84,10.84,0,0,0,0,6.85A12.64,12.64,0,0,0-119.45,23.87Z" transform="translate(160.62 -1.43)" /><path fill="#ee3435" d="M-150.68,26.08h9.33V20.39h-9.33Z" transform="translate(160.62 -1.43)" /></svg>
                                    </div>
                                </li>
                                <li className="flex items-center justify-between">
                                    <div className="flex items-center gap-2"><CheckCircle size={16} className="text-green-600" /> Assembly Point</div>
                                    <div className="w-6 h-6 bg-green-600 flex items-center justify-center text-[10px] text-white rounded-sm">
                                        <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 46.88 46.88"><defs><style></style></defs><rect fill="#0a8b44" width="46.88" height="46.88" rx="1.12" /><rect fill="none" stroke="#fff" strokeMiterlimit={10} strokeWidth={0.33} x="2.3" y="2.3" width="42.28" height="42.28" rx="1.12" /><path fill="#fff" d="M-44.76,9.81a10.82,10.82,0,0,1,1.08-1.27c1.23,1.26,2.46,2.53,3.75,3.72,0-.76,0-1.53,0-2.3l1.71,0c-.05,1.77,0,3.54,0,5.3-1.72,0-3.46.11-5.17-.05a6.46,6.46,0,0,1-.09-1.58c.76,0,1.52,0,2.29,0C-42.25,12.2-43.66,11.15-44.76,9.81Z" transform="translate(52.03 -1.36)" /><path fill="#fff" d="M-13.85,8.92c.63-.32,1,.54,1.44.83-1.21,1.3-2.5,2.53-3.73,3.82l2.4,0c0,.56,0,1.12-.07,1.68-1.75-.18-3.57.22-5.27-.22,0-1.69,0-3.38,0-5.07.6,0,1.2,0,1.8,0a23,23,0,0,0,0,2.35C-16.15,11.17-15,10-13.85,8.92Z" transform="translate(52.03 -1.36)" /><path fill="#fff" d="M-29.45,16.45a2.05,2.05,0,0,1,2.61,2.37,2.08,2.08,0,0,1-3.48,1A2.09,2.09,0,0,1-29.45,16.45Z" transform="translate(52.03 -1.36)" /><path fill="#fff" d="M-23.16,19.52a2.09,2.09,0,0,1,2.76.91,2.1,2.1,0,0,1-1.12,2.86,2.37,2.37,0,0,1-2.32-.5c-.2-.49-.38-1-.55-1.49C-24.12,20.63-23.93,19.79-23.16,19.52Z" transform="translate(52.03 -1.36)" /><path fill="#fff" d="M-36.6,23.08a2.06,2.06,0,0,1,.42-3.62c.56,0,1.57-.36,1.61.49l0-.6c.59.5,1.25,1.1,1.15,2A2,2,0,0,1-36.6,23.08Z" transform="translate(52.03 -1.36)" /><path fill="#fff" d="M-29.47,21.89a2,2,0,0,1,2.65,2.16,2,2,0,0,1-3.12,1.53A2.07,2.07,0,0,1-29.47,21.89Z" transform="translate(52.03 -1.36)" /><path fill="#fff" d="M-38.08,24.45a7.06,7.06,0,0,1,5.27.09A3.36,3.36,0,0,1-31.29,27a5.83,5.83,0,0,1,4.87,0,3.63,3.63,0,0,1,1.63-2.49,6.66,6.66,0,0,1,5.13,0,2.79,2.79,0,0,1,1.42,2c.09,1.29.11,2.58.09,3.86h-1.58c-.1-1.1.21-2.29-.18-3.34-.09,1.11,0,2.22,0,3.33-1.55,0-3.11.05-4.66,0a27.6,27.6,0,0,0-.11-3.52c-.15,2,0,4,0,6.05l-1.62,0c-.06-1.11.25-2.33-.21-3.38a25.27,25.27,0,0,0,0,3.37c-1.5,0-3,0-4.51,0,0-1.08,0-2.17,0-3.26l-.26,0c0,1.08,0,2.16,0,3.24l-1.61,0c0-2,.13-4,0-6a19.73,19.73,0,0,0-.11,3.44c-1.56.07-3.12.05-4.67,0,0-1.1,0-2.21,0-3.32-.41,1.05-.07,2.24-.17,3.34h-1.66c0-1.18,0-2.37,0-3.56A3.71,3.71,0,0,1-38.08,24.45Z" transform="translate(52.03 -1.36)" /><path fill="#fff" d="M-43.38,34.48c1.72.06,3.44,0,5.16,0,0,1.75,0,3.49,0,5.24h-1.68c0-.79,0-1.58,0-2.36-1.12,1.22-2.32,2.38-3.51,3.54-.67.15-1-.67-1.36-1,1.24-1.22,2.49-2.43,3.68-3.7l-2.39,0C-43.49,35.58-43.44,35-43.38,34.48Z" transform="translate(52.03 -1.36)" /><path fill="#fff" d="M-18.92,39.77a22.91,22.91,0,0,1,0-5.3c1.75.06,3.5,0,5.25,0,0,.55-.07,1.11-.1,1.66h-2.31c1.2,1.29,2.47,2.5,3.72,3.74a4.72,4.72,0,0,1-1.32,1.16c-1.16-1.25-2.42-2.4-3.59-3.64a22.91,22.91,0,0,1-.11,2.34Z" transform="translate(52.03 -1.36)" /><circle fill="#fff" cx="16.59" cy="20.03" r="2.22" /><circle fill="#fff" cx="29.82" cy="20.03" r="2.22" /><circle fill="#fff" cx="23.16" cy="17.03" r="2.22" /><circle fill="#fff" cx="23.16" cy="22.48" r="2.22" /></svg>
                                    </div>
                                </li>
                                <li className="flex items-center justify-between">
                                    <div className="flex items-center gap-2"><CheckCircle size={16} className="text-green-600" /> Fire Alarm</div>
                                    <div className="w-6 h-6 bg-red-600 flex items-center justify-center text-[10px] text-white rounded-sm">
                                        <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 47.27 47.27"><defs><style></style><clipPath id="clip-path" transform="translate(106.03 -1.36)"><rect fill="none" x="-96.94" y="33.07" width="25.15" height="11.86" /></clipPath></defs><rect fill="#fff" width="47.27" height="47.27" rx="3.28" /><path fill="#ee332e" d="M-63.09,47.47H-101.7a3.17,3.17,0,0,1-3.16-3.16V5.69a3.17,3.17,0,0,1,3.16-3.16h38.61a3.16,3.16,0,0,1,3.16,3.16V44.31A3.16,3.16,0,0,1-63.09,47.47ZM-101.7,3a2.68,2.68,0,0,0-2.67,2.67V44.31A2.68,2.68,0,0,0-101.7,47h38.61a2.67,2.67,0,0,0,2.67-2.67V5.69A2.67,2.67,0,0,0-63.09,3Z" transform="translate(106.03 -1.36)" /><path fill="#2e4c57" d="M-85.47,38.86V37.24c7.93,0,14.82-5.07,16.66-12A1.73,1.73,0,0,1-66.88,24a17.11,17.11,0,0,1-6.25,10.63,19.66,19.66,0,0,1-12.34,4.27" transform="translate(106.03 -1.36)" /><path fill="#2e4c57" d="M-79.55,39.35h-9.6V23.23h9.6V39.35" transform="translate(106.03 -1.36)" /><path fill="#ef4247" d="M-70.8,18.62A13.55,13.55,0,0,1-84.35,32.16,13.55,13.55,0,0,1-97.91,18.62,13.56,13.56,0,0,1-84.35,5.07,13.55,13.55,0,0,1-70.8,18.62" transform="translate(106.03 -1.36)" /><path fill="#e23e45" d="M-76.79,7.38A12.94,12.94,0,0,1-72.54,17a13,13,0,0,1-13,13,13,13,0,0,1-11.85-7.65,13.56,13.56,0,0,0,13,9.84A13.55,13.55,0,0,0-70.8,18.62a13.5,13.5,0,0,0-6-11.24" transform="translate(106.03 -1.36)" /><path fill="#f8adae" d="M-82,18.62A2.37,2.37,0,0,1-84.35,21a2.38,2.38,0,0,1-2.38-2.37,2.39,2.39,0,0,1,2.38-2.38A2.38,2.38,0,0,1-82,18.62" transform="translate(106.03 -1.36)" /><g clipPath="url('#clip-path')"><path fill="#ef4247" d="M-74.18,44.91H-94.52a2.24,2.24,0,0,1-2.24-2.24V35.41a2.24,2.24,0,0,1,2.24-2.24h20.34a2.24,2.24,0,0,1,2.24,2.24v7.26a2.24,2.24,0,0,1-2.24,2.24" transform="translate(106.03 -1.36)" /></g><path fill="#2e4c57" d="M-67.15,25.32c-.35,1-.77.8-1.58.65s-1.48-.58-1.28-1.64,1.2-2.35,2-2.2,1.53,1.15.85,3.19" transform="translate(106.03 -1.36)" /><path fill="#fff" d="M-92.8,38.49h-.87v.71h.8v.55h-.8V40.9h-.56v-3h1.43v.56" transform="translate(106.03 -1.36)" /><path fill="#fff" d="M-91.86,40.9h-.56v-3h.56v3" transform="translate(106.03 -1.36)" /><path fill="#fff" d="M-90.77,38.44v.84h.24a.36.36,0,0,0,.29-.12.48.48,0,0,0,.11-.32.4.4,0,0,0-.1-.3.37.37,0,0,0-.29-.1Zm1.45,2.46h-.63l-.36-.8a.65.65,0,0,0-.15-.23.2.2,0,0,0-.16-.07h-.15v1.1h-.56v-3h.88a.9.9,0,0,1,.68.23.84.84,0,0,1,.23.61,1,1,0,0,1-.14.51.69.69,0,0,1-.39.32h0a.6.6,0,0,1,.18.15,1.87,1.87,0,0,1,.17.3l.4.84" transform="translate(106.03 -1.36)" /><path fill="#fff" d="M-87.54,40.9H-89v-3h1.43v.56h-.87v.64h.81v.55h-.81v.67h.92v.55" transform="translate(106.03 -1.36)" /><path fill="#fff" d="M-85.7,39.76H-85l-.27-1a.44.44,0,0,1,0-.1l0-.11h0a.44.44,0,0,0,0,.1l0,.11Zm-.88,1.14.89-3H-85l.87,3h-.59l-.17-.59h-.91l-.17.59h-.58" transform="translate(106.03 -1.36)" /><path fill="#fff" d="M-82.39,40.9h-1.48v-3h.56v2.41h.92v.56" transform="translate(106.03 -1.36)" /><path fill="#fff" d="M-81.39,39.76h.65l-.27-1a.3.3,0,0,0,0-.1l0-.11h0s0,.07,0,.1l0,.11Zm-.88,1.14.89-3h.66l.87,3h-.59l-.17-.59h-.91l-.16.59h-.59" transform="translate(106.03 -1.36)" /><path fill="#fff" d="M-79,38.44v.84h.25a.37.37,0,0,0,.29-.12.48.48,0,0,0,.11-.32.45.45,0,0,0-.1-.3.37.37,0,0,0-.29-.1Zm1.46,2.46h-.63l-.37-.8a.53.53,0,0,0-.14-.23.2.2,0,0,0-.16-.07H-79v1.1h-.55v-3h.88a.9.9,0,0,1,.68.23.84.84,0,0,1,.23.61,1,1,0,0,1-.14.51.76.76,0,0,1-.39.32h0a.6.6,0,0,1,.18.15,1.87,1.87,0,0,1,.17.3l.4.84" transform="translate(106.03 -1.36)" /><path fill="#fff" d="M-74.41,40.9H-75v-2a2.26,2.26,0,0,1,0-.25h0l0,.13,0,.1-.58,2h-.46l-.59-2,0-.11a.78.78,0,0,1,0-.14h0c0,.12,0,.23,0,.33V40.9h-.51v-3h.82l.51,1.76a1.36,1.36,0,0,1,0,.17,1.22,1.22,0,0,1,.05.17h0l0-.17s0-.1.05-.17l.5-1.76h.8v3" transform="translate(106.03 -1.36)" /><path fill="#f8adae" d="M-75,35.39H-93.83a.67.67,0,0,1-.67-.66.66.66,0,0,1,.67-.66H-75a.66.66,0,0,1,.66.66.67.67,0,0,1-.66.66" transform="translate(106.03 -1.36)" /><path fill="#f8adae" d="M-95.88,20.26a.74.74,0,0,1-.74-.74A13.27,13.27,0,0,1-91.2,8.85a.74.74,0,0,1,1,.16.74.74,0,0,1-.16,1,11.8,11.8,0,0,0-4.81,9.48.74.74,0,0,1-.74.74" transform="translate(106.03 -1.36)" /><path fill="#f8adae" d="M-87.4,8.43a.74.74,0,0,1-.7-.5A.75.75,0,0,1-87.64,7a13.51,13.51,0,0,1,2.75-.61.74.74,0,0,1,.82.65.75.75,0,0,1-.66.82,12,12,0,0,0-2.43.54.67.67,0,0,1-.24,0" transform="translate(106.03 -1.36)" /></svg>
                                    </div>
                                </li>
                                <li className="flex items-center justify-between">
                                    <div className="flex items-center gap-2"><CheckCircle size={16} className="text-green-600" /> Smoke Detector</div>
                                    <div className="w-6 h-6 bg-red-600 flex items-center justify-center text-[10px] text-white rounded-sm">
                                        <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 47.14 47.14"><defs><style></style></defs><rect fill="#ea2026" width="47.14" height="47.14" rx="1.56" /><path fill="#fff" d="M-171.25,47.4h-38.51a3.15,3.15,0,0,1-3.15-3.15V5.75a3.15,3.15,0,0,1,3.15-3.15h38.51a3.15,3.15,0,0,1,3.15,3.15v38.5A3.15,3.15,0,0,1-171.25,47.4ZM-209.76,3.09a2.66,2.66,0,0,0-2.66,2.66v38.5a2.66,2.66,0,0,0,2.66,2.66h38.51a2.66,2.66,0,0,0,2.66-2.66V5.75a2.66,2.66,0,0,0-2.66-2.66Z" transform="translate(214.08 -1.43)" /><path fill="#fff" d="M-199.81,21c.68.39,1.52.32,2.2.89.41.35,1.25.15,1.77.63.11.1.38,0,.56,0a1.51,1.51,0,0,1,.7.19c.66.57,1.56-.27,2.2.41.08.09.44-.11.67-.14s.48-.06.62.05a.8.8,0,0,0,1.18,0c.11-.09.37-.17.45-.11a1,1,0,0,0,1.37-.06c.31-.22.93,0,1.41,0,.1,0,.18-.28.31-.35s.43-.17.56-.09a.76.76,0,0,0,1.2-.33.59.59,0,0,1,.54-.15.85.85,0,0,0,1.24-.5c.06-.13.35-.28.45-.23.8.35,1.19-.37,1.75-.69h-19.76A1.65,1.65,0,0,0-199.81,21Z" transform="translate(214.08 -1.43)" /><path fill="#fff" d="M-192.22,14.09h-4.72V20c1.8,0,3.55,0,5.29,0,.58,0,.71-.21.7-.74,0-1.32,0-2.64,0-4S-190.76,14.09-192.22,14.09Z" transform="translate(214.08 -1.43)" /><path fill="#fff" d="M-190.07,19.93h6V14.09c-1.9,0-3.74,0-5.59,0-.12,0-.35.37-.35.57,0,1.08,0,2.15,0,3.23Z" transform="translate(214.08 -1.43)" /><path fill="#fff" d="M-185.19,29.43a17.43,17.43,0,0,1,.65-2.21,3.28,3.28,0,0,0-.28-3.07c-.09.82-.14,1.63-.29,2.42-.1.5-.38,1-.53,1.47a3.58,3.58,0,0,0,.53,3.22A9.3,9.3,0,0,1-185.19,29.43Z" transform="translate(214.08 -1.43)" /><path fill="#fff" d="M-191.24,31a4.22,4.22,0,0,0,.24-.86,2.78,2.78,0,0,0-.63-2.31,5.77,5.77,0,0,1,0,1.28c-.18.87-.43,1.73-.69,2.59a3.24,3.24,0,0,0,.45,3.17A6.53,6.53,0,0,1-191.24,31Z" transform="translate(214.08 -1.43)" /><path fill="#fff" d="M-182.69,14.1c-.14,0-.41.24-.41.37,0,1.8,0,3.59,0,5.51,1.1,0,2.07-.05,3,0a1.24,1.24,0,0,0,1.39-.94c.56-1.41,1.18-2.81,1.77-4.21.09-.22.16-.45.26-.77C-178.74,14.08-180.72,14.08-182.69,14.1Z" transform="translate(214.08 -1.43)" /><path fill="#fff" d="M-183.45,25.28c.08.67.12,1.25.21,1.82a7.12,7.12,0,0,1-.92,5.48,4.63,4.63,0,0,0,.24,5.54,4,4,0,0,0,.56.6,1.38,1.38,0,0,0,.12-.73c0-.87-.14-1.75-.12-2.62a15.34,15.34,0,0,1,1.26-6A3.33,3.33,0,0,0-183.45,25.28Z" transform="translate(214.08 -1.43)" /><path fill="#fff" d="M-190.11,29.06c.12,1.24.17,2.36.35,3.47a4.26,4.26,0,0,1-.8,3.24,5.35,5.35,0,0,0-1,3.53A4.38,4.38,0,0,0-190,42.43c.05-.75,0-1.46-.05-2.17a16.08,16.08,0,0,1,1.25-7.08A3.37,3.37,0,0,0-190.11,29.06Z" transform="translate(214.08 -1.43)" /><path fill="#fff" d="M-175.51,7.57c-5,0-10,0-15,0h-7.05c-2.7,0-5.4,0-8.1,0-.57,0-.79.15-.77.76,0,1,0,1.95,0,2.92a1.93,1.93,0,0,0,1.94,2c.33,0,.65,0,1,0h26.83a2,2,0,0,0,2-2.11c0-.9,0-1.81,0-2.7C-174.55,7.78-174.78,7.57-175.51,7.57ZM-200.66,11a.81.81,0,0,1-.88-.9.78.78,0,0,1,.86-.83.8.8,0,0,1,.87.89A.77.77,0,0,1-200.66,11Zm6.74,0c-.35-.05-.65-.42-.87-.58.07-.8.32-1.14.92-1.13a.78.78,0,0,1,.83.85C-193,10.72-193.39,11.08-193.92,11Zm6.81,0a.8.8,0,0,1-.87-.9.78.78,0,0,1,.8-.84c.62,0,.92.32.92.89A.79.79,0,0,1-187.11,11Zm6.75,0a.78.78,0,0,1-.85-.84.78.78,0,0,1,.75-.89c.67,0,1,.31,1,.82A.82.82,0,0,1-180.36,11Z" transform="translate(214.08 -1.43)" /><path fill="#fff" d="M-197.79,26.75a2.93,2.93,0,0,0-.44-2.65,21.69,21.69,0,0,1-.16,2.18A15.49,15.49,0,0,1-199,28a3.4,3.4,0,0,0,.34,3.05c.11-.92.16-1.83.32-2.72C-198.21,27.78-197.93,27.28-197.79,26.75Z" transform="translate(214.08 -1.43)" /><path fill="#fff" d="M-196.39,25.46a1.53,1.53,0,0,0-.4-.15c.06.6.07,1.12.16,1.63a7.4,7.4,0,0,1-1,5.77,4.63,4.63,0,0,0,1,6.06c0-.31,0-.5,0-.68a17.06,17.06,0,0,1,1.16-8.79A3.55,3.55,0,0,0-196.39,25.46Z" transform="translate(214.08 -1.43)" /><path fill="#fff" d="M-197.9,20c0-1.92,0-3.71,0-5.5,0-.14-.36-.37-.55-.38-1,0-1.95,0-2.92,0h-3c.83,2,1.6,3.75,2.39,5.55a.69.69,0,0,0,.52.33C-200.35,20-199.18,20-197.9,20Z" transform="translate(214.08 -1.43)" /></svg>
                                    </div>
                                </li>
                                <li className="flex items-center justify-between">
                                    <div className="flex items-center gap-2"><CheckCircle size={16} className="text-green-600" /> First Aid Kit</div>
                                    <div className="w-6 h-6 bg-red-600 flex items-center justify-center text-[10px] text-white rounded-sm">
                                        <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 47.13 47.02"><defs><style>.</style></defs><rect fill="#006838" width="47.13" height="47.02" rx="2.41" /><path fill="#fff" d="M44.09,47.21H5.91a3.12,3.12,0,0,1-3.12-3.12V5.91A3.12,3.12,0,0,1,5.91,2.79H44.09a3.12,3.12,0,0,1,3.12,3.12V44.09A3.12,3.12,0,0,1,44.09,47.21ZM5.91,3.27A2.64,2.64,0,0,0,3.27,5.91V44.09a2.64,2.64,0,0,0,2.64,2.64H44.09a2.64,2.64,0,0,0,2.64-2.64V5.91a2.64,2.64,0,0,0-2.64-2.64Z" transform="translate(-1.44 -1.49)" /><rect fill="#fff" x="6.45" y="19.53" width="34.22" height="7.96" /><rect fill="#fff" x="7.89" y="21.02" width="34.22" height="7.96" transform="translate(48.56 -1.49) rotate(90)" /></svg>
                                    </div>
                                </li>
                            </ul>
                            <button disabled={isSafetyEquipmentUploading.uploading} type="button" className="relative w-full flex items-center gap-2 bg-gray-50 border p-3 rounded-md hover:bg-gray-100 transition">
                                <Camera size={20} className="text-green-700" />
                                <span className="font-medium">Choose Photo</span>
                                <input required disabled={isSafetyEquipmentUploading.uploading} onChange={onSafetyEquepmentChange} className="absolute inset-0 opacity-0" type="file" accept="application/pdf, image/jpg, image/jpeg, image/avif, image/png, image/webp, video/*" />
                            </button>
                            {safetyEquipmentFiles.length > 0 && <div className="flex gap-2 bg-gray-400 p-4">
                                {
                                    safetyEquipmentFiles.slice(-5).map((safetyFile) => {
                                        if (safetyFile.type.includes("image")) {
                                            return (
                                                <div className="w-20 h-20 relative" key={safetyFile.key}>
                                                    <Image src={safetyFile.url} alt={safetyFile.key} width={80} height={80} className="w-full h-full" />

                                                    <Button type="button" onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        handleDeleteSafetyEquepment(safetyFile.key);
                                                    }} className="absolute right-0 top-0 h-5 w-5 p-2 cursor-pointer rounded-full bg-red-500 hover:bg-red-600">
                                                        <TrashIcon className="size-4 text-white" />
                                                    </Button>
                                                </div>
                                            )
                                        } else if (safetyFile.type.includes("video")) {
                                            return (
                                                <div key={safetyFile.key} className="w-20 h-20 relative">
                                                    <video className="w-20 h-20" src={safetyFile.url} muted width={80} height={80}></video>

                                                    <Button type="button" onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        handleDeleteSafetyEquepment(safetyFile.key);
                                                    }} className="absolute right-0 top-0 h-5 w-5 p-2 cursor-pointer rounded-full bg-red-500 hover:bg-red-600">
                                                        <TrashIcon className="size-4 text-white" />
                                                    </Button>
                                                </div>
                                            )
                                        } else if (safetyFile.type.includes("pdf")) {
                                            return (
                                                <div key={safetyFile.key} className="w-20 h-20 overflow-hidden relative">
                                                    <iframe src={safetyFile.url} width="100%" height="100%" className=" custom-scrollbar">
                                                        <p>This browser does not support inline PDFs. Please download the PDF to view it: <a href="path/to/your/file.pdf">Download PDF</a></p>
                                                    </iframe>

                                                    <Button type="button" onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        handleDeleteSafetyEquepment(safetyFile.key);
                                                    }} className="absolute right-0 top-0 h-5 w-5 p-2 cursor-pointer rounded-full bg-red-500 hover:bg-red-600">
                                                        <TrashIcon className="size-4 text-white" />
                                                    </Button>
                                                </div>
                                            )
                                        }
                                    })
                                }
                            </div>}
                            {
                                isSafetyEquipmentUploading.uploading && (
                                    <div className="flex items-center">
                                        <div className="flex-1 h-2 w-full min-w-25 rounded-full bg-gray-300">
                                            <div className="bg-blue-600 transition-all" style={{
                                                width: `${isSafetyEquipmentUploading.progress}%`,
                                                height: "100%"
                                            }}></div>
                                        </div>
                                        <span>
                                            {Math.round(isSafetyEquipmentUploading.progress)} %
                                        </span>
                                    </div>
                                )
                            }
                        </div>

                        {/* 6. Floor Plan */}
                        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between">
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="bg-[#4a6741] text-white min-w-8 h-8 rounded-full flex items-center justify-center font-bold">6</span>
                                    <h3 className="font-bold text-lg text-[#3a5033]">Floor Plan / Project Visuals</h3>
                                </div>
                                <p className="font-semibold text-sm mb-4">Upload Floor Plan or Project Video</p>
                                <ul className="space-y-2 mb-6 text-sm">
                                    <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-600" /> Updated floor plan (if available) <span className="text-gray-400">or</span></li>
                                    <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-600" /> Hand sketch floor plan photo <span className="text-gray-400">or</span></li>
                                    <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-600" /> Complete project walkthrough video</li>
                                </ul>
                            </div>
                            <div>
                                <button disabled={isProjectVisualsUploading.uploading} type="button" className="relative w-full flex items-center gap-2 bg-gray-50 border p-3 rounded-md hover:bg-gray-100 transition mb-3">
                                    <Camera size={20} className="text-green-700" />
                                    <span className="font-medium">Choose Photo / Video</span>
                                    <input required disabled={isProjectVisualsUploading.uploading} onChange={onProjectVisualsChange} className="absolute inset-0 opacity-0" type="file" name="project-visuals" id="project-visuals" />
                                </button>
                                <p className="text-[10px] text-gray-400 italic leading-tight">
                                    While making the video, try to make it step by step starting from the front door. And through the video, you should be able to understand where each thing in the project like doors, windows, furniture etc. is located.
                                </p>
                            </div>
                            {projectVisualsFiles.length > 0 && <div className="flex p-4 bg-gray-400">
                                {
                                    projectVisualsFiles.slice(-5).map((projectVisFile) => {
                                        if (projectVisFile.type.includes("image")) {
                                            return (
                                                <div className="w-20 h-20 relative" key={projectVisFile.key}>
                                                    <Image src={projectVisFile.url} alt={projectVisFile.key} width={80} height={80} className="w-full h-full" />

                                                    <Button type="button" onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        handleDeleteProjectVisualsFile(projectVisFile.key);
                                                    }} className="absolute right-0 top-0 h-5 w-5 p-2 cursor-pointer rounded-full bg-red-500 hover:bg-red-600">
                                                        <TrashIcon className="size-4 text-white" />
                                                    </Button>
                                                </div>
                                            )
                                        } else if (projectVisFile.type.includes("video")) {
                                            return (
                                                <div key={projectVisFile.key} className="w-20 h-20 relative">
                                                    <video className="w-20 h-20" src={projectVisFile.url} muted width={80} height={80}></video>

                                                    <Button type="button" onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        handleDeleteProjectVisualsFile(projectVisFile.key);
                                                    }} className="absolute right-0 top-0 h-5 w-5 p-2 cursor-pointer rounded-full bg-red-500 hover:bg-red-600">
                                                        <TrashIcon className="size-4 text-white" />
                                                    </Button>
                                                </div>
                                            )
                                        } else if (projectVisFile.type.includes("pdf")) {
                                            return (
                                                <div key={projectVisFile.key} className="w-20 h-20 overflow-hidden relative">
                                                    <iframe src={projectVisFile.url} width="100%" height="100%" className=" custom-scrollbar">
                                                        <p>This browser does not support inline PDFs. Please download the PDF to view it: <a href="path/to/your/file.pdf">Download PDF</a></p>
                                                    </iframe>

                                                    <Button type="button" onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        handleDeleteProjectVisualsFile(projectVisFile.key);
                                                    }} className="absolute right-0 top-0 h-5 w-5 p-2 cursor-pointer rounded-full bg-red-500 hover:bg-red-600">
                                                        <TrashIcon className="size-4 text-white" />
                                                    </Button>
                                                </div>
                                            )
                                        }
                                    })
                                }
                            </div>}
                            {
                                isProjectVisualsUploading.uploading && (
                                    <div className="flex items-center">
                                        <div className="flex-1 h-2 w-full min-w-25 rounded-full bg-gray-300">
                                            <div className="bg-blue-600 transition-all" style={{
                                                width: `${isProjectVisualsUploading.progress}%`,
                                                height: "100%"
                                            }}></div>
                                        </div>
                                        <span>
                                            {Math.round(isProjectVisualsUploading.progress)} %
                                        </span>
                                    </div>
                                )
                            }
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-6">
                        <button disabled={isSubmitting} className="w-full bg-[#eb4913] text-white font-bold py-4 rounded-lg cursor-pointer shadow-lg hover:bg-[#247c04] transition-colors">
                            {isSubmitting ? "Submitting... " : "Submit Information"}
                        </button>
                    </div>

                    {/* Footer Info */}
                    <div className="bg-[#e8f0e4] p-4 rounded-lg flex justify-center items-center gap-3 border border-green-200">
                        <CheckCircle size={20} className="text-green-700 shrink-0" />
                        <p className="text-sm font-medium text-[#3a5033]">
                            Once we receive this information, we will start working on your evacuation plan immediately.
                        </p>
                    </div>

                </form>
            </div>
        </div>
    );
}
