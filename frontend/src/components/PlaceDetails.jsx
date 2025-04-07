import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function PlaceDetailsPage() {
  const { id: placeId } = useParams();
  const mapContainer = useRef(null);
  const [data, setData] = useState(null);
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    axios.get(`${apiUrl}/api/places/${placeId}/details`)
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, [placeId, apiUrl]);
  

  if (!data) return <p className="p-4">Loading...</p>;

  const place = data.details?.place || data.place || {};
  const details = data.details || {};

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-4">
      <h1 className="text-3xl font-bold">{place.name || "Unknown Place"}</h1>
      <p className="text-gray-600">{place.category || "Uncategorized"}</p>
      <img
        src={place.imageUrl}
        alt={place.name}
        className="rounded-lg shadow-lg w-full max-h-96 object-cover"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "https://via.placeholder.com/600x400?text=No+Image";
        }}
      />

      <div className="mt-4">
        <h2 className="text-xl font-semibold">Description</h2>
        <p>{details.description || "No description available."}</p>
      </div>

      <div>
        <h2 className="text-xl font-semibold">Accessibility</h2>
        <p>{details.accessibilityInfo?.replace("_", " ") || "No accessibility info provided."}</p>
      </div>

      <div>
        <h2 className="text-xl font-semibold">Location Details</h2>
        <p>{details.locationDetails || "No location details provided."}</p>
      </div>

      <div ref={mapContainer} className="h-80 w-full rounded-lg shadow" />
    </div>
  );
}
