"use client";
import { useEffect, useState } from "react";

import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import DropzoneComponent from "./dropzone-component"
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Image from "next/image";
import { Trash } from "lucide-react";

export interface DropFile {
    id: string;
    file: File;
    uploading: boolean;
    progress: number;
    key?: string;
    isDeleting: boolean;
    error: boolean;
    objectUrl?: string;
}

export default function ServiceImageSlider({ setServicImagesKeys, initialImages }: { setServicImagesKeys: React.Dispatch<React.SetStateAction<Array<string>>>, initialImages?: { key: string }[] }) {
    const [serviceImages, setServiceImages] = useState<Array<any>>(initialImages || []);
    const [serviceImage, setServiceImage] = useState<DropFile | null>(null);
    useEffect(() => {
        if (initialImages && initialImages.length > 0) {
            setServiceImages(initialImages);
            // setServicImagesKeys(initialImages.map(img => img.key));
        } else {
            setServiceImages(getServiceImagesFromLocalStorage());
        }
    }, [initialImages])

    function getServiceImagesFromLocalStorage(): any {
        const serviceImagesJSON = localStorage.getItem("serviceImages");
        if (serviceImagesJSON) {
            const serviceImages = JSON.parse(serviceImagesJSON);
            if (Array.isArray(serviceImages)) {
                return serviceImages
            }
            return []
        }
        return []
    }

    function putServiceImagesToLocalStorage(serviceImage: DropFile) {
        const existingServiceImages = getServiceImagesFromLocalStorage();

        if (existingServiceImages.length) {
            const updatedServiceImages = [...existingServiceImages, serviceImage];
            localStorage.setItem("serviceImages", JSON.stringify(updatedServiceImages));
        } else {
            localStorage.setItem("serviceImages", JSON.stringify([serviceImage]));
        }
    }

    function clearServiceImagesFromLocalhost() {
        localStorage.removeItem("serviceImages");
    }

    async function uploadToS3() {
        if (serviceImages.length > 5) {
            toast.error("You can upload maxium of 5 image");
            return
        }
        if (!serviceImage) {
            toast.error("No file to upload.");
        } else {
            try {
                // Placeholder for actual upload logic
                const response = await fetch('/api/v1/service/images', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        fileName: serviceImage?.file.name,
                        contentType: serviceImage?.file.type,
                        size: serviceImage?.file.size,
                    }),
                });
                if (!response.ok) {
                    setServiceImage((prev) => prev ? { ...prev, error: true, uploading: false } : prev);
                    throw new Error(`Upload failed with status ${response.status}`);
                }

                const { presignedUrl, key } = await response.json();

                await new Promise<void>((resolve, reject) => {
                    const xhr = new XMLHttpRequest();

                    xhr.upload.onprogress = (event) => {
                        if (event.lengthComputable) {
                            const progress = (event.loaded / event.total) * 100;
                            setServiceImage((prev) => prev ? { ...prev, progress, uploading: true } : prev);
                        }
                    };

                    xhr.onload = () => {
                        if (xhr.status === 200 || xhr.status === 204) {
                            setServiceImage(prev => prev ? { ...prev, uploading: false, error: false, key: key } : prev)
                            console.log(key);
                            setServiceImages((prev) => [...prev, { ...serviceImage, key }]);
                            putServiceImagesToLocalStorage({ ...serviceImage, key });
                            setServiceImage({ ...serviceImage, key });
                            setServicImagesKeys((prev) => [...prev, key]);
                            toast.success("File uploaded successfully");
                            resolve();
                        } else {
                            setServiceImage((prev) => prev ? { ...prev, error: true, progress: 0, uploading: false } : prev);
                            reject(new Error(`Upload failed with status ${xhr.status}`));
                        }
                    }

                    xhr.onerror = () => {
                        setServiceImage((prev) => prev ? { ...prev, error: true, progress: 0, uploading: false } : prev);
                        reject(new Error("Network error during upload"));
                    }

                    xhr.open("PUT", presignedUrl);
                    xhr.setRequestHeader("Content-Type", serviceImage?.file.type);
                    xhr.send(serviceImage?.file);
                });

                if (serviceImage.objectUrl) {
                    URL.revokeObjectURL(serviceImage.objectUrl)
                    setServiceImage(null);
                }

            } catch (error) {
                toast.error("Failed to upload file.");
            }
        }
    }

    async function deleteServiceImage(imageKey: string) {
        try {
            const response = await fetch("/api/v1/service/images", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ key: imageKey }),
            });

            if (!response.ok) {
                throw new Error("Something went wrong");
            }

            const deletedRes = await response.json();

            toast.success("Deleted successfully");
            const withoutDeletedImage = serviceImages.filter((img) => img.key !== imageKey);
            setServiceImages(withoutDeletedImage);
            setServicImagesKeys(withoutDeletedImage.map(img => img.key));
        } catch (error: any) {
            toast.error(error.message);
        }
    }
    return (
        <div>
            <Carousel className="w-full min-w-sm px-10">
                <CarouselContent className="w-full">
                    <CarouselItem className="w-full">
                        <div className="p-1 w-full">
                            <Card className="w-full h-100">
                                <DropzoneComponent dropFile={serviceImage} setDropFile={setServiceImage} />
                            </Card>
                        </div>
                    </CarouselItem>
                    {serviceImages.map((image, index) => (
                        <CarouselItem key={index}>
                            <div className="p-1 w-full">
                                <Card className="w-full h-100 relative">
                                    <Button onClick={(e) => {
                                        e.stopPropagation();
                                        deleteServiceImage(image.key)
                                    }} type="button" title="Delete" className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white size-10 flex items-center justify-center rounded-full text-center"><Trash className="size-6" /></Button>
                                    <Image className="w-full h-full object-contain" src={image.key ? `${process.env.NEXT_PUBLIC_BUCKET_URL}/${image.key}` : image.objectUrl ? image.key : " "} width={1000} height={700} alt="" />
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
            {
                serviceImage && (
                    <Button type="button" onClick={uploadToS3} className="w-full bg-blue-500 text-gray-100"> Banner {serviceImages.length}</Button>
                )
            }
        </div>
    )
}
