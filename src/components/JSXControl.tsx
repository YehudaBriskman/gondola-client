import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import L from 'leaflet';
import { useMap } from 'react-leaflet';

type JSXControlType = {
  position: L.ControlPosition | undefined
  children: React.ReactNode
}

const JSXControl = ({position, children}: JSXControlType) => {
    const containerRef = useRef(L.DomUtil.create('div'))
    const map = useMap();
    
    useEffect(() => {
        const control = new L.Control({position: position || 'topright'});
        
        // prevent Map actions inside this container
        L.DomEvent.disableClickPropagation(containerRef.current);
        L.DomEvent.disableScrollPropagation(containerRef.current);
        containerRef.current.addEventListener('mousemove', (e) => {
          e.preventDefault(); // for leaflet map to prevent propagation
        });
        containerRef.current.addEventListener('click', (e) => {
          e.stopPropagation(); // for leaflet map to prevent propagation
        });
        
        control.onAdd = () => containerRef.current;
    
        control.addTo(map);
    
      return () => {
        control.remove();
      }
    }, [map, position])
    
    // the component is added as a DOM element, so no need for JSX component.
    return createPortal(
        children,
        containerRef.current
    );
}

export default JSXControl;