// MapComponent.tsx
"use client";
import React, { useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Bounds } from "@react-three/drei";
import MapScene from "./Mapscene";
import SceneExporterImporter from "./Sceneexporterimporter";
import { MapContainer } from "./Map.style";
import * as THREE from "three";
const MapComponent: React.FC = () => {
  const [showInitialMap, setShowInitialMap] = useState(true);

  const sceneExporterImporterRef = useRef<{
    exportMap: () => void;
    importMap: (file: File) => void;
  }>(null);

  return (
    <MapContainer onContextMenu={(e) => e.preventDefault()}>
      <Canvas
        camera={{
          fov: 20,
          position: [10, 60, -70],
        }}
      >
        <OrbitControls
          makeDefault
          target={[10, 0.5, 7]}
          minDistance={9}
          maxDistance={12}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2.5}
          mouseButtons={{
            LEFT: THREE.MOUSE.ROTATE,
            MIDDLE: THREE.MOUSE.DOLLY,
            RIGHT: undefined, // Desabilita o botão direito
          }}
        />

        <Bounds fit clip observe margin={1}>
          <group name="exportGroup" scale={[-1, 1, 1]}>
            {showInitialMap && <MapScene />}
          </group>
        </Bounds>

        <SceneExporterImporter
          ref={sceneExporterImporterRef}
          onReplaceMap={() => setShowInitialMap(false)}
        />
      </Canvas>
    </MapContainer>
  );
};

export default MapComponent;
