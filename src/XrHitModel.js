

import { OrbitControls } from "@react-three/drei";
import { useThree, extend } from "@react-three/fiber";
import { Interactive, useHitTest, useXR } from "@react-three/xr";
import { useRef, useState } from "react";
import Model from "./Model";

extend({ OrbitControls });

const XrHitModel = () => {



  
//pour le detection et la position de mesh 
const reticleRef = useRef();
console.log(reticleRef);

  const [models, setModels] = useState([]);

  // pour verifier esque la session open ou nn 
  const { isPresenting } = useXR();

  //access to the camera
  const { camera, gl } = useThree();


  useThree(({ camera }) => {
    if (!isPresenting) {
      camera.position.z = 3;
    }
  });

  // lfonction hedhi lkol teb3a lmesh , detect le surface (position , detect )

  // (hitMatrix => contient le (position , rotation , scale))
  // (hit => cet un boolean return surface detect succufuly )
  useHitTest((hitMatrix, hit) => {
    //check "mesh" exist and session open 
    if (reticleRef.current && hit) {

      // position: The position where the surface was detected.
      // quaternion: The rotation of the detected surface.
      // scale: The scale of the detected surface.
      hitMatrix.decompose(
        reticleRef.current.position,
        reticleRef.current.quaternion,
        reticleRef.current.scale
      );

      // pour la rotation de "mesh" bech tkoun mestwiya 3al 9a3a lmesh 
      reticleRef.current.rotation.set(-Math.PI / 2, 0, 0);
    }
  });


  

// Function to place the model on user interaction
const placeModel = (e) => {
console.log(e);
    //check if surface detected ** check if the cordonner detected also
    if (e.intersection && e.intersection.point) {

// create copie de cordonner de intersection
      const position = e.intersection.point.clone();
      const id = Date.now();
      setModels([{ position, id }]);
    }
  };






  return (
    <>
      <OrbitControls
        enablePan={!isPresenting}
        enableZoom
        enableRotate
        enableDamping
        dampingFactor={0.1}
        args={[camera, gl.domElement]}
      />
      {/* just add some light to the scene  */}
      <ambientLight/>

      {isPresenting && (
          models.map(({ position, id }) => {
            return <Model key={id} position={position} scale={[0.3,0.3,0.3]} />;
          })
        )}




      {isPresenting && (
        <Interactive onSelect={placeModel}>

          <mesh ref={reticleRef} rotation-x={-Math.PI / 2}>
            <ringGeometry args={[0.1, 0.25, 32]}/>
            <meshStandardMaterial color={"white"} 
           />
          </mesh>

        
        </Interactive>
      )}

      {!isPresenting && <Model/>}
   
   
    </>


  );
};

export default XrHitModel;
