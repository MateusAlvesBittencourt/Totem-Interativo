// floor.tsx
import React from "react";
import { FLOOR_COLOR } from "../../constants/mapconstants";

const Floor: React.FC = () => {
  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      position={[10, 0, 7]}
      name="FloorMesh"
    >
      <planeGeometry args={[12, 12]} />
      <meshStandardMaterial color={FLOOR_COLOR} roughness={0.8} />
    </mesh>
  );
};

export default Floor;
