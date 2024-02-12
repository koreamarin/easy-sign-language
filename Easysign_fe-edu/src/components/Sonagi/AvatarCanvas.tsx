import { Canvas } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import AvatarManager from "../common/AvatarManager";
import { OrbitControls } from "@react-three/drei";
import FaceLandmarkManager from "../common/FaceLandmarkManager";

// 본래 모델 이미지가 로딩되는 동안 보여줄 prompt문을 canvas 에 출력하는 기능인데,
// 실제 모델이 모델링 되는 좌표와 prompt문이 출력되는 좌표 차이가 커서 잘 출력되지 않습니다.
// 추후에 좌표를 계산해서 출력할 예정입니다.
// import { Float, Text3D } from "@react-three/drei";

interface AvatarCanvasProps {
  width: number;
  height: number;
  url: string;
  avatar_name: string;
}

const AvatarCanvas = ({ width, height, url, avatar_name }: AvatarCanvasProps) => {
  const [scene, setScene] = useState<THREE.Scene | null>();
  const [isLoading, setIsLoading] = useState(true);
  const avatarManagerRef = useRef<AvatarManager>(AvatarManager.getInstance());
  const requestRef = useRef(0);

  const animate = () => {
    const results = FaceLandmarkManager.getInstance().getResults();
    avatarManagerRef.current.updateFacialTransforms(results, true);
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    const avatarManager = AvatarManager.getInstance();
    console.log("useEffect on AvatarCanvas : ");
    console.log("url : ", url);
    avatarManager
      .loadAnimal(url, avatar_name)
      .then(() => {
        console.log("LoadAnimal .then");
        setScene(avatarManager.getScene());
        setIsLoading(false);
      })
      .catch((e) => {
        console.log("LoadAnimal .catch");
        alert(e);
      });
  }, [url, avatar_name]);

  return (
    <div
      className="absolute"
      style={{ width: width, height: height, position: "absolute", top: 0 }}
    >
      <Canvas camera={{ fov: 30, position: [0.0, 0.5, 200] }}>
        <ambientLight />
        <directionalLight />
        <OrbitControls
          target={[0, 0.6, 0]}
          enableDamping={false}
          enableRotate={false}
          enableZoom={false}
          enablePan={false}
        />
        {scene && <primitive object={scene} />}

        {/* 모델 이미지가 로딩 될 동안 'loading' 글자를 출력하는 부분입니다. */}
        {/* {isLoading && (
          <Float floatIntensity={1} speed={1}>
            <Text3D
              font={"../assets/Open_Sans_Condensed_Bold.json"}
              scale={100000}
              position={[-0.1, 0.6, 200]}
              bevelEnabled
              bevelSize={0.05}
            >
              loading...
              <meshNormalMaterial />
            </Text3D>
          </Float>
        )} */}
      </Canvas>
    </div>
  );
};

export default AvatarCanvas;
