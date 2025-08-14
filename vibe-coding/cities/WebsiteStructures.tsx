// WebsiteStructures.tsx
import React, { useEffect, useState } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { Html } from "@react-three/drei";

// Simple placeholder components
const Roof: React.FC<{ color: string }> = ({ color }) => (
  <mesh position={[0, 1.5, 0]}>
    <coneGeometry args={[1.2, 1, 4]} />
    <meshStandardMaterial color={color} />
  </mesh>
);

const Walls: React.FC<{ color: string }> = ({ color }) => (
  <mesh>
    <boxGeometry args={[2, 1.5, 2]} />
    <meshStandardMaterial color={color} />
  </mesh>
);

// Mock AI decision generator (no actual API call yet)
const mockAIPlanner = (siteData: any) => {
  return {
    roof: { style: "cone", color: siteData.rank <= 5 ? "gold" : "gray" },
    walls: { style: "box", color: siteData.rank <= 5 ? "white" : "lightblue" },
  };
};

export const WebsiteStructures: React.FC = () => {
  const [sites, setSites] = useState<any[]>([]);

  useEffect(() => {
    const fetchSites = async () => {
      try {
        // Example: Tranco list (top sites) – can be swapped with any API
        const res = await fetch("https://tranco-list.eu/top-1m.csv");
        const text = await res.text();

        // Parse CSV into objects
        const parsed = text
          .split("\n")
          .slice(0, 10) // just top 10 for now
          .map((line, index) => {
            const [rank, domain] = line.split(",");
            return {
              name: domain,
              url: `https://${domain}`,
              rank: parseInt(rank),
            };
          });

        setSites(parsed);
      } catch (err) {
        console.error("Error fetching site list", err);
      }
    };

    fetchSites();
  }, []);

  return (
    <Canvas camera={{ position: [0, 5, 10], fov: 50 }}>
      <ambientLight />
      <directionalLight position={[5, 5, 5]} />
      {sites.map((site, idx) => {
        const plan = mockAIPlanner(site);
        return (
          <group key={site.name} position={[idx * 4, 0, 0]}>
            <Walls color={plan.walls.color} />
            <Roof color={plan.roof.color} />
            <Html position={[0, 3, 0]}>
              <div style={{ color: "white", fontSize: "0.8rem" }}>
                {site.name}
              </div>
            </Html>
          </group>
        );
      })}
    </Canvas>
  );
};
