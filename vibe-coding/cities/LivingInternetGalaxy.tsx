// LivingInternetGalaxy.tsx
import { RigidBody } from "@react-three/rapier";
import { Html } from "@react-three/drei";
import React, { useState, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

interface Site {
  name: string;
  url: string;
  rank: number; // 1 = most popular
}

const CATEGORY_SIZE = 10;        // Every 10 ranks = new category
const BASE_DISTANCE = 10;        // Minimum distance from origin
const CATEGORY_DISTANCE_INC = 5; // Extra per category
const SMOOTH_SPEED = 0.05;       // Position easing factor

const fetchSites = async (limit: number): Promise<Site[]> => {
  const res = await fetch("https://tranco-list.eu/top-1m.csv");
  const text = await res.text();
  const lines = text.split("\n").slice(0, limit);

  return lines
    .map((line, i) => {
      const parts = line.split(",");
      const domain = parts[1]?.trim();
      if (!domain) return null;
      return {
        name: domain,
        url: `https://${domain}`,
        rank: i + 1,
      };
    })
    .filter((site): site is Site => site !== null);
};

const computeTargetPosition = (rank: number): [number, number, number] => {
  const category = Math.floor((rank - 1) / CATEGORY_SIZE);
  const radius = BASE_DISTANCE + category * CATEGORY_DISTANCE_INC;
  const angle = (rank * 137.5 * Math.PI) / 180; // golden angle spacing
  const height = Math.random() * 5 + 1;
  return [Math.cos(angle) * radius, height, Math.sin(angle) * radius];
};

const LivingInternetGalaxy: React.FC = () => {
  const [sites, setSites] = useState<Site[]>([]);
  const positionsRef = useRef<{ [key: string]: THREE.Vector3 }>({});

  // Fetch live Tranco sites
  useEffect(() => {
    fetchSites(50).then(setSites);
  }, []);

  // Compute target positions from rank
  const targetPositions = useMemo(() => {
    return sites.reduce((acc, site) => {
      acc[site.name] = new THREE.Vector3(...computeTargetPosition(site.rank));
      return acc;
    }, {} as { [key: string]: THREE.Vector3 });
  }, [sites]);

  // Simulate ranks changing over time
  useEffect(() => {
    const interval = setInterval(() => {
      setSites((prev) => {
        const shuffled = [...prev].sort(() => Math.random() - 0.5);
        return shuffled.map((site, i) => ({ ...site, rank: i + 1 }));
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Initialize starting positions
  useEffect(() => {
    sites.forEach((site) => {
      if (!positionsRef.current[site.name]) {
        positionsRef.current[site.name] = new THREE.Vector3(...computeTargetPosition(site.rank));
      }
    });
  }, [sites]);

  // Easing towards targets
  useEffect(() => {
    const animate = () => {
      sites.forEach((site) => {
        const current = positionsRef.current[site.name];
        const target = targetPositions[site.name];
        if (current && target) {
          current.lerp(target, SMOOTH_SPEED);
        }
      });
      requestAnimationFrame(animate);
    };
    animate();
  }, [targetPositions, sites]);

  return (
    <>
      {sites.map((site) => {
        const pos = positionsRef.current[site.name] || new THREE.Vector3();
        return (
          <RigidBody key={site.name} type="kinematicPosition" position={pos.toArray()}>
            <mesh>
              <sphereGeometry args={[1, 32, 32]} />
              <meshStandardMaterial color="skyblue" emissive="blue" emissiveIntensity={0.4} />
              <Html position={[0, 1.5, 0]}>
                <div className="text-xs text-white">{site.name}</div>
              </Html>
            </mesh>
          </RigidBody>
        );
      })}
    </>
  );
};

export default LivingInternetGalaxy;
