import z from 'zod';

export const PointSchema = z.object({
    Latitude: z.number({ required_error: "latitude must be a number" }).min(-90).max(90),
    Longitude: z.number({ required_error: "longitude must be a number" }).min(-180).max(180),
})

export const PathSchema = z.object({
    startPoint: PointSchema,
    endPoint: PointSchema,
})

export const AngleSchema = z.number().min(-360).max(360)

export const RadiusSchema = z.number({ required_error: "radius must be a number" }).nonnegative()

export const DirectionSchema = z.enum([
    "NORTH",
    "SOUTH",
    "WEST",
    "EAST"
]).optional() || undefined

export const SourceSchema = z.enum(["MANUAL", "ALGORITHM"])



export type Radius = z.infer<typeof RadiusSchema>;
export type Source = z.infer<typeof SourceSchema>;
export type Direction = z.infer<typeof DirectionSchema>;
export type Angle = z.infer<typeof AngleSchema>
export type Point = z.infer<typeof PointSchema>
export type Path = z.infer<typeof PathSchema>

