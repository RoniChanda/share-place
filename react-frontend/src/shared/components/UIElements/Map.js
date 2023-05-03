import { useRef, useEffect } from "react";

import classes from "./Map.module.css";

function Map(props) {
  const mapRef = useRef();

  const { center, zoom } = props;

  useEffect(() => {
    new window.ol.Map({
      target: mapRef.current.id,
      layers: [
        new window.ol.layer.Tile({
          source: new window.ol.source.OSM(),
        }),
      ],
      view: new window.ol.View({
        center: window.ol.proj.fromLonLat([center.lng, center.lat]),
        zoom: zoom,
      }),
    });
  }, [center, zoom]);

  return (
    <div
      ref={mapRef}
      className={`${classes.map} ${props.className}`}
      style={props.style}
      id="map"
    ></div>
  );
}

export default Map;
