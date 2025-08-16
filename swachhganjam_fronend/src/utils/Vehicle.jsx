// utils/VehicleMap.js
import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import L from "leaflet";

// Custom truck icon

const truckIcon = new L.Icon({
  iconUrl: 'location_icon.png', 
  iconSize: [50, 50], 
  iconAnchor: [20, 40], 
  popupAnchor: [0, -40] 
});

const VehicleMap = ({ vehicleList }) => {
  const bounds = vehicleList.map(v => [v.latitude, v.longitude]);

  useEffect(() => {
  setTimeout(() => {
    window.dispatchEvent(new Event("resize"));
  }, 300);
}, []);


  return (
   <div style={{ height: "100%", width: "100%", minHeight: "300px" }}>
      <MapContainer
        center={bounds[0] || [20.5937, 78.9629]}
        zoom={15}
        scrollWheelZoom={true}
        bounds={bounds}
        icon={truckIcon}
        style={{ height: "100%", width: "100%", borderRadius: "12px" }}
        whenReady={(map) => map.target.invalidateSize()}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {vehicleList.map((vehicle) => (
          <Marker
            key={vehicle.truck_id}
            position={[vehicle.latitude, vehicle.longitude]}
             icon={truckIcon}
          >
            <Tooltip>
              <strong>{vehicle.truck_no}</strong><br />
              {vehicle.status_display_text}<br />
              {vehicle.address}
            </Tooltip>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default VehicleMap;
