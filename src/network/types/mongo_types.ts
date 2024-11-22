export type Latitude = number
export type Longitude = number
export type Angle = number
export type NonnegativeFloat = number
export type Priority = number
export type Quality = number

export type Direction = "NORTH" | "SOUTH" | "WEST" | "EAST" | undefined

export type Source = "ALGORITHM" | "MANUAL"


export type Point = {
    Latitude: Latitude
    Longitude: Longitude
}

export type PointInput = {
    Latitude: Latitude
    Longitude: Longitude
}

export type Path = {
    startPoint: Point
    endPoint: Point
}

export type PathInput = {
    startPoint: PointInput
    endPoint: PointInput
}

export type Target = {
    name: String
    point: Point
    priority: Priority
    quality: Quality
    photoDirection?: Direction
}

export type TargetInput = {
    name: String
    point: PointInput
    priority: Priority
    quality: Quality
    photoDirection?: "NORTH" | "SOUTH" | "EAST" | "WEST" | null | undefined
}

export type TargetInfo = {
    path: Path
    target: Target
}

export type TargetInfoInput = {
    path: PathInput
    target: TargetInput
}

export type Leg = {
    path: Path
    altitude: number
    targetInfo?: TargetInfo[] | null | undefined
}

export type LegInput = {
    path: PathInput
    altitude: number
    targetInfo?: TargetInfoInput[] | null | undefined
}

export type Arc = {
    radius: NonnegativeFloat
    centerPoint: Point
    clockwise: Boolean
    startAngle: Angle
    endAngle: Angle
}

export type ArcInput = {
    radius: NonnegativeFloat
    centerPoint: PointInput
    clockwise: Boolean
    startAngle: Angle
    endAngle: Angle
}

export type FullPath = {
    legs: Leg[]
    arcs: Arc[]
    tangentLines: Path[] | undefined | null
}

export type Field = {
    flyZone: Point[]
    targets: Target[]
    entryPath: Path
    exitPath: Path
    speed: NonnegativeFloat
    altitude: number
    windDirection: Angle
    windSpeed: NonnegativeFloat
    photoDelayAtStart: NonnegativeFloat
    radius: NonnegativeFloat
    legs: Leg[]
    arcs: Arc[]
    tangentLines: Path[]
    source: Source
    name: String
}

export type SaveQueryInput = {
    flyZone?: PointInput[]
    targets?: TargetInput[]
    entryPath?: PathInput
    exitPath?: PathInput
    speed?: NonnegativeFloat
    altitude?: number
    windDirection?: Angle
    windSpeed?: NonnegativeFloat
    photoDelayAtStart?: NonnegativeFloat
    radius?: NonnegativeFloat
    legs?: LegInput[]
    arcs?: ArcInput[]
    tangentLines?: PathInput[]
    source: Source
    name: String
}

export type CreateFullPathInput = {
    flyZone: PointInput[]
    targets: TargetInput[]
    entryPath: PathInput
    exitPath: PathInput
    speed: NonnegativeFloat
    altitude: number
    windDirection: Angle
    windSpeed: NonnegativeFloat
    photoDelayAtStart: NonnegativeFloat
    radius: NonnegativeFloat
    smartConnection: boolean
}

export type CreateFullPathOutput = FullPath

export type CreateLegsInput = {
    flyZone: PointInput[]
    targets: TargetInput[]
    entryPath: PathInput
    exitPath: PathInput
    speed: NonnegativeFloat
    altitude: number
    windDirection: Angle
    windSpeed: NonnegativeFloat
    photoDelayAtStart: NonnegativeFloat
    radius: NonnegativeFloat
}

export type CreateLegsOutput = {
    legs: LegInput[]
}

export type ConnectLegsInput = {
    legs: LegInput[]
    flyZone: PointInput[]
    targets: TargetInput[]
    entryPath: PathInput
    exitPath: PathInput
    speed: NonnegativeFloat
    altitude: number
    windDirection: Angle
    windSpeed: NonnegativeFloat
    photoDelayAtStart: NonnegativeFloat
    radius: NonnegativeFloat
    smartConnection: boolean
}

export type ConnectLegsOutput = FullPath
