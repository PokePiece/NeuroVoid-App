// RealTimeInternetConstellation.tsx
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
const UPDATE_INTERVAL = 10000;   // Update every 10 seconds

const computeTargetPosition = (rank: number): [number, number, number] => {
  const category = Math.floor((rank - 1) / CATEGORY_SIZE);
  const radius = BASE_DISTANCE + category * CATEGORY_DISTANCE_INC;
  const angle = (rank * 137.5 * Math.PI) / 180; // golden angle
  const height = Math.random() * 5 + 1;
  return [
    Math.cos(angle) * radius,
    height,
    Math.sin(angle) * radius
  ];
};

const RealTimeInternetConstellation: React.FC = () => {
  const [sites, setSites] = useState<Site[]>([]);
  const positionsRef = useRef<{ [key: string]: THREE.Vector3 }>({});

  // Fetch Tranco top list
  const fetchTrancoData = async () => {
    try {
      const res = await fetch("https://tranco-list.eu/top-1m.csv");
      const text = await res.text();
      const rows = text.split("\n").slice(0, 50); // Top 50
      const parsed: Site[] = rows.map((line, i) => {
        const domain = line.split(",")[1];
        return {
          name: domain,
          url: `https://${domain}`,
          rank: i + 1
        };
      });
      setSites(parsed);
    } catch (err) {
      console.error("Failed to fetch Tranco data:", err);
    }
  };

  useEffect(() => {
    fetchTrancoData();
    const interval = setInterval(fetchTrancoData, UPDATE_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  // Assign target positions
  const targetPositions = useMemo(() => {
    return sites.reduce((acc, site) => {
      acc[site.name] = new THREE.Vector3(...computeTargetPosition(site.rank));
      return acc;
    }, {} as { [key: string]: THREE.Vector3 });
  }, [sites]);

  // Initialize current positions
  useEffect(() => {
    sites.forEach(site => {
      if (!positionsRef.current[site.name]) {
        positionsRef.current[site.name] = new THREE.Vector3(
          ...computeTargetPosition(site.rank)
        );
      }
    });
  }, [sites]);

  // Animate movement towards targets
  useEffect(() => {
    const animate = () => {
      sites.forEach(site => {
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
          <RigidBody
            key={site.name}
            type="kinematicPosition"
            position={pos.toArray()}
          >
            <mesh>
              <sphereGeometry args={[1, 32, 32]} />
              <meshStandardMaterial color="skyblue" emissive="blue" emissiveIntensity={0.5} />
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

export default RealTimeInternetConstellation;
