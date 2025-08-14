import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useState, useEffect } from "react";

const moods = [
  { mood: "Happy", color: "yellow" },
  { mood: "Sad", color: "blue" },
  { mood: "Chaotic", color: "red" },
  { mood: "Chill", color: "green" },
  { mood: "Cursed", color: "purple" },
];

export default function App() {
  const [points, setPoints] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const mood = moods[Math.floor(Math.random() * moods.length)];
      const lat = (Math.random() * 180 - 90).toFixed(2);
      const lng = (Math.random() * 360 - 180).toFixed(2);

      setPoints((prev) => [
        ...prev,
        { id: Date.now(), lat, lng, mood: mood.mood, color: mood.color },
      ]);

      // Remove old points after 10s
      setTimeout(() => {
        setPoints((prev) => prev.filter((p) => Date.now() - p.id < 10000));
      }, 10000);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <MapContainer center={[20, 0]} zoom={2} className="h-screen w-screen">
      <TileLayer
        attribution="© OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {points.map((point) => (
        <CircleMarker
          key={point.id}
          center={[point.lat, point.lng]}
          pathOptions={{ color: point.color, fillColor: point.color, fillOpacity: 0.6 }}
          radius={8}
        >
          <Popup>
            <b>{point.mood}</b>
            <br />
            Lat: {point.lat}, Lng: {point.lng}
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
}
