"use client";

import { useState } from "react";
import DropzoneComponent from "./dropzone-component";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface DropFile {
    id: string;
    file: File;
    uploading: boolean;
    progress: number;
    key?: string;
    isDeleting: boolean;
    error: boolean;
    objectUrl?: string;
}

export default function UploadPortfolio() {
    const [dropFile, setDropFile] = useState<DropFile | null>(null);

    async function uploadPortfolioToS3() {
        if (!dropFile) {
            toast.error("No file to upload.");
        } else {
            try {
                // Placeholder for actual upload logic
                const response = await fetch('/api/v1/portfolio/images', {
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
    return (
        <div className="h-full w-full max-w-md">
            <DropzoneComponent dropFile={dropFile} setDropFile={setDropFile} />
            <div className="w-full flex justify-center py-3">
                {
                    dropFile && <Button disabled={dropFile.uploading} onClick={uploadPortfolioToS3} className="dark:bg-blue-500">Upload</Button>
                }
            </div>
        </div>
    )
}