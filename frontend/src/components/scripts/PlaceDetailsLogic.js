import { useEffect, useRef, useState } from "react";
import axios from "axios";
import maplibregl from "maplibre-gl";

export function usePlaceDetails(placeId) {
  const [data, setData] = useState({ place: null, details: null });
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    axios
      .get(`${apiUrl}/api/places/${placeId}/details`)
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  }, [placeId, apiUrl]);

  return data;
}

export function useMapInitialization(details, mapContainerRef) {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!details?.latitude || !details?.longitude || mapRef.current) return;

    const { latitude, longitude } = details;

    mapRef.current = new maplibregl.Map({
      container: mapContainerRef.current,
      style: "https://raw.githubusercontent.com/go2garret/maps/main/src/assets/json/openStreetMap.json",
      center: [longitude, latitude],
      zoom: 14,
    });

    new maplibregl.Marker().setLngLat([longitude, latitude]).addTo(mapRef.current);
  }, [details, mapContainerRef]);
}

export function formatDuration(minutes) {
  if (!minutes || minutes <= 0) return "No duration available.";
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours} ${hours > 1 ? "hours" : "hour"}${remainingMinutes > 0 ? ` and ${remainingMinutes} minutes` : ""}`;
}

export function formatHours(open, close) {
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
}
