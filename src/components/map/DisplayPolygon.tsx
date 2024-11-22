import { Polygon as PolygonComponent } from 'react-leaflet'
import { POLYGON_FILL_COLOR } from '../../constants/legend'
import { ConvertPoint } from '../../utils/general'
import { FlyZone } from '../../gondola_types/navigationElements'

export default function DisplayPolygon({ polygonPoints }: { polygonPoints: FlyZone }) {
    return (
        <PolygonComponent
            positions={ConvertPoint.toLeafletPoint(polygonPoints)}
            pathOptions={{ color: POLYGON_FILL_COLOR, fillColor: POLYGON_FILL_COLOR }}
        />
    )
}
