import React, {Suspense, useState, useEffect } from 'react';
import { Text } from "@react-three/drei";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export default function Model({position}) {
   
    const [loading, setLoading] = useState(true);
    const [model, setModel] = useState(null);

    const modelPath = `${process.env.PUBLIC_URL}/azouz.gltf`;



console.log(modelPath);

    useEffect(() => {
        if (modelPath) {
            const loader = new GLTFLoader();
            loader.load(
                modelPath,
                (gltf) => {
                    setModel(gltf.scene);
                    setLoading(false);
                    console.log(gltf);
                },
                undefined,
                (error) => {
                    console.error('Error loading GLTF model:', error);
                    setLoading(false);
                }
            );
        }
    }, [modelPath]);



    if (loading) {
        return (
            <group>
                <Text
                    position={[0, -1.5, 0]}
                    color="white"
                    fontSize={0.4}
                    maxWidth={5}
                    lineHeight={1}
                    letterSpacing={0.02}
                >
                    Loading...
                </Text>
            </group>
        );
    }

    // Render the model only when it's not null
    return model ? (
        <Suspense fallback={null}>
            <primitive position={position} object={model} />
        </Suspense>

    ) : null;
}
