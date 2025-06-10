import { useParams } from "react-router-dom";
import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

import { usePlaylistDetails } from "./scripts/PlaylistDetailsLogic";
import Header from "./general/Header";
import GoBack from "./general/GoBack";
import PlaylistDetailsCard from "./pages/PlaylistDetails/PlaylistDetailsCard";

const PlaylistDetails = () => {
  const { id: playlistId } = useParams();
  const {
    playlist,
    isMenuOpen,
    setIsMenuOpen,
    handleRemovePlace,
    route,
    fetchRoute,
    loadingRoute,
  } = usePlaylistDetails(playlistId);

  const mapRef = useRef(null);
  const mapContainer = useRef(null);

  useEffect(() => {
    if (mapRef.current || !route.length) return;

    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: 
        "https://raw.githubusercontent.com/go2garret/maps/main/src/assets/json/openStreetMap.json",
      center: [route[0].longitude, route[0].latitude],
      zoom: 12,
    });

    mapRef.current = map;

    route.forEach((item, index) => {
    const { latitude, longitude } = item;

    const markerEl = document.createElement("div");
    markerEl.className = `
      flex items-center justify-center
      w-7 h-7 rounded-full bg-blue-600 text-white
      text-sm font-bold ring-2 ring-white shadow
    `;
    markerEl.textContent = (index + 1).toString();

    new maplibregl.Marker({ element: markerEl })
      .setLngLat([longitude, latitude])
      .setPopup(
        new maplibregl.Popup().setText(`${item.time} - ${item.place.name}`)
      )
      .addTo(map);
  });


    const routeCoords = route.map((item) => [item.longitude, item.latitude]);

    map.on("load", () => {
      map.addSource("route", {
        type: "geojson",
        data: {
          type: "Feature",
          geometry: {
            type: "LineString",
            coordinates: routeCoords,
          },
        },
      });

      map.addLayer({
        id: "route-line",
        type: "line",
        source: "route",
        layout: { "line-join": "round", "line-cap": "round" },
        paint: {
          "line-color": "#3b82f6",
          "line-width": 4,
        },
      });
    });
  }, [route]);

  if (!playlist) return <p>Loading...</p>;

  return (
    <div className="p-6 space-y-4">
      <Header
        title={playlist.name}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />
      <GoBack />

      <button
        onClick={fetchRoute}
        className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
        disabled={loadingRoute}
      >
        {loadingRoute ? "Generating..." : "Generate Route"}
      </button>

      {route.length > 0 && (
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-xl shadow">
            <h2 className="text-xl font-bold mb-2">Timetable</h2>
            <ul className="space-y-4">
  {route.map((item, index) => (
    <li key={index} className="flex items-start gap-4">
      <img
        src={item.place.imageUrl}
        alt={item.place.name}
        className="w-16 h-16 object-cover rounded-lg"
      />
      <div>
        <p className="text-blue-600 font-mono">{item.time}</p>
        <p className="font-semibold">{item.place.name}</p>
        <p className="text-sm text-gray-500">{item.place.category}</p>
      </div>
    </li>
  ))}
</ul>

          </div>

          <div
            ref={mapContainer}
            className="w-full h-[500px] rounded-xl shadow"
          />
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {playlist.places.map((place) => (
          <PlaylistDetailsCard
            key={place.id}
            place={place}
            playlistName={playlist.name}
            onRemove={handleRemovePlace}
          />
        ))}
      </div>
    </div>
  );
};

export default PlaylistDetails;