// sceneexporterimporter.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { forwardRef, useImperativeHandle, useState } from "react";
import { useThree } from "@react-three/fiber";
import { GLTFExporter, GLTFLoader } from "three-stdlib";
import * as THREE from "three";
import {
  BLOCK_DEFAULT_COLOR,
  PATH_COLOR,
  FLOOR_COLOR,
  TEXT_COLOR,
  POINTER_YELLOW,
  POINTER_GREEN,
} from "../../constants/mapconstants";

export type ExporterImporterHandle = {
  exportMap: () => void;
  importMap: (file: File) => void;
};

type Props = {
  onReplaceMap?: () => void;
};

const SceneExporterImporter = forwardRef<ExporterImporterHandle, Props>(
  ({ onReplaceMap }, ref) => {
    const { scene } = useThree();
    const [importedScene, setImportedScene] = useState<THREE.Group | null>(null);

    const exportMap = () => {
      const exporter = new GLTFExporter();
      const exportGroup = scene.getObjectByName("exportGroup");

      if (!exportGroup) {
        console.error("Grupo 'exportGroup' não encontrado.");
        return;
      }

      const clonedGroup = exportGroup.clone(true);
      clonedGroup.traverse((obj) => {
        obj.userData = {};
        obj.parent = null;
      });

      exporter.parse(
        clonedGroup,
        (gltf) => {
          const blob = new Blob([gltf as BlobPart], {
            type: "model/gltf-binary",
          });
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = "map-export.glb";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
        },
        (err) => console.error(err),
        { binary: true }
      );
    };

    const importMap = (file: File) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const data = event.target?.result;
        if (!data) return;

        const loader = new GLTFLoader();
        loader.parse(
          data as ArrayBuffer,
          "",
          (gltf) => {
            if (importedScene) {
              scene.remove(importedScene);
              setImportedScene(null);
            }

            gltf.scene.name = "exportGroup";

            gltf.scene.traverse((child) => {
              if ((child as THREE.Mesh).isMesh) {
                const mesh = child as THREE.Mesh;
                const name = mesh.name || "";

                if (mesh.geometry?.groups) {
                  mesh.geometry.groups = [];
                }

                if (name.includes("Block")) {
                  mesh.material = new THREE.MeshStandardMaterial({
                    color: BLOCK_DEFAULT_COLOR,
                    roughness: 0.5,
                    metalness: 0.3,
                    side: THREE.DoubleSide,
                  });
                  mesh.userData.isBlock = true;
                } else if (name.includes("Path")) {
                  mesh.material = new THREE.MeshStandardMaterial({
                    color: PATH_COLOR,
                    roughness: 0.7,
                    side: THREE.DoubleSide,
                  });
                } else if (name.includes("Floor")) {
                  mesh.material = new THREE.MeshStandardMaterial({
                    color: FLOOR_COLOR,
                    roughness: 0.8,
                    side: THREE.DoubleSide,
                  });
                } else if (name.includes("TextGeo-")) {
                  mesh.material = new THREE.MeshStandardMaterial({
                    color: TEXT_COLOR,
                    side: THREE.DoubleSide,
                  });
                }
              }
            });
            const light = new THREE.AmbientLight(0xffffff, 1.5);
            gltf.scene.add(light);
            setImportedScene(gltf.scene);
            onReplaceMap?.();
          },
          (error) => {
            console.error("Falha ao carregar GLTF:", error);
          }
        );
      };
      reader.readAsArrayBuffer(file);
    };

    const handlePointerDown = (e: any) => {
      e.stopPropagation();
      const object = e.object as THREE.Mesh;
      if (!object || !object.userData.isBlock) return;

      const matOrArray = object.material;

      const toggleColor = (mat: THREE.MeshStandardMaterial) => {
        const currentHex = mat.color.getHex();
        mat.color.setHex(
          currentHex === parseInt(POINTER_YELLOW, 16) ? parseInt(POINTER_GREEN, 16) : parseInt(POINTER_YELLOW, 16)
        );
      };

      if (Array.isArray(matOrArray)) {
        matOrArray.forEach((m) => {
          if (m instanceof THREE.MeshStandardMaterial) toggleColor(m);
        });
      } else if (matOrArray instanceof THREE.MeshStandardMaterial) {
        toggleColor(matOrArray);
      }
    };

    const ImportedGltf = () => {
      if (!importedScene) return null;
      return (
        <primitive object={importedScene} onPointerDown={handlePointerDown} />
      );
    };

    useImperativeHandle(ref, () => ({
      exportMap,
      importMap,
    }));

    return <>{importedScene && <ImportedGltf />}</>;
  }
);

SceneExporterImporter.displayName = "SceneExporterImporter";

export default SceneExporterImporter;
