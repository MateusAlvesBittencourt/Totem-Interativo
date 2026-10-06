/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useMemo } from "react";
import { useLoader } from "@react-three/fiber";
import { FontLoader, TextGeometry } from "three-stdlib";
import * as THREE from "three";
import {
  BLOCK_DEFAULT_COLOR,
  BLOCK_TOGGLE_COLOR,
  TEXT_COLOR,
} from "../../constants/mapconstants";

export type BlockProps = {
  position: [number, number, number];
  size: [number, number, number];
  label: string;
};

const Block: React.FC<BlockProps> = ({ position, size, label }) => {
  const [color, setColor] = useState(BLOCK_DEFAULT_COLOR);
  const font = useLoader(FontLoader, "/fonts/League-Spartan.json");

  const handleBlockClick = () => {
    setColor((prev) =>
      prev === BLOCK_DEFAULT_COLOR ? BLOCK_TOGGLE_COLOR : BLOCK_DEFAULT_COLOR
    );
  };

  const textGeometry = useMemo(() => {
    if (!font) return null;
    const geo = new TextGeometry(label, {
      font: font,
      size: 0.5,
      height: 0.9,
      curveSegments: 12,
      bevelEnabled: false,
    });
    geo.computeBoundingBox();
    if (geo.boundingBox) {
      const xSize = geo.boundingBox.max.x - geo.boundingBox.min.x;
      const ySize = geo.boundingBox.max.y - geo.boundingBox.min.y;
      geo.translate(-xSize / 2, -ySize / 2, 0);
    }
    geo.clearGroups();
    return geo;
  }, [font, label]);

  return (
    <group>
      <mesh
        position={position}
        onClick={handleBlockClick}
        name={`Block-${label}`}
      >
        <boxGeometry args={size} />
        <meshStandardMaterial color={color} roughness={0.5} metalness={0.3} />
      </mesh>
      {textGeometry && (
        <mesh
          geometry={textGeometry}
          position={[
            position[0],
            position[1] + size[1] / 2 + 0.01,
            position[2],
          ]}
          rotation={[Math.PI / 2, 0, 0]}
          name={`TextGeo-${label}`}
        >
          <meshStandardMaterial
            color={TEXT_COLOR}
            roughness={1}
            metalness={0}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}
    </group>
  );
};

export default Block;
