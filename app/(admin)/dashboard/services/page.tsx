"use client";

import { buttonVariants } from "@/components/ui/button";
import ServiceImageSlider from "@/components/web/dashboard/service-image-slider";
import ServiceUploadForm from "@/components/web/dashboard/service-upload-form";
import clsx from "clsx";
import Link from "next/link";
import { useState } from "react";

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

export default function ServicesPage() {
  const [serviceImagesKeys, setServiceImagesKey] = useState<Array<string>>([]);

  return (
    <div className="w-full px-4 md:px-6">
      <div className="py-10 flex justify-center">
        <Link className="text-blue-600 underline text-base" href={"/dashboard/services/all-services"}>All Services</Link>
      </div>
      <div className="pt-5 px-4 text-center">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 dark:text-gray-500">Creare A service</h2>
      </div>
      <div className="px-20">
        <ServiceImageSlider setServicImagesKeys={setServiceImagesKey} />
      </div>
      <ServiceUploadForm serviceImagesKeys={serviceImagesKeys} />
    </div>
  )
}
