import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';

function AnimatedSpheres() {
  const group = useRef<THREE.Group>();

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.x = state.clock.getElapsedTime() * 0.1;
      group.current.rotation.y = state.clock.getElapsedTime() * 0.15;
    }
  });

  return (
    <group ref={group}>
      {Array.from({ length: 50 }).map((_, i) => (
        <Sphere
          key={i}
          position={[
            Math.random() * 20 - 10,
            Math.random() * 20 - 10,
            Math.random() * 20 - 10
          ]}
          scale={Math.random() * 0.2 + 0.1}
        >
          <meshStandardMaterial
            color={`hsl(${Math.random() * 60 + 200}, 70%, 75%)`}
            transparent
            opacity={0.6}
          />
        </Sphere>
      ))}
    </group>
  );
}

const Background3D: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 15] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <AnimatedSpheres />
      </Canvas>
    </div>
  );
};

export default Background3D;