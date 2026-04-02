import { z } from "zod";

const TierTypeEnum = z.enum(["BASIC", "STANDARD", "PREMIUM"]);

const TierSchema = z.object({
    type: TierTypeEnum,
    title: z.string().min(1, "Package title is required"),
    description: z.string().min(1, "Package description is required"),
    price: z.number().min(1, "Price must be at least $1"),
    deliveryTime: z.string().min(1, "Delivery time is required"),
    projectSize: z.string().min(1, "Project size must be greater than 0"),
    evacuationPlan: z.string().min(1, "Evacuation plan is required"),
    floorPlanRedesign: z.boolean(),
    sitePlan: z.string().min(1, "Site plan is required"),
    zonePlan: z.string().min(1, "Zone plan is required"),
    revisions: z.string().min(1, "Revisions is required"),
});

export const ServiceFormSchema = z.object({
    title: z.string().min(1, "Service title is required"),
    language: z.string().min(1, "Language is required"),
    description: z.string().optional(),
    tiers: z.array(TierSchema).length(3, "Exactly 3 tiers are required"),
});

export type ServiceFormValues = z.infer<typeof ServiceFormSchema>;
export type TierType = z.infer<typeof TierTypeEnum>;


export const ReviewSchema = z.object({
    rating: z.coerce.number().min(1).max(5),
    comment: z.string().min(5, "Comment must be at least 5 characters"),
    serviceId: z.string(),
});