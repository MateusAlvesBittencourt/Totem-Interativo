import React from "react";
import Block, { BlockProps } from "./Block";
import Path from "./Path";
import Floor from "./Floor";

const MapScene: React.FC = () => {
  const blocks: BlockProps[] = [
    { position: [7, 0.5, 3], size: [1, 1, 2], label: "A" },
    { position: [7, 0.5, 5.5], size: [1, 1, 2], label: "B" },
    { position: [7, 0.5, 8], size: [1, 1, 2], label: "C" },
    { position: [7, 0.5, 10.5], size: [1, 1, 2], label: "D" },
    { position: [9, 0.5, 12], size: [2, 1, 1], label: "E" },
    { position: [11.5, 0.5, 12], size: [2, 1, 1], label: "F" },
    { position: [10, 0.5, 8], size: [1, 1, 2], label: "G" },
    { position: [10, 0.5, 5.5], size: [1, 1, 2], label: "H" },
    { position: [10, 0.5, 3], size: [1, 1, 2], label: "I" },
  ];

  return (
    <>
      <ambientLight intensity={1.5} />

      <Floor />
      <Path position={[11.5, 0, 10.2]} size={[8, 0.1, 2.5]} />
      <Path position={[8.5, 0, 5.5]} size={[2, 0.1, 8]} />
      {blocks.map((block, idx) => (
        <Block key={idx} {...block} />
      ))}
    </>
  );
};

export default MapScene;
