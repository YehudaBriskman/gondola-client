import { z } from 'zod';
import { PathSchema, AngleSchema, RadiusSchema, SourceSchema } from './basicElements';
import { ArcSchema, FlyZoneSchema, LegSchema, TangentLineSchema, TargetSchema } from './navigationElements';

export const FullPathSchema = z.object({
    arcs: ArcSchema.array(),
    legs: LegSchema.array(),
    tangentLines: TangentLineSchema.array().optional().nullable()
});

export const FieldSchema = z.object({
    timestamp: z.string().optional().nullable(),
    flyZone: FlyZoneSchema.optional().nullable(),
    targets: TargetSchema.array().optional().nullable(),
    entryPath: PathSchema.optional().nullable(),
    exitPath: PathSchema.optional().nullable(),
    speed: z.number().nonnegative().optional().nullable(),
    altitude: z.number().optional().nullable(),
    windDirection: AngleSchema.optional().nullable(),
    windSpeed: z.number().nonnegative().optional().nullable(),
    photoDelayAtStart: z.number().nonnegative().optional().nullable(),
    radius: RadiusSchema.optional().nullable().optional().nullable(),
    legs: LegSchema.array().optional().nullable(),
    arcs: ArcSchema.array().optional().nullable(),
    tangentLines: PathSchema.array().optional().nullable(),
    source: SourceSchema.optional().nullable(),
    name: z.string().optional().nullable(),
})

export const SaveQueryInputSchema = z.object({
    flyZone: FlyZoneSchema.optional(),
    targets: TargetSchema.array().optional(),
    entryPath: PathSchema.optional(),
    exitPath: PathSchema.optional(),
    speed: z.number().nonnegative().optional(),
    altitude: z.number().optional(),
    windDirection: AngleSchema.optional(),
    windSpeed: z.number().nonnegative().optional(),
    photoDelayAtStart: z.number().nonnegative().optional(),
    radius: RadiusSchema.optional(),
    legs: LegSchema.array().optional(),
    arcs: ArcSchema.array().optional(),
    tangentLines: PathSchema.array().optional(),
    source: SourceSchema,
    name: z.string()
})

export const CreateFullPathInputSchema = z.object({
    flyZone: FlyZoneSchema,
    targets: TargetSchema.array(),
    entryPath: PathSchema,
    exitPath: PathSchema,
    speed: z.number().nonnegative(),
    altitude: z.number(),
    windSpeed: z.number().nonnegative(),
    windDirection: AngleSchema,
    photoDelayAtStart: z.number().nonnegative(),
    radius: RadiusSchema,
    smartConnection: z.boolean()
})

export const CreateFullPathOutputSchema = FullPathSchema

export const CreateLegsInputSchema = z.object({
    flyZone: FlyZoneSchema,
    targets: TargetSchema.array(),
    entryPath: PathSchema,
    exitPath: PathSchema,
    speed: z.number(),
    windSpeed: z.number().nonnegative(),
    altitude: z.number(),
    windDirection: AngleSchema,
    photoDelayAtStart: z.number().nonnegative(),
    radius: RadiusSchema,
})

export const CreateLegsOutputSchema = LegSchema.array()

export const ConnectLegsInputSchema = z.object({
    legs: LegSchema.array(),
    flyZone: FlyZoneSchema,
    entryPath: PathSchema,
    exitPath: PathSchema,
    speed: z.number().nonnegative(),
    altitude: z.number(),
    windSpeed: z.number().nonnegative(),
    windDirection: AngleSchema,
    photoDelayAtStart: z.number().nonnegative(),
    radius: RadiusSchema,
    smartConnection: z.boolean()
})

export const ConnectLegsOutputSchema = FullPathSchema;








export const CreateMenualRequestedSchema = z.object({
    flyZone: FlyZoneSchema.optional().nullable(),
    targets: TargetSchema.array().optional().nullable(),
    entryPath: PathSchema.optional().nullable(),
    exitPath: PathSchema.optional().nullable(),
    arcs: ArcSchema.array().optional().nullable(),
    legs: LegSchema.array().optional().nullable(),
    tangentLines: TangentLineSchema.array().optional().nullable(),
    speed: z.number().optional().nullable(),
    altitude: z.number().optional().nullable(),
    windDirection: AngleSchema.optional().nullable(),
    photoDelayAtStart: z.number().min(0).optional().nullable(),
    radius: RadiusSchema.optional().nullable(),
})

export const RoutePlanSchema = z.object({
    name: z.string(),
    missionType: z.enum(["ALGORITHM", "MANUAL"]),
    fullPath: FullPathSchema,
    unreachedTargets: TargetSchema.array().optional().nullable(),
    flyZone: FlyZoneSchema
})

export const RequestPlanSchema = CreateMenualRequestedSchema


export type FlightSettings = Omit<CreateFullPathInput, "flyZone" | "targets" | "entryPath" | "exitPath">


export type FullPath = z.infer<typeof FullPathSchema>
export type RoutePlan = z.infer<typeof RoutePlanSchema>
export type RequestPlan = z.infer<typeof RequestPlanSchema>

export type Field = z.infer<typeof FieldSchema>
export type SaveQueryInput = z.infer<typeof SaveQueryInputSchema>

export type CreateFullPathInput = z.infer<typeof CreateFullPathInputSchema>
export type CreateFullPathOutput = z.infer<typeof CreateFullPathOutputSchema>

export type CreateLegsInput = z.infer<typeof CreateLegsInputSchema>
export type CreateLegsOutput = z.infer<typeof CreateLegsOutputSchema>

export type ConnectLegsInput = z.infer<typeof ConnectLegsInputSchema>
export type ConnectLegsOutput = z.infer<typeof ConnectLegsOutputSchema>

export type CreateMenualRequested = z.infer<typeof CreateMenualRequestedSchema>
