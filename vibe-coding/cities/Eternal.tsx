// EternalRankDriftConstellation.tsx
import { RigidBody } from "@react-three/rapier";
import { Html } from "@react-three/drei";
import React, { useState, useEffect, useRef } from "react";
import * as THREE from "three";

interface Site {
  name: string;
  url: string;
  rank: number; // current interpolated rank
  targetRank: number; // rank we are drifting toward
}

const CATEGORY_SIZE = 10;
const BASE_DISTANCE = 10;
const CATEGORY_DISTANCE_INC = 5;
const RANK_DRIFT_SPEED = 0.02; // how quickly ranks interpolate
const POS_DRIFT_SPEED = 0.05;  // how quickly positions interpolate
const UPDATE_INTERVAL = 15000; // fetch new ranks every 15s

const computePosition = (rank: number): THREE.Vector3 => {
  const category = Math.floor((rank - 1) / CATEGORY_SIZE);
  const radius = BASE_DISTANCE + category * CATEGORY_DISTANCE_INC;
  const angle = (rank * 137.5 * Math.PI) / 180;
  const height = Math.random() * 5 + 1;
  return new THREE.Vector3(
    Math.cos(angle) * radius,
    height,
    Math.sin(angle) * radius
  );
};

const EternalRankDriftConstellation: React.FC = () => {
  const [sites, setSites] = useState<Site[]>([]);
  const positionsRef = useRef<{ [key: string]: THREE.Vector3 }>({});

  const fetchTrancoData = async () => {
    try {
      const res = await fetch("https://tranco-list.eu/top-1m.csv");
      const text = await res.text();
      const rows = text.split("\n").slice(0, 50);
      const newSites: Site[] = rows.map((line, i) => {
        const domain = line.split(",")[1];
        return {
          name: domain,
          url: `https://${domain}`,
          rank: i + 1,
          targetRank: i + 1
        };
      });

      setSites(prevSites => {
        // Preserve current rank but update targetRank
        return newSites.map(newSite => {
          const oldSite = prevSites.find(s => s.name === newSite.name);
          return oldSite
            ? { ...oldSite, targetRank: newSite.rank }
            : newSite;
        });
      });
    } catch (err) {
      console.error("Failed to fetch Tranco data:", err);
    }
  };

  useEffect(() => {
    fetchTrancoData();
    const interval = setInterval(fetchTrancoData, UPDATE_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  // Animate rank drift & position easing
  useEffect(() => {
    const animate = () => {
      setSites(prevSites =>
        prevSites.map(site => {
          const newRank =
            site.rank + (site.targetRank - site.rank) * RANK_DRIFT_SPEED;
          return { ...site, rank: newRank };
        })
      );

      sites.forEach(site => {
        if (!positionsRef.current[site.name]) {
          positionsRef.current[site.name] = computePosition(site.rank);
        }
        const currentPos = positionsRef.current[site.name];
        const targetPos = computePosition(site.rank);
        currentPos.lerp(targetPos, POS_DRIFT_SPEED);
      });

      requestAnimationFrame(animate);
    };
    animate();
  }, [sites]);

  return (
    <>
      {sites.map(site => {
        const pos = positionsRef.current[site.name] || new THREE.Vector3();
        return (
          <RigidBody
            key={site.name}
            type="kinematicPosition"
            position={pos.toArray()}
          >
            <mesh>
              <sphereGeometry args={[1, 32, 32]} />
              <meshStandardMaterial color="violet" emissive="purple" emissiveIntensity={0.6} />
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

export default EternalRankDriftConstellation;
