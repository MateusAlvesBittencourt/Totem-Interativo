// path.tsx
import React from "react";
import { PATH_COLOR } from "../../constants/mapconstants";

export type PathProps = {
  position: [number, number, number];
  size: [number, number, number];
};

const Path: React.FC<PathProps> = ({ position, size }) => {
  return (
    <mesh position={position} name="PathMesh">
      <boxGeometry args={size} />
      <meshStandardMaterial color={PATH_COLOR} roughness={0.7} />
    </mesh>
  );
};

export default Path;
