"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ServiceFormSchema, ServiceFormValues } from "@/schema/schema";
import { updateServiceAction } from "@/actions/update-service";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import ServiceImageSlider from "./service-image-slider";

// Define strict types for the initial data to match Prisma result
interface ServiceTier {
    id: string;
    type: "BASIC" | "STANDARD" | "PREMIUM";
    title: string;
    description: string;
    price: number;
}

interface ServiceData {
    id: string;
    title: string;
    language: string;
    description: string;
    images: { key: string }[];
    tiers: ServiceTier[];
}

export default function ServiceEditForm({ service }: { service: ServiceData }) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [imageKeys, setImageKeys] = useState<string[]>(service.images.map(img => img.key));
    const router = useRouter();

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<ServiceFormValues>({
        resolver: zodResolver(ServiceFormSchema),
        defaultValues: {
            title: service.title,
            language: service.language,
            description: service.description,
            // Keep existing images as keys. 
            // Note: Schema expects imageKeys[], array of strings.
            imageKeys: service.images.map(img => img.key),
            tiers: service.tiers.map(t => ({
                type: t.type,
                title: t.title,
                description: t.description,
                price: t.price
            })),
        },
    });

    const { fields } = useFieldArray({
        control,
        name: "tiers",
    });

    const onSubmit = async (data: ServiceFormValues) => {
        setIsSubmitting(true);
        // The form schema expects imageKeys in data, but we are managing it separately here.
        // We should merge it.
        const submissionData = { ...data, imageKeys };

        try {
            const result = await updateServiceAction(service.id, submissionData);

            if (result.error) {
                toast.error(result.error);
            } else {
                toast.success("Service updated successfully");
                router.push("/dashboard/services/all-services");
                router.refresh();
            }
        } catch (error) {
            toast.error("Failed to update service");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl mx-auto space-y-8 p-6 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">

            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Edit Service</h1>
            </div>

            <div className="flex items-center justify-center">
                <div className="w-full max-w-2xl">
                    <ServiceImageSlider setServicImagesKeys={setImageKeys} initialImages={service.images} />
                </div>
            </div>

            {/* --- Section 1: Basic Info --- */}
            <div className="space-y-4 border p-4 rounded-lg bg-gray-50 dark:bg-slate-800/50">
                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">General Information</h2>

                <div>
                    <label className="block text-sm font-medium mb-1">Service Title</label>
                    <Input
                        {...register("title")}
                        className="w-full"
                    />
                    {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Language</label>
                        <Input
                            {...register("language")}
                            className="w-full"
                        />
                        {errors.language && <p className="text-red-500 text-sm mt-1">{errors.language.message}</p>}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <Textarea
                        {...register("description")}
                        rows={6}
                        className="w-full"
                    />
                    {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
                </div>
            </div>

            {/* --- Section 2: Packages --- */}
            <div className="space-y-4">
                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">Packages</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {fields.map((field, index) => (
                        <div key={field.id} className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-950 flex flex-col gap-3 relative pt-6">
                            {/* Badge for Tier Type */}
                            <div className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded w-fit absolute top-0 left-0 rounded-tl-lg rounded-br-lg">
                                {field.type}
                            </div>

                            {/* Package Title */}
                            <div>
                                <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Package Name</label>
                                <Input
                                    {...register(`tiers.${index}.title`)}
                                    placeholder={`${field.type} Option`}
                                    className="w-full text-sm"
                                />
                                {errors.tiers?.[index]?.title && (
                                    <p className="text-red-500 text-xs mt-1">{errors.tiers[index]?.title?.message}</p>
                                )}
                            </div>

                            {/* Package Description */}
                            <div>
                                <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Details</label>
                                <Textarea
                                    {...register(`tiers.${index}.description`)}
                                    rows={4}
                                    className="w-full text-sm"
                                />
                                {errors.tiers?.[index]?.description && (
                                    <p className="text-red-500 text-xs mt-1">{errors.tiers[index]?.description?.message}</p>
                                )}
                            </div>

                            {/* Package Price */}
                            <div>
                                <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Price ($)</label>
                                <Input
                                    type="number"
                                    {...register(`tiers.${index}.price`, { valueAsNumber: true })}
                                    className="w-full text-sm"
                                />
                                {errors.tiers?.[index]?.price && (
                                    <p className="text-red-500 text-xs mt-1">{errors.tiers[index]?.price?.message}</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* --- Submit --- */}
            <div className="flex gap-4">
                <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => router.back()}
                >
                    Cancel
                </Button>
                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-amber-600 hover:bg-amber-700 text-white font-bold"
                >
                    {isSubmitting ? "Updating Service..." : "Update Service"}
                </Button>
            </div>
        </form>
    );
}
