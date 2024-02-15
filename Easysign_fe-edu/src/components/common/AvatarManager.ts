import * as THREE from "three";
import { loadGltf } from "./utils/loaders";
import { FaceLandmarkerResult } from "@mediapipe/tasks-vision";
import { decomposeMatrix } from "./utils/decomposeMatrix";

class AvatarManager {
  private static instance: AvatarManager = new AvatarManager();
  private scene!: THREE.Scene;
  isModelLoaded = false;
  private avatar_list: String[] = [
    "Bear",
    "Cat",
    "Chicken",
    "Deer",
    "Dog",
    "Elephant",
    "Pig",
    "Rabbit",
  ];

  private avatar_name!: string;

  private constructor() {
    this.scene = new THREE.Scene();
  }

  static getInstance(): AvatarManager {
    return AvatarManager.instance;
  }

  getScene = () => {
    return this.scene;
  };

  loadAnimal = async (url: string, avatar_chosen: string) => {
    this.isModelLoaded = false;
    if (this.scene.children.length === 1) {
      this.scene.children[0].removeFromParent();
    }
    const gltf = await loadGltf(url);

    //각 동물 아바타 모델명의 prefix
    const prefix: string = "AnimalFace_";
    this.avatar_name = prefix + avatar_chosen;
    //선택된 모델을 제외하고 모두 없애기
    this.avatar_list.forEach((avatar) => {
      if (avatar !== avatar_chosen) {
        gltf.scene
          .getObjectByName(
            prefix + avatar // "AnimalFace_(avatar_name)"
          )!
          .removeFromParent();
      }
    });

    gltf.scene.traverse((obj) => (obj.frustumCulled = false));
    this.scene.clear();
    this.scene.add(gltf.scene);
    this.scene.scale.set(1, 1, 1);
    this.scene.position.set(0, 0, 0);

    const root_face = this.scene.getObjectByName("RootNode");
    root_face?.position.set(0, 0.5, 0);

    this.isModelLoaded = true;
  };

  updateFacialTransforms = (results: FaceLandmarkerResult, flipped = true) => {
    if (!results || !this.isModelLoaded) return;

    this.updateBlendShapes(results, flipped);
    this.updateTranslation(results, flipped);
  };

  updateBlendShapes = (results: FaceLandmarkerResult, flipped = true) => {
    if (!results.faceBlendshapes) return;

    const blendShapes = results.faceBlendshapes[0]?.categories;
    if (!blendShapes) return;

    this.scene.traverse((obj) => {
      if ("morphTargetDictionary" in obj && "morphTargetInfluences" in obj) {
        const morphTargetDictionary = obj.morphTargetDictionary as {
          [key: string]: number;
        };
        const morphTargetInfluences = obj.morphTargetInfluences as Array<number>;

        for (const { score, categoryName } of blendShapes) {
          let updatedCategoryName = categoryName;
          if (flipped && categoryName.includes("Left")) {
            updatedCategoryName = categoryName.replace("Left", "Right");
          } else if (flipped && categoryName.includes("Right")) {
            updatedCategoryName = categoryName.replace("Right", "Left");
          }
          const index = morphTargetDictionary[updatedCategoryName];
          morphTargetInfluences[index] = score;
        }
      }
    });
  };

  updateTranslation = (results: FaceLandmarkerResult, flipped = true) => {
    if (!results.facialTransformationMatrixes) return;

    const matrixes = results.facialTransformationMatrixes[0]?.data;
    if (!matrixes) return;

    const { translation, rotation, scale } = decomposeMatrix(matrixes);
    const euler = new THREE.Euler(rotation.x, rotation.y, rotation.z, "ZYX");
    const quaternion = new THREE.Quaternion().setFromEuler(euler);
    if (flipped) {
      // flip to x axis
      quaternion.y *= -1;
      quaternion.z *= -1;
      translation.x *= -1;
    }

    const Head = this.scene.getObjectByName(this.avatar_name);

    Head?.quaternion.slerp(quaternion, 1);
    Head?.rotateX(-Math.PI / 2);
    const root = this.scene.getObjectByName(this.avatar_name);

    const trans_rate_xy = 6;
    const trans_rate_z = 6;
    root?.position.set(
      (translation.x * trans_rate_xy) / (translation.z * -0.04),
      ((translation.y - 1) * trans_rate_xy) / (translation.z * -0.04),
      translation.z * trans_rate_z
    );
  };
}

export default AvatarManager;
