export type Angle = number
export type Radius = number
export type PriorityRange = number
export type QualityRange = number
export type LatitudeRange = number
export type LongitudeRange = number
export type Direction = "NORTH" | "SOUTH" | "WEST" | "EAST" | undefined
export type Source = "ALGORITHM" | "MANUAL"


export type Point = {
    Latitude: number,
    Longitude: number
}

export type Path = {
    startPoint: Point
    endPoint: Point
}

export type TargetInfoInput = {
    path: PathInput
    target: TargetInput
}

export type TargetInput = {
    name: String // add name required
    point: PointInput
    priority: number
    quality: number
    photoDirection: Direction
}

export type Target = {
    name: String | undefined
    point: Point
    priority: PriorityRange
    quality: QualityRange
    photoDirection: Direction
}

export type TargetInfo = {
    path: Path
    target: Target
}

export type TangentLine = {
    startPoint: Point
    endPoint: Point
}

export type LegInput = {
    targetInfo: TargetInfo[] | undefined | null
    path: PathInput
    altitude: number | undefined
}

export type Leg = {
    path: Path
    altitude: number | undefined
    targetInfo: TargetInfo[] | undefined | null
}

export type Arc = {
    radius: Radius
    pointCenter: Point
    clockwise: Boolean
    startAngle: Angle
    endAngle: Angle
}

export type ArcInput = {
    radius: Radius
    pointCenter: PointInput
    clockwise: Boolean
    startAngle: Angle
    endAngle: Angle
}

export type AmtInput = {
    radius: Radius
    center: PointInput
}

export type PathInput = {
    startPoint: PointInput
    endPoint: PointInput
}

export type PointInput = {
    Latitude: number
    Longitude: number
}

export type Amt = {
    radius: Radius
    center: Point
}

export type FlyZoneInput = PointInput[] // change to points array

export type TangentLineInput = {
    startPoint: PointInput
    endPoint: PointInput
}

export type FullPath = {
    legs: Leg[]
    arcs: Arc[]
    tangentLines: TangentLine[] | undefined | null
}

export type FullPathInput = {
    legs: LegInput[]
    arcs: ArcInput[]
    tangentLines: TangentLineInput[] | undefined | null
}

export type CreateLegsInput = {
    flyZone: FlyZoneInput
    targets: TargetInput[]
    entryPath: PathInput
    exitPath: PathInput
    speed: number
    altitude: number
    windSpeed: number
    windDirection: Angle
    photoDelayAtStart: number
    radius: Radius
}

export type ConnectLegsInput = {
    legs: LegInput[]
    flyZone: FlyZoneInput
    entryPath: PathInput
    exitPath: PathInput
    speed: number
    altitude: number
    windSpeed: number
    windDirection: Angle
    photoDelayAtStart: number
    radius: Radius
    smartConnection: Boolean
}

export type CreateFullPathInput = {
    flyZone: PointInput[]
    targets: TargetInput[]
    entryPath: PathInput
    exitPath: PathInput
    speed: number
    altitude: number
    windSpeed: number
    windDirection: Angle
    photoDelayAtStart: number
    radius: Radius
    smartConnection: Boolean
}