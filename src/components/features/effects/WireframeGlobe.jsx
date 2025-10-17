import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

function RotatingWireframeSphere() {
  const groupRef = useRef();
  const outlineRef = useRef();
  const { camera } = useThree();

  const TILT_FORWARD = Math.PI / 6;
  const TILT_RIGHT = Math.PI / 8;
  const ROTATION_SPEED = 0.005;
  const RADIUS = 2;
  const NB_SECTIONS = 12;
  const SEGMENTS = 64;


  const meridians = useMemo(() => {
    const lines = [];
    for (let i = 0; i < NB_SECTIONS; i++) {
      const angle = (i / NB_SECTIONS) * Math.PI * 2;
      const points = [];

      for (let j = 0; j <= SEGMENTS; j++) {
        const theta = (j / SEGMENTS) * Math.PI;
        const x = RADIUS * Math.sin(theta) * Math.cos(angle);
        const y = RADIUS * Math.cos(theta);
        const z = RADIUS * Math.sin(theta) * Math.sin(angle);
        points.push(new THREE.Vector3(x, y, z));
      }

      lines.push(points);
    }
    return lines;
  }, []);

  const latitudes = useMemo(() => {
    const lines = [];
    for (let i = 1; i < NB_SECTIONS; i++) {
      const theta = (i / NB_SECTIONS) * Math.PI;
      const points = [];

      for (let j = 0; j <= SEGMENTS; j++) {
        const angle = (j / SEGMENTS) * Math.PI * 2;
        const x = RADIUS * Math.sin(theta) * Math.cos(angle);
        const y = RADIUS * Math.cos(theta);
        const z = RADIUS * Math.sin(theta) * Math.sin(angle);
        points.push(new THREE.Vector3(x, y, z));
      }

      lines.push(points);
    }
    return lines;
  }, []);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotateOnAxis(new THREE.Vector3(0, 1, 0), ROTATION_SPEED);
    }

    if (outlineRef.current) {
      outlineRef.current.quaternion.copy(camera.quaternion);
    }
  });

  return (
    <>
      <group
        ref={groupRef}
        rotation={[TILT_FORWARD, 0, TILT_RIGHT]}
      >
        {meridians.map((points, i) => (
          <line key={`meridian-${i}`}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={points.length}
                array={new Float32Array(points.flatMap(p => [p.x, p.y, p.z]))}
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial color="#39ff14" opacity={0.6} transparent depthTest={true} depthWrite={false} />
          </line>
        ))}

        {latitudes.map((points, i) => (
          <line key={`latitude-${i}`}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={points.length}
                array={new Float32Array(points.flatMap(p => [p.x, p.y, p.z]))}
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial color="#39ff14" opacity={0.6} transparent depthTest={true} depthWrite={false} />
          </line>
        ))}

        <mesh>
          <sphereGeometry args={[RADIUS * 0.99, 32, 32]} />
          <meshBasicMaterial
            colorWrite={false}
            depthWrite={true}
            side={THREE.FrontSide}
          />
        </mesh>
      </group>

      <mesh ref={outlineRef}>
        <ringGeometry args={[RADIUS - 0.02, RADIUS + 0.02, 64]} />
        <meshBasicMaterial color="#39ff14" opacity={0.7} transparent side={THREE.DoubleSide} />
      </mesh>
    </>
  );
}

export default function WireframeGlobe() {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-30"
         style={{ width: '350px', height: '350px' }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ filter: 'blur(0.3px)', pointerEvents: 'none' }}
      >
        <RotatingWireframeSphere />
      </Canvas>
    </div>
  );
}
