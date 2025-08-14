// ExponentialPopularityPortals.tsx
import { RigidBody } from "@react-three/rapier";
import { Html } from "@react-three/drei";
import React, { useState, useMemo } from "react";

interface Site {
  name: string;
  url: string;
  rank: number; // popularity rank (1 = most popular)
}

// Example data — replace with live fetch later
const sites: Site[] = [
  { name: "Google", url: "https://google.com", rank: 1 },
  { name: "YouTube", url: "https://youtube.com", rank: 2 },
  { name: "Facebook", url: "https://facebook.com", rank: 3 },
  { name: "Wikipedia", url: "https://wikipedia.org", rank: 4 },
  { name: "Instagram", url: "https://instagram.com", rank: 5 },
  { name: "X (Twitter)", url: "https://x.com", rank: 6 },
  { name: "Reddit", url: "https://reddit.com", rank: 7 },
  { name: "Amazon", url: "https://amazon.com", rank: 8 },
  { name: "Netflix", url: "https://netflix.com", rank: 9 },
  { name: "Twitch", url: "https://twitch.tv", rank: 10 },
  // ... more sites
];

// Positioning function
const getPositionForRank = (rank: number, perCategory: number, baseRadius: number, growthFactor: number): [number, number, number] => {
  const categoryIndex = Math.floor((rank - 1) / perCategory);
  const radius = baseRadius * Math.pow(growthFactor, categoryIndex); // exponential growth

  const angle = (rank * 137.5 * Math.PI) / 180; // golden angle for spacing
  const x = radius * Math.cos(angle);
  const z = radius * Math.sin(angle);
  const y = Math.random() * 4 + 1;

  return [x, y, z];
};

const ExponentialPopularityPortals: React.FC = () => {
  const [activeSite, setActiveSite] = useState<string | null>(null);

  const positions = useMemo(() => {
    const perCategory = 5; // sites per distance category
    const baseRadius = 5; // starting radius
    const growthFactor = 1.8; // how much farther each category is than the last
    return sites.map(site => ({
      ...site,
      position: getPositionForRank(site.rank, perCategory, baseRadius, growthFactor),
    }));
  }, []);

  return (
    <>
      {positions.map((site) => (
        <RigidBody
          key={site.name}
          colliders="ball"
          position={site.position}
          onCollisionEnter={() => setActiveSite(site.url)}
        >
          <mesh>
            <sphereGeometry args={[1, 32, 32]} />
            <meshStandardMaterial color="orange" emissive="gold" emissiveIntensity={0.5} />
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

export default ExponentialPopularityPortals;
