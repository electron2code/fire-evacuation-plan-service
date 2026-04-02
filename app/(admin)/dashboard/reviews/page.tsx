"use client";
import { useRef, useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function ReviewPage() {
    const [uploading, setUploading] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
    const [images, setImages] = useState<Array<{ id: string; key: string; url: string }>>([]);
    const [loadingImages, setLoadingImages] = useState(false);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Fetch images for gallery
    const fetchImages = async () => {
        setLoadingImages(true);
        try {
            const res = await fetch("/api/v1/review/image?limit=50&page=1");
            if (!res.ok) throw new Error("Failed to fetch images");
            const data = await res.json();
            setImages(data.images || []);
        } catch (err: any) {
            toast.error(err.message || "Failed to load images");
        } finally {
            setLoadingImages(false);
        }
    };

    useEffect(() => {
        fetchImages();
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!file) return;
        setUploading(true);
        try {
            // Step 1: Get presigned URL
            const res = await fetch("/api/v1/review/image", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    fileName: file.name,
                    contentType: file.type,
                    size: file.size,
                }),
            });
            if (!res.ok) throw new Error("Failed to get upload URL");
            const { presignedUrl, key } = await res.json();

            // Step 2: Upload file to S3
            const uploadRes = await fetch(presignedUrl, {
                method: "PUT",
                headers: { "Content-Type": file.type },
                body: file,
            });
            if (!uploadRes.ok) throw new Error("Upload failed");

            setUploadedUrl(`${process.env.NEXT_PUBLIC_BUCKET_URL}/${key}`); // You may need to adjust this URL based on your S3 setup
            toast.success("Screenshot uploaded successfully!");
            setFile(null);
            if (inputRef.current) inputRef.current.value = "";
            // Refresh gallery
            fetchImages();
        } catch (err: any) {
            toast.error(err.message || "Upload failed");
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async (id: string, key: string) => {
        if (!window.confirm("Are you sure you want to delete this image?")) return;
        setDeletingId(id);
        try {
            const res = await fetch("/api/v1/review/image", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, key }),
            });
            if (!res.ok) throw new Error("Failed to delete image");
            toast.success("Image deleted");
            setImages((prev) => prev.filter((img) => img.id !== id));
        } catch (err: any) {
            toast.error(err.message || "Delete failed");
        } finally {
            setDeletingId(null);
        }
    };

    return (
        <div className="max-w-4xl mx-auto py-10">
            <Card>
                <CardHeader>
                    <CardTitle>Upload Fiverr Review Screenshot</CardTitle>
                </CardHeader>
                <CardContent>
                    <Input
                        ref={inputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        disabled={uploading}
                    />
                </CardContent>
                <CardFooter className="flex flex-col gap-4 items-start">
                    <Button onClick={handleUpload} disabled={!file || uploading}>
                        {uploading ? "Uploading..." : "Upload Screenshot"}
                    </Button>
                    {uploadedUrl && (
                        <div className="mt-4">
                            <span className="block mb-2 text-sm text-muted-foreground">Preview:</span>
                            <img src={uploadedUrl} alt="Uploaded Review" className="max-h-64 rounded border" />
                        </div>
                    )}
                </CardFooter>
            </Card>

            <div className="mt-10">
                <h3 className="text-lg font-semibold mb-4">Gallery</h3>
                {loadingImages ? (
                    <div>Loading images...</div>
                ) : images.length === 0 ? (
                    <div>No review screenshots uploaded yet.</div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {images.map((img) => (
                            <div key={img.id} className="relative group border rounded-lg overflow-hidden shadow-sm">
                                <img src={img.url} alt="Review Screenshot" className="w-full h-64 object-contain bg-white" />
                                <button
                                    className="absolute top-2 right-2 bg-red-600 text-white rounded px-2 py-1 text-xs opacity-80 hover:opacity-100 transition"
                                    onClick={() => handleDelete(img.id, img.key)}
                                    disabled={deletingId === img.id}
                                >
                                    {deletingId === img.id ? "Deleting..." : "Delete"}
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}