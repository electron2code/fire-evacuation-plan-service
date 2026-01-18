"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ServiceFormSchema, ServiceFormValues } from "@/schema/schema";
import { createServiceAction } from "@/actions/actions";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function ServiceUploadForm({ serviceImagesKeys }: { serviceImagesKeys: Array<string> }) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<ServiceFormValues>({
        resolver: zodResolver(ServiceFormSchema),
        defaultValues: {
            title: "",
            language: "",
            description: "",
            imageKeys: serviceImagesKeys, // You would populate this via an upload widget (e.g. Uploadthing)
            tiers: [
                { type: "BASIC", title: "", description: "", price: 0 },
                { type: "STANDARD", title: "", description: "", price: 0 },
                { type: "PREMIUM", title: "", description: "", price: 0 },
            ],
        },
    });

    const { fields } = useFieldArray({
        control,
        name: "tiers",
    });

    const onSubmit = async (data: ServiceFormValues) => {
        setIsSubmitting(true);
        // Note: In a real app, ensure imageKeys are populated by your uploader first
        // For demo, we are pushing a fake image key if empty

        try {
            if (!serviceImagesKeys.length) {
                toast.error("At least 1 service image is required");
                setIsSubmitting(false);
                return
            }
            await createServiceAction(data, serviceImagesKeys);
            toast.success("Created a service successfully");
            localStorage.removeItem("serviceImages");
            reset();
        } catch (error) {
            toast.success("Faild to create service, try again");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit, (errors) => console.log("Validation Error", errors))} className="max-w-4xl mx-auto space-y-8 p-6">

            {/* --- Section 1: Basic Info --- */}
            <div className="space-y-4 border p-4 rounded-lg bg-white dark:bg-slate-800 dark:text-gray-400 shadow-sm">
                <h2 className="text-xl font-bold text-gray-800">General Information</h2>

                <div>
                    <label className="block text-sm font-medium">Service Title</label>
                    <Input
                        {...register("title")}
                        placeholder="I will build a full stack application..."
                        className="w-full border rounded p-2 mt-1"
                    />
                    {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium">Language</label>
                        <Input
                            {...register("language")}
                            placeholder="e.g. English, Spanish"
                            className="w-full border rounded p-2 mt-1"
                        />
                        {errors.language && <p className="text-red-500 text-sm">{errors.language.message}</p>}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium">Description</label>
                    <Textarea
                        {...register("description")}
                        rows={4}
                        className="w-full border rounded p-2 mt-1"
                    />
                    {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
                </div>
            </div>

            {/* --- Section 2: Packages (3 Column Layout) --- */}
            <div className="space-y-4">
                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">Packages</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {fields.map((field, index) => (
                        <div key={field.id} className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-950 flex flex-col gap-3 relative">
                            {/* Badge for Tier Type */}
                            <div className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded w-fit absolute -top-2 left-4">
                                {field.type}
                            </div>

                            {/* Package Title */}
                            <div className="mt-2">
                                <label className="text-xs font-bold text-gray-500 uppercase">Package Name</label>
                                <Input
                                    {...register(`tiers.${index}.title`)}
                                    placeholder={`${field.type} Option`}
                                    className="w-full border rounded p-2 text-sm"
                                />
                                {errors.tiers?.[index]?.title && (
                                    <p className="text-red-500 text-xs">{errors.tiers[index]?.title?.message}</p>
                                )}
                            </div>

                            {/* Package Description */}
                            <div>
                                <label className="text-xs font-bold text-gray-500 uppercase">Details</label>
                                <Textarea
                                    {...register(`tiers.${index}.description`)}
                                    rows={3}
                                    className="w-full border rounded p-2 text-sm"
                                />
                                {errors.tiers?.[index]?.description && (
                                    <p className="text-red-500 text-xs">{errors.tiers[index]?.description?.message}</p>
                                )}
                            </div>

                            {/* Package Price */}
                            <div>
                                <label className="text-xs font-bold text-gray-500 uppercase">Price ($)</label>
                                <Input
                                    type="number"
                                    {...register(`tiers.${index}.price`, { valueAsNumber: true })}
                                    className="w-full border rounded p-2 text-sm"
                                />
                                {errors.tiers?.[index]?.price && (
                                    <p className="text-red-500 text-xs">{errors.tiers[index]?.price?.message}</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* --- Submit --- */}
            <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-black text-white font-bold py-3 rounded hover:bg-gray-800 disabled:opacity-50"
            >
                {isSubmitting ? "Creating Service..." : "Create Service"}
            </Button>
        </form>
    );
}