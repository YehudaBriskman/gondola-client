import { PointSchema, PathSchema, AngleSchema, DirectionSchema, RadiusSchema } from './basicElements';
import { z } from 'zod'

export const TargetSchema = z.object({
    name: z.string(),
    point: PointSchema,
    priority: z.number().int().min(1).max(5),
    quality: z.number().int().min(0).max(5),
    photoDirection: DirectionSchema.optional().nullable()
})

export const TargetInfoSchema = z.object({
    path: PathSchema,
    target: TargetSchema
});

export const AmtSchema = z.object({
    radius: RadiusSchema,
    center: PointSchema
});

export const FlyZoneSchema = PointSchema.array();

export const LegSchema = z.object({
    path: PathSchema,
    altitude: z.number(),
    targetInfo: TargetInfoSchema.array().min(1).max(10).nullable().optional()
})

export const ArcSchema = z.object({
    radius: RadiusSchema,
    centerPoint: PointSchema,
    clockwise: z.boolean(),
    startAngle: AngleSchema,
    endAngle: AngleSchema
});

export const TangentLineSchema = PathSchema

export const GeneralSchema = z.object({
    speed: z.number({ required_error: "speed must be a number" }).nonnegative().nullable(),
    altitude: z.number({ required_error: "altitude must be a number" }).nonnegative().nullable(),
    windDirection: z.number({ required_error: "wind Direction must be a number" }).nonnegative().nullable(),
    windSpeed: z.number({ required_error: "speed Direction must be a number" }).nonnegative().nullable(),
    photoDelayAtStart: z.number({ required_error: "photo Delay at Start must be a number" }).nonnegative().nullable(),
    radius: z.number({ required_error: "radius must be a number" }).nonnegative().nullable(),
});

export type LeafletPoint = {
    lat: number;
    lng: number;
}

export type General = z.infer<typeof GeneralSchema>;
export type Target = z.infer<typeof TargetSchema>;
export type TargetInfo = z.infer<typeof TargetInfoSchema>;
export type Amt = z.infer<typeof AmtSchema>;
export type FlyZone = z.infer<typeof FlyZoneSchema>;
export type Leg = z.infer<typeof LegSchema>;
export type Arc = z.infer<typeof ArcSchema>;
export type TangentLine = z.infer<typeof TangentLineSchema>;