import { useRef, useState } from "react";
import { useParams } from "react-router-dom";

import "maplibre-gl/dist/maplibre-gl.css";

import {
  usePlaceDetails,
  useMapInitialization,
  formatDuration,
  formatHours,
} from "./scripts/PlaceDetailsLogic";

import Header from "./general/Header";
import GoBack from "./general/GoBack";

import CardSection from "./pages/PlaceDetails/CardSection";
import OpeningHoursCard from "./pages/PlaceDetails/OpeningHoursCard";
import ContactCard from "./pages/PlaceDetails/ContactCard";

export default function PlaceDetailsPage() {
  const { id: placeId } = useParams();
  const mapContainer = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const data = usePlaceDetails(placeId);
  useMapInitialization(data.details, mapContainer);

  if (!data.place || !data.details) return <p className="p-4">Loading...</p>;

  const { place, details } = data;
  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Header
        title={place.name}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />

      <GoBack />

      <div className="badge badge-secondary p-2">{place.category}</div>

      <img
        src={place.imageUrl}
        alt={place.name}
        className="w-full h-96 object-cover rounded-xl overflow-hidden shadow-xl my-8"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "https://via.placeholder.com/600x400?text=No+Image";
        }}
      />

      <CardSection icon="📝" title="Description" className="mb-6">
        {details.description || "No description available."}
      </CardSection>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <CardSection icon="⏱️" title="Duration">
          {formatDuration(details.duration) || "No duration available."}
        </CardSection>

        <CardSection icon="♿" title="Accessibility">
          {details.accessibilityInfo?.replace("_", " ") ||
            "No accessibility info provided."}
        </CardSection>

        <CardSection icon="🗺️" title="Location Details">
          {details.locationDetails || "No location details provided."}
        </CardSection>

        <CardSection icon="💳" title="Prices">
          <pre className="whitespace-pre-line">
            {details.price || "No prices details provided."}
          </pre>
        </CardSection>
      </div>

      <OpeningHoursCard
        daysOfWeek={daysOfWeek}
        openingHours={details.openingHours}
        closingHours={details.closingHours}
        formatHours={formatHours}
      />

      <div>
        <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
          📍 <span>Map</span>
        </h2>
        <div
          ref={mapContainer}
          className="h-80 w-full rounded-2xl shadow-lg border border-gray-200 mb-6"
        />
      </div>

      <ContactCard
        phone={details.phone}
        email={details.email}
        website={details.website}
        instagram={details.instagram}
      />
    </div>
  );
}
