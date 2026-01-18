"use client"

import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import DropzoneComponent from "./dropzone-component"
import { Button } from "@/components/ui/button"
import { CloudUpload, Trash } from "lucide-react"
import { toast } from "sonner"
import Image from "next/image"

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

interface BannerImage {
  id: string
  key: string
  url: string
}

export function HeroSlider() {
  const [dropFile, setDropFile] = React.useState<DropFile | null>(null);
  const [bannerImages, setBannerImages] = React.useState<Array<BannerImage>>([]);
  const [isDeleting, setIsDeleting] = React.useState(false);

  React.useEffect(() => {
    fetchBannerImages()
  }, [dropFile]);

  async function fetchBannerImages() {
    try {
      const response = await fetch('/api/v1/banner/images');
      if (!response.ok) {
        throw new Error("Faild to fetched banner images");
      }
      const bannerImagesRes = await response.json()
      if (bannerImagesRes.images?.length) {
        setBannerImages(bannerImagesRes.images);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  }


  async function deleteBannerImage(id: string, key: string) {
    setIsDeleting(true);
    try {
      const response = await fetch("/api/v1/s3/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ key, id })
      });

      if (!response.ok) {
        throw new Error("Failed to delete banner image");
      }

      const imageRes: { message: string, image: { id: string, key: string } } = await response.json();
      const { image } = imageRes;

      if (image.id) {
        toast.success("Successfully Deleted");
        setBannerImages((prevImgs) => {
          const updateImages = prevImgs.filter((img) => img.id !== image.id);
          return updateImages;
        });
      }
    } catch (error: any) {
      toast.error(`Error: ${error.message}`);
    } finally {
      setIsDeleting(false);
    }
  }

  async function uploadToS3() {
    if (!dropFile) {
      toast.error("No file to upload.");
    } else {
      try {
        // Placeholder for actual upload logic
        const response = await fetch('/api/v1/s3/upload', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fileName: dropFile?.file.name,
            contentType: dropFile?.file.type,
            size: dropFile?.file.size,
          }),
        });
        if (!response.ok) {
          setDropFile((prev) => prev ? { ...prev, error: true, uploading: false } : prev);
          throw new Error(`Upload failed with status ${response.status}`);
        }

        const { presignedUrl, key } = await response.json();

        await new Promise<void>((resolve, reject) => {
          const xhr = new XMLHttpRequest();

          xhr.upload.onprogress = (event) => {
            if (event.lengthComputable) {
              const progress = (event.loaded / event.total) * 100;
              setDropFile((prev) => prev ? { ...prev, progress, uploading: true } : prev);
            }
          };

          xhr.onload = () => {
            if (xhr.status === 200 || xhr.status === 204) {
              setDropFile(prev => prev ? { ...prev, uploading: false, error: false, key } : prev)
              toast.success("File uploaded successfully");
              resolve();
            } else {
              setDropFile((prev) => prev ? { ...prev, error: true, progress: 0, uploading: false } : prev);
              reject(new Error(`Upload failed with status ${xhr.status}`));
            }
          }

          xhr.onerror = () => {
            setDropFile((prev) => prev ? { ...prev, error: true, progress: 0, uploading: false } : prev);
            reject(new Error("Network error during upload"));
          }

          xhr.open("PUT", presignedUrl);
          xhr.setRequestHeader("Content-Type", dropFile?.file.type);
          xhr.send(dropFile?.file);
        });

        if (dropFile.objectUrl) {
          URL.revokeObjectURL(dropFile.objectUrl)
          setDropFile(null);
        }

      } catch (error) {
        toast.error("Failed to upload file.");
      }
    }
  }

  // console.log("bannerImages", bannerImages);
  return (
    <div className="px-16">
      <Carousel className="w-full">
        <CarouselContent>
          <CarouselItem className="w-full h-100">
            <Card className="h-full">
              <CardContent className="h-full">
                <DropzoneComponent dropFile={dropFile} setDropFile={setDropFile} />
              </CardContent>
            </Card>
          </CarouselItem>
          {bannerImages.map((image) => (
            <CarouselItem key={image.id} className="w-full h-100">
              <div className="p-1 w-full h-full">
                <Card className="w-full h-full relative flex items-center">
                  <Button onClick={() => deleteBannerImage(image.id, image.key)} title="Delete Banner" className="w-10 h-10 flex text-center items-center rounded-full absolute top-2 right-3 bg-red-500 hover:bg-red-600 cursor-pointer">
                    <Trash className="size-6 text-white" />
                  </Button>
                  {
                    isDeleting && <p className="text-center text-red-500">Deleting...</p>
                  }
                  <Image src={image.url} alt={image.key} className="w-full h-full object-cover" width={1000} height={700} />
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      {
        dropFile && (
          <div className="flex items-center justify-center mt-4">
            <Button disabled={dropFile.uploading} onClick={uploadToS3} className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 active:outline"><CloudUpload className="size-5" /> Upload</Button>
          </div>
        )
      }
    </div >
  )
}