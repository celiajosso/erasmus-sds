import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import Header from './general/Header';

export default function PlaceDetailsPage() {
  const { id: placeId } = useParams();
  const mapContainer = useRef(null);
  const mapRef = useRef(null); // Prevent multiple map initializations
  const [data, setData] = useState({ place: null, details: null });
  const apiUrl = process.env.REACT_APP_API_URL;
    const [isMenuOpen, setIsMenuOpen] = useState(false); 


  const formatDuration = (minutes) => {
    if (!minutes || minutes <= 0) return "No duration available.";
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours} ${hours > 1 ? "hours" : "hour"}${remainingMinutes > 0 ? ` and ${remainingMinutes} minutes` : ""}`;
  };

  useEffect(() => {
    axios.get(`${apiUrl}/api/places/${placeId}/details`)
      .then(res => {
        // Assuming response is { place: { ... }, details: { ... } }
        setData(res.data);
      })
      .catch(err => console.error(err));
  }, [placeId, apiUrl]);

  useEffect(() => {
    if (!data.details?.latitude || !data.details?.longitude || mapRef.current) return;

    const { latitude, longitude } = data.details;

    mapRef.current = new maplibregl.Map({
      container: mapContainer.current,
      style: "https://raw.githubusercontent.com/go2garret/maps/main/src/assets/json/openStreetMap.json", // You can replace with your own style
      center: [longitude, latitude],
      zoom: 14,
    });

    new maplibregl.Marker().setLngLat([longitude, latitude]).addTo(mapRef.current);
  }, [data.details]);

  if (!data.place || !data.details) return <p className="p-4">Loading...</p>;

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  const formatHours = (open, close) => {
    if (
      (!open || !close) ||
      open === "Closed" || close === "Closed" ||
      open === "" || close === ""
    ) {
      return "Closed";
    }
  
    const openArr = Array.isArray(open) ? open : open.split(" - ");
    const closeArr = Array.isArray(close) ? close : close.split(" - ");
  
    return openArr.map((o, idx) => `${o} - ${closeArr[idx] || "?"}`).join(" & ");
  };
  
  const { place, details } = data;

  const hasAnyContact = details.phone || details.email || details.website || details.instagram;

  return (
    <div className="p-6">
      <Header
        title={place.name}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />
      
      
      <div className="badge badge-secondary p-2">{place.category}</div>
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

      <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-6 transition duration-300 mb-6">
        <h2 className="text-xl text-[#282c34] font-bold mb-3 flex items-center gap-2">
          📝 <span>Description</span>
        </h2>
        <p className="text-gray-600 leading-relaxed">
          {details.description || "No description available."}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-6 transition duration-300">
          <h2 className="text-xl text-[#282c34] font-bold mb-3 flex items-center gap-2">
            ⏱️ <span>Duration</span>
          </h2>
          <p className="text-gray-600 leading-relaxed">
            {formatDuration(details.duration) || "No duration available."}
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-6 transition duration-300">
          <h2 className="text-xl text-[#282c34] font-bold mb-3 flex items-center gap-2">
            ♿ <span>Accessibility</span>
          </h2>
          <p className="text-gray-600 leading-relaxed">
            {details.accessibilityInfo?.replace("_", " ") || "No accessibility info provided."}
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-6 transition duration-300">
          <h2 className="text-xl text-[#282c34] font-bold mb-3 flex items-center gap-2">
            🗺️ <span>Location Details</span>
          </h2>
          <p className="text-gray-600 leading-relaxed">
            {details.locationDetails || "No location details provided."}
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-6 transition duration-300">
          <h2 className="text-xl text-[#282c34] font-bold mb-3 flex items-center gap-2">
            💳 <span>Prices</span>
          </h2>
          <p className="text-gray-600 leading-relaxed whitespace-pre-line">
            {details.price || "No prices details provided."}
          </p>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-6 transition duration-300 mb-6">
        <h2 className="text-xl text-[#282c34] font-bold mb-3 flex items-center gap-2">
          🕒 <span>Opening Hours</span>
        </h2>
        <table className="w-full text-gray-600">
          <tbody>
            {daysOfWeek.map((day, index) => (
              <tr key={day} className="border-b last:border-b-0">
                <td className="py-2 font-medium">{day}</td>
                <td className="py-2 text-right">
                  {formatHours(details.openingHours?.[index], details.closingHours?.[index])}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-3 flex items-center gap-2">📍 <span>Map</span></h2>
        <div
          ref={mapContainer}
          className="h-80 w-full rounded-2xl shadow-lg border border-gray-200 mb-6"
        />
      </div>

      <h2 className="text-xl text-white font-bold mb-3 flex items-center gap-2">
        📞 <span>Contact</span>
      </h2>

      {hasAnyContact && (
        <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-6 transition duration-300 mb-6">
          <ul className="text-gray-600 leading-relaxed space-y-2">
            {details.phone && (
              <li><strong>Phone:</strong> {details.phone}</li>
            )}
            {details.email && (
              <li><strong>Email:</strong> <a href={`mailto:${details.email}`} className="text-blue-600 hover:underline">{details.email}</a></li>
            )}
            {details.website && (
              <li><strong>Website:</strong> <a href={`https://${details.website}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{details.website}</a></li>
            )}
            {details.instagram && (
              <li><strong>Instagram:</strong> <a href={`https://instagram.com/${details.instagram}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">@{details.instagram}</a></li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
