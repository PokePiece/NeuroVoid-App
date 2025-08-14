import { RigidBody } from "@react-three/rapier";
import { Html } from "@react-three/drei";
import React, { useState, useEffect, useMemo } from "react";

// Simple random positioning
const randomPosition = (min = 10, max = 25) => {
  let x = 0, z = 0;
  while (Math.sqrt(x * x + z * z) < min) {
    x = Math.random() * (max * 2) - max;
    z = Math.random() * (max * 2) - max;
  }
  const y = Math.random() * 5 + 3;
  return [x, y, z] as [number, number, number];
};

const TrendingPortals: React.FC<{ count?: number }> = ({ count = 5 }) => {
  const [sites, setSites] = useState<{ name: string; url: string }[]>([]);
  const [activeSite, setActiveSite] = useState<string | null>(null);

  // Fetch top sites from Tranco API or fallback
  useEffect(() => {
    const fetchSites = async () => {
      try {
        const res = await fetch("https://tranco-list.eu/top-1m.csv");
        const text = await res.text();
        const lines = text.split("\n").slice(0, count);
        const data = lines.map((line, i) => {
          const domain = line.split(",")[1];
          return { name: domain, url: `https://${domain}` };
        });
        setSites(data);
      } catch (e) {
        // fallback list
        setSites([
          { name: "Wikipedia", url: "https://wikipedia.org" },
          { name: "YouTube", url: "https://youtube.com" },
          { name: "Twitter", url: "https://twitter.com" },
          { name: "Instagram", url: "https://instagram.com" },
          { name: "Reddit", url: "https://reddit.com" }
        ]);
      }
    };
    fetchSites();
  }, [count]);

  const positions = useMemo(() => sites.map(() => randomPosition()), [sites]);

  return (
    <>
      {sites.map((site, i) => (
        <RigidBody
          key={site.name}
          colliders="ball"
          position={positions[i]}
          onCollisionEnter={() => setActiveSite(site.url)}
        >
          <mesh>
            <sphereGeometry args={[1, 32, 32]} />
            <meshStandardMaterial color="orange" emissive="gold" />
            <Html position={[0, 1.5, 0]}>
              <div className="text-xs text-white">{site.name}</div>
            </Html>
          </mesh>
        </RigidBody>
      ))}

      {activeSite && (
        <Html fullscreen>
          <div className="absolute inset-0 bg-black/90 flex flex-col">
            <button
              className="bg-red-500 text-white px-4 py-2 text-lg self-end"
              onClick={() => setActiveSite(null)}
            >
              Close
            </button>
            <iframe src={activeSite} className="flex-1 border-none" />
          </div>
        </Html>
      )}
    </>
  );
};

export default TrendingPortals;
