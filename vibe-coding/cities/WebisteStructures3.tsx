// WebsiteStructures.tsx
import React, { useEffect, useState } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { Html } from "@react-three/drei";

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

interface Site {
  name: string;
  url: string;
  rank: number;
}

interface BuildingPlan {
  roof: { style: string; color: string; size?: string };
  walls: { style: string; color: string; size?: string };
  decorations?: any[];
}

interface WebStructResponse {
  site_name: string;
  plan: BuildingPlan;
}

export const WebsiteStructures: React.FC = () => {
  const [plans, setPlans] = useState<WebStructResponse[]>([]);

  useEffect(() => {
    const fetchSitesAndPlans = async () => {
      try {
        // Fetch Tranco list
        const res = await fetch("https://tranco-list.eu/top-1m.csv");
        const text = await res.text();

        const sites: Site[] = text
          .split("\n")
          .slice(0, 10)
          .map((line) => {
            const [rank, domain] = line.split(",");
            return {
              name: domain,
              url: `https://${domain}`,
              rank: parseInt(rank),
            };
          })
          .filter((s) => !!s.name);

        // Send to backend /webstruct endpoint
        const webstructRes = await fetch("http://localhost:8010/webstruct", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sites,
            use_local: true,
            use_gemini: false, // AI off for now, backend can mock
          }),
        });

        const plansData: WebStructResponse[] = await webstructRes.json();
        setPlans(plansData);
      } catch (err) {
        console.error("Error fetching site data or plans", err);
      }
    };

    fetchSitesAndPlans();
  }, []);

  return (
    <Canvas camera={{ position: [0, 5, 20], fov: 50 }}>
      <ambientLight />
      <directionalLight position={[5, 5, 5]} />

      {plans.map((item, idx) => {
        const { roof, walls } = item.plan;
        return (
          <group key={item.site_name} position={[idx * 4, 0, 0]}>
            <Walls color={walls.color} />
            <Roof color={roof.color} />
            <Html position={[0, 3, 0]}>
              <div style={{ color: "white", fontSize: "0.8rem" }}>
                {item.site_name}
              </div>
            </Html>
          </group>
        );
      })}
    </Canvas>
  );
};
