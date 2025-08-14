// WebsiteStructures.tsx
import React, { useEffect, useState } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { Html } from "@react-three/drei";

interface Site {
  name: string;
  url: string;
  rank: number;
}

interface BuildingPart {
  style: string;
  color: string;
  size?: string;
}

interface BuildingPlan {
  roof: BuildingPart;
  walls: BuildingPart;
  decorations?: any[];
}

interface WebStructResponse {
  site_name: string;
  plan: BuildingPlan;
}

// Generic Roof component that uses style from backend
const Roof: React.FC<BuildingPart> = ({ style, color, size }) => {
  switch (style) {
    case "cone":
      return (
        <mesh position={[0, 1.5, 0]}>
          <coneGeometry args={[1.2, 1, 4]} />
          <meshStandardMaterial color={color} />
        </mesh>
      );
    case "pyramid":
      return (
        <mesh position={[0, 1.5, 0]}>
          <coneGeometry args={[1.2, 1, 4]} />
          <meshStandardMaterial color={color} />
        </mesh>
      );
    case "flat":
      return (
        <mesh position={[0, 1.5, 0]}>
          <cylinderGeometry args={[1.2, 1.2, 0.2, 32]} />
          <meshStandardMaterial color={color} />
        </mesh>
      );
    default:
      return null;
  }
};

// Generic Walls component that uses style from backend
const Walls: React.FC<BuildingPart> = ({ style, color, size }) => {
  switch (style) {
    case "box":
      return (
        <mesh>
          <boxGeometry args={[2, 1.5, 2]} />
          <meshStandardMaterial color={color} />
        </mesh>
      );
    case "cylinder":
      return (
        <mesh>
          <cylinderGeometry args={[1, 1, 1.5, 32]} />
          <meshStandardMaterial color={color} />
        </mesh>
      );
    default:
      return null;
  }
};

// Decorations renderer
const Decorations: React.FC<{ decorations?: any[] }> = ({ decorations }) => {
  if (!decorations) return null;
  return (
    <>
      {decorations.map((dec, i) => {
        if (dec.type === "sign") {
          return (
            <Html key={i} position={[0, 2.5, 0]}>
              <div style={{ color: dec.color || "white", fontSize: "0.8rem" }}>
                {dec.text}
              </div>
            </Html>
          );
        }
        // Add more decoration types as needed
        return null;
      })}
    </>
  );
};

export const WebsiteStructures: React.FC = () => {
  const [plans, setPlans] = useState<WebStructResponse[]>([]);

  useEffect(() => {
    const fetchSitesAndPlans = async () => {
      try {
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

        const webstructRes = await fetch("http://localhost:8010/webstruct", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sites,
            use_local: true,
            use_gemini: false,
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

      {plans.map((item, idx) => (
        <group key={item.site_name} position={[idx * 4, 0, 0]}>
          <Walls {...item.plan.walls} />
          <Roof {...item.plan.roof} />
          <Decorations decorations={item.plan.decorations} />
        </group>
      ))}
    </Canvas>
  );
};
