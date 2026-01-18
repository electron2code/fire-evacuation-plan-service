import { z } from "zod";

export const TierTypeEnum = z.enum(["BASIC", "STANDARD", "PREMIUM"]);

// Schema for a single Pricing Tier
const ServiceTierSchema = z.object({
    type: TierTypeEnum,
    title: z.string().min(1, "Tier title is required"),
    description: z.string().min(1, "Tier description is required"),
    price: z.coerce.number().min(1, "Price must be at least 1"),
});

// Main Form Schema
export const ServiceFormSchema = z.object({
    title: z.string().min(10, "Title must be at least 10 characters"),
    language: z.string().min(1, "Language is required"),
    description: z.string().min(50, "Description must be at least 50 characters"),
    // We expect an array of exactly 3 tiers (Basic, Standard, Premium)
    tiers: z.array(ServiceTierSchema).length(3),
    // For this example, we assume image keys are strings returned from an uploader
    // imageKeys: z.array(z.string()).min(1, "At least one image is required"),
    imageKeys: z.array(z.string())
});

export type ServiceFormValues = z.infer<typeof ServiceFormSchema>;

export const ReviewSchema = z.object({
    rating: z.coerce.number().min(1).max(5),
    comment: z.string().min(5, "Comment must be at least 5 characters"),
    serviceId: z.string(),
});