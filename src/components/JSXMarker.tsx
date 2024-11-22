import React from 'react';
import { renderToString } from 'react-dom/server';
import L, { DivIcon } from 'leaflet';
import { Marker } from 'react-leaflet';


type JSXMarkerType = {
  children: React.ReactNode
  position: L.LatLngExpression
}

const JSXMarker = ({children, position}: JSXMarkerType) => {
  const icon = new DivIcon({
    iconSize: [24, 24],
    className: "",
    html: renderToString(children)
  })
  return <Marker position={position} icon={icon}  />
}

export default JSXMarker;