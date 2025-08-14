import { RigidBody } from "@react-three/rapier";
import { Html } from "@react-three/drei";
import React, { useState, useEffect } from "react";

interface Site {
  name: string;
  url: string;
  rank: number;
}

const mapRankToRadius = (rank: number, maxRank: number, minRadius = 5, maxRadius = 30) => {
  const t = rank / maxRank; // 0 for top rank, 1 for worst rank in our list
  return minRadius + t * (maxRadius - minRadius);
};

const PopularityOrbitPortals: React.FC<{ count?: number }> = ({ count = 10 }) => {
  const [sites, setSites] = useState<Site[]>([]);
  const [activeSite, setActiveSite] = useState<string | null>(null);

  useEffect(() => {
    const fetchSites = async () => {
      try {
        const res = await fetch("https://tranco-list.eu/top-1m.csv");
        const text = await res.text();
        const lines = text.split("\n").slice(0, count);
        const data: Site[] = lines.map((line, i) => {
          const domain = line.split(",")[1];
          return { name: domain, url: `https://${domain}`, rank: i + 1 };
        });
        setSites(data);
      } catch {
        setSites([
          { name: "Wikipedia", url: "https://wikipedia.org", rank: 1 },
          { name: "YouTube", url: "https://youtube.com", rank: 2 },
          { name: "Twitter", url: "https://twitter.com", rank: 3 },
          { name: "Instagram", url: "https://instagram.com", rank: 4 },
          { name: "Reddit", url: "https://reddit.com", rank: 5 }
        ]);
      }
    };
    fetchSites();
  }, [count]);

  return (
    <>
      {sites.map((site, i) => {
        const radius = mapRankToRadius(site.rank, sites.length);
        const angle = (i / sites.length) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const y = Math.random() * 5 + 2; // small height variation

        return (
          <RigidBody
            key={site.name}
            colliders="ball"
            position={[x, y, z]}
            onCollisionEnter={() => setActiveSite(site.url)}
          >
            <mesh>
              <sphereGeometry args={[1, 32, 32]} />
              <meshStandardMaterial color="skyblue" emissive="navy" />
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

export default PopularityOrbitPortals;
