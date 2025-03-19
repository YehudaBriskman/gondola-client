import { z } from 'zod';
import { PathSchema, AngleSchema, RadiusSchema, SourceSchema } from './basicElements';
import { ArcSchema, FlyZoneSchema, LegSchema, TargetSchema } from './navigationElements';

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

export type Field = z.infer<typeof FieldSchema>
export type SaveQueryInput = z.infer<typeof SaveQueryInputSchema>