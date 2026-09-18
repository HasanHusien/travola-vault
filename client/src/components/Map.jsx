import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

function toLatLng(coordinates = []) {
  const [lng, lat] = coordinates;
  return [lat, lng];
}
// center: [-118.113491, 34.111745],

function Map({ locations = [] }) {
  const points = locations.filter(
    (location) => location?.coordinates?.length >= 2,
  );
  const center = points[0]
    ? toLatLng(points[0].coordinates)
    : [-118.113491, 34.111745];

  return (
    <div id="map">
      <MapContainer
        center={center}
        zoom={6}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {points.map((location) => (
          <Marker
            key={location._id || location.day}
            position={toLatLng(location.coordinates)}
          >
            <Popup>
              <span>
                {location.day ? `Day ${location.day}: ` : ""}
                {location.description}
              </span>
            </Popup>
          </Marker>
        ))}
        <FitLocations points={points} />
      </MapContainer>
    </div>
  );
}

function FitLocations({ points }) {
  const map = useMap();
  const pointsKey = points.map((loc) => loc.coordinates.join(",")).join("|");

  useEffect(() => {
    if (!points.length) return;

    const bounds = L.latLngBounds(
      points.map((loc) => toLatLng(loc.coordinates)),
    );

    map.invalidateSize();
    map.fitBounds(bounds, {
      padding: [80, 80],
      maxZoom: 10,
    });
    map.scrollWheelZoom.disable();
  }, [map, points, pointsKey]);

  return null;
}

export default Map;
