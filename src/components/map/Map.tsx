import "leaflet/dist/leaflet.css";
import { Outlet } from "react-router-dom"
import { MapContainer, GeoJSON, LayerGroup } from "react-leaflet";
import { FeatureCollection } from "geojson";
import L from "leaflet";
import classes from "./map.module.css"
import countriesData from '../../assets/map/ne_50m_admin_0_countries.json';
import { HOME_COORDINATES } from "../../constants/index.ts";


export default function Map({ outlet }: { outlet?: boolean }) {

  const geoJsonBounds = L.geoJSON(
    countriesData as FeatureCollection
  ).getBounds();
  return (
    <MapContainer
      className={`${classes.map} ${!outlet && classes.animationMap}`}
      zoomControl={false}
      center={HOME_COORDINATES}
      zoom={8}
      minZoom={5}
      maxZoom={17}
      zoomAnimation={true}
      zoomSnap={0.01}
      zoomDelta={0.05}
      maxBounds={geoJsonBounds}
      maxBoundsViscosity={1.0}
      closePopupOnClick
    >
      <LayerGroup>
        <GeoJSON style={{ fillOpacity: 0.12 }} data={countriesData as FeatureCollection}></GeoJSON>
      </LayerGroup>
      {outlet && <Outlet />}
    </MapContainer>
  );
}
