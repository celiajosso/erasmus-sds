import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

export default function PlaceDetailsPage() {
  const { id: placeId } = useParams();
  const mapContainer = useRef(null);
  const mapRef = useRef(null); // Prevent multiple map initializations
  const [data, setData] = useState(null);
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    axios.get(`${apiUrl}/api/places/${placeId}/details`)
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, [placeId, apiUrl]);

  useEffect(() => {
    if (!data?.details?.latitude || !data?.details?.longitude || mapRef.current) return;

    const { latitude, longitude } = data.details;

    mapRef.current = new maplibregl.Map({
      container: mapContainer.current,
      style: "https://raw.githubusercontent.com/go2garret/maps/main/src/assets/json/openStreetMap.json", // You can replace with your own style
      center: [longitude, latitude],
      zoom: 14,
    });

    new maplibregl.Marker().setLngLat([longitude, latitude]).addTo(mapRef.current);
  }, [data]);

  if (!data) return <p className="p-4">Loading...</p>;

  const place = data.details?.place || data.place || {};
  const details = data.details || {};

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-center text-primary mb-6">
        {place.name || "Unknown Place"}
      </h1>
      <div className="badge badge-secondary">{place.category}</div>

      <div className="rounded-xl overflow-hidden shadow-xl my-8">
        <img
          src={place.imageUrl}
          alt={place.name}
          className="w-full h-96 object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://via.placeholder.com/600x400?text=No+Image";
          }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-6 transition duration-300">
          <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
            📝 <span>Description</span>
          </h2>
          <p className="text-gray-600 leading-relaxed">
            {details.description || "No description available."}
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-6 transition duration-300">
          <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
            ♿ <span>Accessibility</span>
          </h2>
          <p className="text-gray-600 leading-relaxed">
            {details.accessibilityInfo?.replace("_", " ") || "No accessibility info provided."}
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-6 transition duration-300">
          <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
            🗺️ <span>Location Details</span>
          </h2>
          <p className="text-gray-600 leading-relaxed">
            {details.locationDetails || "No location details provided."}
          </p>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-3 flex items-center gap-2">📍 <span>Map</span></h2>
        <div
          ref={mapContainer}
          className="h-80 w-full rounded-2xl shadow-lg border border-gray-200"
        />
      </div>
    </div>
  );
}
