import { Target, TargetSchema } from "../../gondola_types/navigationElements";

type CsvRow = Record<keyof Target, string>;

export const convertCSVToString = (data: CsvRow) => {
    const [lat, long] = data.point.split(',').map((s: string) => parseFloat(s));

    return {
        name: data.name,
        point: { lat, long },
        priority: parseInt(data.priority, 10),
        quality: parseInt(data.quality, 10),
        photoDirection: data.photoDirection
    }
}

export function parseCSV(constent: string) {
    const rows = constent.split('\n');
    const headers = rows[0].split(',');
    const data = rows.slice(1).map(row => {
        const values = row.split(',');
        const obj: any = {}
        headers.forEach((header, index) => {
            obj[header.trim()] = values[index]?.trim();
        })
        return obj
    })
    return data
}

export function validateData(data: any[]) {
    const result = data.map((item) => {
        const pointParse = item?.point?.split('|').map(Number);
        if (pointParse?.length === 2) {
            item.point = { Latitude: Number(pointParse[0]), Longitude: Number(pointParse[1]) }
        }
        item.priority = Number(item?.priority)
        item.quality = Number(item?.quality)
        item.photoDirection = item?.photoDirection && item.photoDirection !== '' ? item?.photoDirection : undefined
        return TargetSchema.safeParse(item)
    })


    const successData = result.filter((res) => res.success).map((res) => res.data)

    const errors = result.filter((res) => !res.success).map((res) => res.error)

    return { success: errors.length === 0, data: successData, errors }
}

export function convertTargetsToCSV(targets: Target[]): string {
    if (targets.length === 0) return ""

    const headers = ["name", "point", "priority", "quality", "photoDirection"]

    const csvRows = [headers.join(",")]

    targets.forEach((target) => {
        const row = [
            target.name,
            `${target.point.Latitude}|${target.point.Longitude}`,
            target.priority.toString(),
            target.quality.toString(),
            target.photoDirection ?? ""
        ]
        csvRows.push(row.join(","))
    })
    console.log(csvRows.join("\n"));
    return csvRows.join("\n")
}

export function downloadFile(data: string, fileType: "json" | "csv", fileName = "data") {
    let blob
    if (fileType === "csv")
        blob = new Blob([data], { type: "text/csv" })
    else blob = new Blob([data], { type: "application/json" })

    const url = URL.createObjectURL(blob)

    const a = document.createElement("a") as HTMLAnchorElement
    a.href = url
    a.download = `${fileName}.${fileType}`

    document.body.appendChild(a)
    a.click()

    document.body.removeChild(a)
    URL.revokeObjectURL(url)
}