"use client";
import { useEffect, useRef, useState } from 'react';
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ServiceFormSchema, ServiceFormValues } from "@/schema/schema";
import { createServiceAction } from "@/actions/actions";
import { Editor } from '@tinymce/tinymce-react';
import type { Editor as TinyMCEEditor } from 'tinymce';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Checkbox } from '@/components/ui/checkbox';

export default function ServiceUploadForm({ serviceImagesKeys }: { serviceImagesKeys: Array<string> }) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [mounted, setMounted] = useState(false);
    const editorRef = useRef<TinyMCEEditor | null>(null);

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
            description: "", // You would populate this via an upload widget (e.g. Uploadthing)
            tiers: [
                { type: "BASIC", title: "", description: "", price: 0, deliveryTime: "", projectSize: "", evacuationPlan: "", floorPlanRedesign: false, sitePlan: "", zonePlan: "", revisions: "" },
                { type: "STANDARD", title: "", description: "", price: 0, deliveryTime: "", projectSize: "", evacuationPlan: "", floorPlanRedesign: false, sitePlan: "", zonePlan: "", revisions: "" },
                { type: "PREMIUM", title: "", description: "", price: 0, deliveryTime: "", projectSize: "", evacuationPlan: "", floorPlanRedesign: false, sitePlan: "", zonePlan: "", revisions: "" },
            ],
        },
    });

    const { fields } = useFieldArray({
        control,
        name: "tiers",
    });

    useEffect(() => {
        setMounted(true);
    }, []);

    const onSubmit = async (data: ServiceFormValues) => {
        setIsSubmitting(true);
        try {
            if (!serviceImagesKeys.length) {
                toast.error("At least 1 service image is required");
                setIsSubmitting(false);
                return
            }
            const description = editorRef.current?.getContent() || "";
            const result = await createServiceAction({ ...data, description: `${description}` }, serviceImagesKeys);
            toast.success("Created a service successfully");
            reset();
        } catch (error) {
            console.error("Error creating service:", error);
            toast.error("Failed to create service, try again");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!mounted) {
        return null;
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl mx-auto space-y-8 p-6">

            {/* --- Section 1: Basic Info --- */}
            <div className="space-y-4 border p-4 rounded-lg bg-white dark:bg-slate-800 dark:text-gray-400 shadow-sm">
                <h2 className="text-xl font-bold text-gray-800">General Information</h2>

                <div>
                    <label className="block text-sm font-medium">Service Title</label>
                    <Controller
                        name="title"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => <Input
                            {...field}
                            placeholder="I will build a full stack application..."
                            className="w-full border rounded p-2 mt-1"
                        />}
                    />
                    {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium">Language</label>
                        <Controller
                            name="language"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => <Input {...field} placeholder="e.g. English, Spanish"
                                className="w-full border rounded p-2 mt-1" />}
                        />
                        {errors.language && <p className="text-red-500 text-sm">{errors.language.message}</p>}
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium mb-2">Description</label>
                    <Editor
                        apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
                        onInit={(_evt, editor: TinyMCEEditor) => editorRef.current = editor}
                        initialValue=""
                        init={{
                            height: 300,
                            menubar: false,
                            plugins: [
                                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                            ],
                            toolbar: 'undo redo | blocks | ' +
                                'bold italic forecolor | alignleft aligncenter ' +
                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                'removeformat | help',
                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                        }}
                    />
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
                                <Controller
                                    name={`tiers.${index}.title`}
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field }) => <Input {...field} placeholder={`Package Title`}
                                        className="w-full border rounded p-2 text-sm" />}
                                />

                                {errors.tiers?.[index]?.title && (
                                    <p className="text-red-500 text-xs">{errors.tiers[index]?.title?.message}</p>
                                )}
                            </div>

                            {/* Package Description */}
                            <div>
                                <label className="text-xs font-bold text-gray-500 uppercase">Details</label>
                                <Controller
                                    name={`tiers.${index}.description`}
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field }) => <Textarea {...field} placeholder={`Package Description`}
                                        className="w-full border rounded p-2 text-sm" />}
                                />
                                {errors.tiers?.[index]?.description && (
                                    <p className="text-red-500 text-xs">{errors.tiers[index]?.description?.message}</p>
                                )}
                            </div>

                            <div>
                                <label className="text-xs font-bold text-gray-500 uppercase">Delivery Time</label>
                                <Controller
                                    name={`tiers.${index}.deliveryTime`}
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field }) => (
                                        <Select value={field.value} onValueChange={field.onChange}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select Delivery Time" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Delivery Time</SelectLabel>
                                                    {
                                                        Array.from({ length: 30 }, (_, i) => (
                                                            <SelectItem className='uppercase' key={i} value={`${i + 1}`}>{i + 1} {i === 0 ? "day" : "days"} delivery</SelectItem>
                                                        ))
                                                    }
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                                {errors.tiers?.[index]?.deliveryTime && (
                                    <p className="text-red-500 text-xs">{errors.tiers[index]?.deliveryTime?.message}</p>
                                )}
                            </div>

                            <div>
                                <label className="text-xs font-bold text-gray-500 uppercase">Project Size</label>
                                <Controller
                                    name={`tiers.${index}.projectSize`}
                                    control={control} rules={{ required: true, validate: (value) => Number(value) > 0 }}
                                    render={({ field }) => <Input {...field} type="number" placeholder={`e.g. 1000 (sq ft)`}
                                        className="w-full border rounded p-2 text-sm" />}
                                />
                                {errors.tiers?.[index]?.projectSize && (
                                    <p className="text-red-500 text-xs">{errors.tiers[index]?.projectSize?.message}</p>
                                )}
                            </div>

                            <div>
                                <label className="text-xs font-bold text-gray-500 uppercase">Evacuation Plan</label>
                                <Controller
                                    name={`tiers.${index}.evacuationPlan`}
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field }) => (
                                        <Select value={field.value} onValueChange={field.onChange}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select Evacuation Plan" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Evacuation Plans</SelectLabel>
                                                    {
                                                        Array.from({ length: 20 }, (_, i) => (
                                                            <SelectItem key={i} value={`${i + 1}`}>{i + 1}</SelectItem>
                                                        ))
                                                    }
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                                {errors.tiers?.[index]?.evacuationPlan && (
                                    <p className="text-red-500 text-xs">{errors.tiers[index]?.evacuationPlan?.message}</p>
                                )}
                            </div>
                            <FieldGroup className="w-full border rounded-sm p-3">
                                <Field orientation="horizontal">
                                    <FieldLabel htmlFor={`floor-plan-redesign-checkbox-${index}`} className="text-xs font-bold text-gray-500 uppercase">
                                        Floor Plan Redesign
                                    </FieldLabel>
                                    <Controller
                                        name={`tiers.${index}.floorPlanRedesign`}
                                        control={control}
                                        render={({ field }) => (
                                            <Checkbox
                                                id={`floor-plan-redesign-checkbox-${index}`}
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        )}
                                    />
                                </Field>
                                {
                                    errors.tiers?.[index]?.floorPlanRedesign && (
                                        <p className="text-red-500 text-xs">{errors.tiers[index]?.floorPlanRedesign?.message}</p>
                                    )
                                }
                            </FieldGroup>
                            <div>
                                <label className="text-xs font-bold text-gray-500 uppercase">Site Plan</label>
                                <Controller
                                    name={`tiers.${index}.sitePlan`}
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field }) => (
                                        <Select value={field.value} onValueChange={field.onChange}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select Site Plan" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Site Plans</SelectLabel>
                                                    {
                                                        Array.from({ length: 20 }, (_, i) => (
                                                            <SelectItem key={i} value={`${i + 1}`}>{i + 1}</SelectItem>
                                                        ))
                                                    }
                                                    <SelectItem key={"none"} value={`none`}>None</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                                {
                                    errors.tiers?.[index]?.sitePlan && (
                                        <p className="text-red-500 text-xs">{errors.tiers[index]?.sitePlan?.message}</p>
                                    )
                                }
                            </div>
                            <div>
                                <label className="text-xs font-bold text-gray-500 uppercase">Zone Plans</label>

                                <Controller
                                    name={`tiers.${index}.zonePlan`}
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field }) => (
                                        <Select value={field.value} onValueChange={field.onChange}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select Zone Plan" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Zone Plans</SelectLabel>
                                                    {
                                                        Array.from({ length: 20 }, (_, i) => (
                                                            <SelectItem key={i} value={`${i + 1}`}>{i + 1}</SelectItem>
                                                        ))
                                                    }
                                                    <SelectItem key={"none"} value={`none`}>None</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                                {
                                    errors.tiers?.[index]?.zonePlan && (
                                        <p className="text-red-500 text-xs">{errors.tiers[index]?.zonePlan?.message}</p>
                                    )
                                }
                            </div>
                            <div>
                                <label className="text-xs font-bold text-gray-500 uppercase">Revisions</label>

                                <Controller
                                    name={`tiers.${index}.revisions`}
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field }) => (
                                        <Select value={field.value} onValueChange={field.onChange}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select Revisions" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Revisions</SelectLabel>
                                                    {
                                                        Array.from({ length: 20 }, (_, i) => (
                                                            <SelectItem key={i} value={`${i + 1}`}>{i + 1}</SelectItem>
                                                        ))
                                                    }
                                                    <SelectItem key={"unlimited"} value={`unlimited`}>Unlimited</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                                {
                                    errors.tiers?.[index]?.revisions && (
                                        <p className="text-red-500 text-xs">{errors.tiers[index]?.revisions?.message}</p>
                                    )
                                }
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
