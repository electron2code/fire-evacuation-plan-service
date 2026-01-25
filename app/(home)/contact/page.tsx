"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Clock,
    Mail,
    Phone,
    Upload,
    Loader2,
    X
} from "lucide-react";
import { useState, useRef } from "react";
import { toast } from "sonner";
import Image from "next/image";

import { createContactSubmission, deleteContactImage } from "@/actions/contact";
import Link from "next/link";
import ContactCards from "@/components/web/contact-cards";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        fullName: "",
        phoneNumber: "",
        email: "",
        propertyAddress: "",
        serviceCategory: "",
        serviceType: "",
        notes: ""
    });
    const [uploading, setUploading] = useState(false);
    const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
    const [uploadedImageKey, setUploadedImageKey] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > 5 * 1024 * 1024) {
            toast.error("File size must be less than 5MB");
            return;
        }

        setUploading(true);
        try {
            // Get presigned URL
            const res = await fetch('/api/v1/public/upload', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    fileName: file.name,
                    contentType: file.type,
                    size: file.size
                })
            });

            if (!res.ok) throw new Error('Failed to get upload URL');

            const { presignedUrl, key } = await res.json();

            // Upload to S3
            await new Promise<void>((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.onload = () => {
                    if (xhr.status === 200 || xhr.status === 204) {
                        toast.success("File uploaded successfully");
                        resolve();
                    } else {
                        reject(new Error(`Upload failed with status ${xhr.status}`));
                    }
                }

                xhr.onerror = () => {
                    reject(new Error("Network error during upload"));
                }

                xhr.open("PUT", presignedUrl);
                xhr.setRequestHeader("Content-Type", file.type);
                xhr.send(file);
            });

            const imageUrl = `${process.env.NEXT_PUBLIC_BUCKET_URL}/${key}`;
            setUploadedImageUrl(imageUrl);
            setUploadedImageKey(key);
            toast.success("Image uploaded successfully");

        } catch (error) {
            console.error(error);
            toast.error("Failed to upload image");
            setUploadedImageUrl(null);
            setUploadedImageKey(null);
        } finally {
            setUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    const removeImage = async () => {
        if (!uploadedImageKey) return;

        try {
            const keyToRemove = uploadedImageKey;
            setUploadedImageUrl(null);
            setUploadedImageKey(null);

            const res = await deleteContactImage(keyToRemove);
            if (res.error) {
                // If server deletion fails, we might want to inform the user, 
                // but since we already cleared the UI, reverting might be confusing.
                // For now, logging the error and showing a specific toast is better.
                console.error("Failed to delete image from server:", res.error);
                toast.error("Image removed from form, but server cleanup failed");
                return;
            }
            toast.success("Image removed successfully");
        } catch (error) {
            console.error(error);
            toast.error("Failed to remove image");
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Save to database
        const result = await createContactSubmission({
            ...formData,
            imageKey: uploadedImageKey
        });

        if (result.error) {
            toast.error("Failed to save submission, but proceeding to WhatsApp");
            console.error(result.error);
        } else {
            // toast.success("Request saved successfully!"); // Optional: don't interrupt flow
        }

        let message = `*New Service Request*\n\n` +
            `*Name:* ${formData.fullName}\n` +
            `*Phone:* ${formData.phoneNumber}\n` +
            `*Email:* ${formData.email}\n` +
            `*Address:* ${formData.propertyAddress}\n` +
            `*Category:* ${formData.serviceCategory}\n` +
            `*Type:* ${formData.serviceType}\n` +
            `*Notes:* ${formData.notes}`;

        if (uploadedImageUrl) {
            message += `\n\n*Attached Photo:* ${uploadedImageUrl}`;
        }

        const encodedMessage = encodeURIComponent(message);
        const phoneNumber = "+8801601770053";
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

        window.open(whatsappUrl, '_blank');
        setFormData({
            fullName: "",
            phoneNumber: "",
            email: "",
            propertyAddress: "",
            serviceCategory: "",
            serviceType: "",
            notes: ""
        });
        setUploadedImageUrl(null);
        setUploadedImageKey(null);
    };

    return (
        <div className="bg-gray-50 min-h-screen py-12 px-4 md:px-6">
            <div className="max-w-7xl mx-auto space-y-12">

                {/* Top Section: Form + Info Grid */}
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">

                    {/* Left Column: Contact Form */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-[#f25f29] mb-2">To begin your work, I will need the following information:</h2>
                            <p className="text-gray-600 text-sm">Fill out the form below and we'll contact you within 24 hours</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-gray-700">Full Name *</label>
                                    <Input
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        placeholder="John Smith"
                                        className="bg-gray-50 border-gray-200"
                                        required
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-gray-700">Phone Number *</label>
                                    <Input
                                        name="phoneNumber"
                                        value={formData.phoneNumber}
                                        onChange={handleChange}
                                        placeholder="(555) 123-4567"
                                        className="bg-gray-50 border-gray-200"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-700">Email Address *</label>
                                <Input
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="john@example.com"
                                    className="bg-gray-50 border-gray-200"
                                    required
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-700">Give your project address.</label>
                                <Input
                                    name="propertyAddress"
                                    value={formData.propertyAddress}
                                    onChange={handleChange}
                                    placeholder="123 Main St, New York, NY 10001"
                                    className="bg-gray-50 border-gray-200"
                                />
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-gray-700">Service Category</label>
                                    <select
                                        name="serviceCategory"
                                        value={formData.serviceCategory}
                                        onChange={handleChange}
                                        className="flex h-9 w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        <option value="">Select category</option>
                                        <option value="Fire Evacuation Plan">Fire Evacuation Plan</option>
                                        <option value="Safety Consultation">Safety Consultation</option>
                                    </select>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-gray-700">Service Type</label>
                                    <select
                                        name="serviceType"
                                        value={formData.serviceType}
                                        onChange={handleChange}
                                        className="flex h-9 w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        <option value="">Select service type</option>
                                        <option value="Residential">Residential</option>
                                        <option value="Commercial">Commercial</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-700">Additional Project Notes</label>
                                <Textarea
                                    name="notes"
                                    value={formData.notes}
                                    onChange={handleChange}
                                    placeholder="Tell us more about your project..."
                                    className="bg-gray-50 border-gray-200 min-h-30"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-700">Upload Photos (Optional)</label>
                                <p className="text-sm text-gray-500"> Updated floor plan (If available) Or, a picture of a hand sketch floor
                                    plan Or send me the complete video of your project. While making the
                                    video, try to make it step by step starting from the front door. And
                                    through the video, you should be able to understand where each thing
                                    in the project like doors, windows, furniture etc. is located.</p>
                                <div className="flex items-center gap-3">
                                    {uploadedImageUrl && <Image src={uploadedImageUrl} className="object-cover w-24 h-24 rounded-md" alt="Upload" width={100} height={100} />}
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        className="hidden"
                                        accept="image/*"
                                        onChange={handleFileSelect}
                                    />
                                    {uploadedImageUrl ? (
                                        <div className="flex items-center gap-2 p-2 border rounded-md bg-green-50 text-green-700">
                                            <span className="text-xs font-medium">Image Attached</span>
                                            <button type="button" onClick={removeImage} className="hover:text-green-900">
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ) : (
                                        <Button
                                            type="button"
                                            variant="outline"
                                            className="text-gray-600 gap-2"
                                            onClick={() => fileInputRef.current?.click()}
                                            disabled={uploading}
                                        >
                                            {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                                            {uploading ? "Uploading..." : "Choose Photos"}
                                        </Button>
                                    )}
                                    {!uploadedImageUrl && !uploading && <span className="text-sm text-gray-500">No files selected</span>}
                                </div>
                            </div>

                            <Button disabled={uploading} type="submit" className="w-full bg-[#f25f29] hover:bg-[#d64d1c] text-white font-bold py-6 text-base">
                                Submit Request
                            </Button>

                            <p className="text-xs text-center text-gray-500">
                                By submitting this form, you agree to be contacted by Fire Evacuation Designer regarding your inquiry.
                            </p>
                        </form>
                    </div>

                    {/* Right Column: Info & Features */}
                    <div className="space-y-8">
                        {/* Why Choose Us */}
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Why Choose Evacuation Plan Service?</h3>
                            <ul className="space-y-3">
                                {[
                                    "15+ Years of Professional Expertise",
                                    "With over 15 years of hands-on experience in fire evacuation planning, we deliver solutions you can trust.",
                                    "Fast & Deadline-Focused Delivery",
                                    "We complete every project quickly and efficiently, always meeting your deadlines.",
                                    "Commitment to Excellence",
                                    "Dedicated to providing outstanding service and building long-term customer satisfaction.",
                                    "Unlimited Revisions",
                                    "Your satisfaction comes first — we offer unlimited revisions until the plan is exactly right.",
                                    "Rapid Turnaround",
                                    "Swift response times without compromising safety, accuracy, or quality.",
                                    "Exceptional Quality Standards",
                                    "Premium-quality evacuation plans developed with precision, care, and industry best practices.",
                                    "Free Future Updates After Project Completion",
                                    "Even after the project is completed, any future changes or updates will be provided free of charge whenever needed."
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700 odd:text-base odd:font-bold">
                                        {(i + 1) % 2 !== 0 && <div className="mt-1 w-1.5 h-1.5 rounded-full bg-[#f25f29] shrink-0" />}
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Business Hours Card */}
                        <div className="bg-[#fff1f0] border border-[#ffdbd6] rounded-xl p-6 relative overflow-hidden">
                            <div className="flex gap-4">
                                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0 text-[#f25f29]">
                                    <Clock className="w-5 h-5" />
                                </div>
                                <div className="space-y-1">
                                    <h4 className="font-bold text-gray-900">Business Hours</h4>
                                    <div className="text-sm text-gray-600 space-y-0.5">
                                        <p>All day 06:00 AM to 10:00 PM</p>
                                        <p className="text-[#f25f29] font-medium pt-1">Emergency Service: 24/7</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* What to Expect Card */}
                        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                            <h4 className="text-[#f25f29] font-bold mb-4">What You Will Receive After Project Completion</h4>
                            <ul className="space-y-4">
                                {[
                                    "Complete Emergency Evacuation Plan",
                                    "A fully developed, accurate, and ready-to-use emergency evacuation plan tailored to your requirements.",
                                    "Editable Source Files",
                                    "All original editable files will be provided, including PDF, SVG, AI, EPS, and other required formats for future updates.",
                                    "Print-Ready High-Resolution Files",
                                    "High-quality, print-ready JPG files with high resolution, suitable for large-format printing and display."
                                ].map((step, i) => (
                                    <li key={i} className="flex gap-3">
                                        {(i + 1) % 2 !== 0 && <div className="w-6 h-6 rounded-full bg-[#f25f29] text-white flex items-center justify-center text-xs font-bold shrink-0">
                                            {(i === 0) && 1}
                                            {(i === 2) && 2}
                                            {(i === 4) && 3}
                                        </div>}
                                        <p className="text-sm text-gray-600 pt-0.5">{step}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
