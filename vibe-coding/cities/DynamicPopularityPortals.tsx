import { RigidBody } from "@react-three/rapier";
import { Html } from "@react-three/drei";
import React, { useState, useEffect } from "react";

interface Site {
  name: string;
  url: string;
  rank: number;
}

const DynamicPopularityPortals: React.FC<{ sitesPerRing?: number; baseRadius?: number; ringSpacing?: number }> = ({
  sitesPerRing = 5,
  baseRadius = 5,
  ringSpacing = 3
}) => {
  const [sites, setSites] = useState<Site[]>([]);
  const [activeSite, setActiveSite] = useState<string | null>(null);

  useEffect(() => {
    const fetchSites = async () => {
      try {
        const res = await fetch("https://tranco-list.eu/top-1m.csv");
        const text = await res.text();
        const lines = text.split("\n").slice(0, 100); // example: 100 sites
        const data: Site[] = lines.map((line, i) => {
          const domain = line.split(",")[1];
          return { name: domain, url: `https://${domain}`, rank: i };
        });
        setSites(data);
      } catch {
        // fallback dummy data
        setSites(
          Array.from({ length: 30 }, (_, i) => ({
            name: `Site-${i + 1}`,
            url: `https://example${i + 1}.com`,
            rank: i
          }))
        );
      }
    };
    fetchSites();
  }, []);

  return (
    <>
      {sites.map((site, i) => {
        const ring = Math.floor(site.rank / sitesPerRing);
        const indexInRing = site.rank % sitesPerRing;

        const radius = baseRadius + ring * ringSpacing;
        const angle = (indexInRing / sitesPerRing) * Math.PI * 2;

        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const y = Math.random() * 3 + 2; // add height variety

        return (
          <RigidBody
            key={site.name}
            colliders="ball"
            position={[x, y, z]}
            onCollisionEnter={() => setActiveSite(site.url)}
          >
            <mesh>
              <sphereGeometry args={[1, 32, 32]} />
              <meshStandardMaterial color="orange" emissive="red" />
              <Html position={[0, 1.5, 0]}>
                <div className="text-xs text-white">{site.name}</div>
              </Html>
            </mesh>
          </RigidBody>
        );
      })}

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

export default DynamicPopularityPortals;
