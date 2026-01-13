"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trash } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface PortfolioImage {
    id: string,
    key: string,
    url: string
}

export default function PortfolioGallery() {
    const [portfolioImages, setPortfolioImages] = useState<Array<PortfolioImage>>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [deletingId, setDeletingId] = useState("");

    useEffect(() => {
        const fetchPortfolioImages = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`/api/v1/portfolio/images?limit=${20}&page=${1}`);

                if (!response.ok) {
                    console.log("Error fetching portfolio, status:", response.status);
                    toast.error(`Error fetching portfolio, status: ${response.status}`);
                }

                const portfolioImagesRes = await response.json();
                console.log(portfolioImagesRes);

                if (portfolioImagesRes.images?.length) {
                    setPortfolioImages(portfolioImagesRes.images);
                }
            } catch (error: any) {
                toast.error("Something went wrong", error.message)
            } finally {
                setIsLoading(false);
            }
        }
        fetchPortfolioImages();
    }, [])


    async function deletePortFolioImage({ id, key }: { id: string, key: string }) {
        setIsDeleting(true);
        setDeletingId(id);
        try {
            const response = await fetch("/api/v1/portfolio/images/", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ id, key })
            });

            if (!response.ok) {
                toast.error(`Something went wrong, status:${response.status}`)
            }

            const { message } = await response.json();
            toast.success(message);

            setPortfolioImages((prevPortfolioImages) => {
                const updatedPortfolioImages = prevPortfolioImages.filter((img) => {
                    return img.id !== id
                });

                return updatedPortfolioImages;
            })
        } catch (error) {
            toast.error("Something went worng when delete portfolio");
        } finally {
            setIsDeleting(false);
            setDeletingId("");
        }
    }

    if (isLoading) {
        return (
            <div className="w-full min-h-screen relative">
                <svg className="mr-3 size-5 animate-spin absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" viewBox="0 0 24 24">
                </svg>
            </div>
        )
    }
    return (
        <div className="w-full pt-10 px-4 md:px-6 columns-1 sm:colums-2 md:columns-3 lg:columns-4">
            {
                portfolioImages.map((image) => (
                    <Card className="p-0 rounded-none border-0 border-transparent m-0 my-4 w-fit h-fit bg-transparent relative" key={image.id}>
                        {isDeleting && deletingId === image.id && <div className="w-full h-full bg-black/30 absolute top-0 left-0 right-0 bottom-0 z-1 flex justify-center items-center">
                            <span>Deleting...</span>
                        </div>}
                        <Button disabled={isDeleting} onClick={() => deletePortFolioImage({ id: image.id, key: image.key })} title="Delete Portfolio" className="cursor-pointer w-10 h-10 bg-red-500 hover:bg-red-600 text-gray-300 rounded-full flex items-center justify-center absolute z-5 top-2 right-2">
                            <Trash className="size-6" />
                        </Button>
                        <Image src={image.url} unoptimized className="w-full h-full rounded md:rounded-xl hover:scale-105 transition-all" alt="" width={300} height={350} />
                    </Card>
                ))
            }
        </div>
    )
}