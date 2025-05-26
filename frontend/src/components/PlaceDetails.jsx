import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import "maplibre-gl/dist/maplibre-gl.css";
import Header from './general/Header';
import GoBack from './general/GoBack';
import {
  usePlaceDetails,
  useMapInitialization,
  formatDuration,
  formatHours
} from './scripts/PlaceDetailsLogic';

export default function PlaceDetailsPage() {
  const { id: placeId } = useParams();
  const mapContainer = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false); 

  const data = usePlaceDetails(placeId);
  useMapInitialization(data.details, mapContainer);

  if (!data.place || !data.details) return <p className="p-4">Loading...</p>;

  const { place, details } = data;
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const hasAnyContact = details.phone || details.email || details.website || details.instagram;

  return (
    <div className="p-6">
      <Header
        title={place.name}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />
      <GoBack />
      
      
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

      {hasAnyContact && (
        <>
          <h2 className="text-xl text-white font-bold mb-3 flex items-center gap-2">
            📞 <span>Contact</span>
          </h2>

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
        </>
      )}
    </div>
  );
}
