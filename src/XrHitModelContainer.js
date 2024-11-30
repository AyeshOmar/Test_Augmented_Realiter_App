import { Canvas } from '@react-three/fiber';
import { ARButton, XR, toggleSession } from '@react-three/xr'; // Import the toggleSession function
import React from 'react';
import XrHitModel from './XrHitModel';

import './index.css';
import { useParams, useNavigate ,Link} from 'react-router-dom';
const XrHitModelContainer = () => {




  const handleARSessionStart = async () => {
    try {

      // Open session
      await toggleSession('immersive-ar', {
        sessionInit: {
          requiredFeatures: ['hit-test']
        }
      });


    } catch (error) {
      // Check if the error message is related to session configuration
      if (error instanceof DOMException && error.message === "The specified session configuration is not supported.") {
        // Display your custom error message
        window.alert("Votre téléphone n'est pas compatible avec la réalité augmentée !");
      } else {
        // If it's not related to session configuration, re-throw the error
        throw error;
      }
    }
  };

  


  return (
    <div className="containerVoirReality">
      <button className="ar-button" onClick={handleARSessionStart}>Essayer en réalité</button>
      <button className="ar-button-Retour">Retour</button>
      <Canvas>
        <XR>
          <XrHitModel/>
        </XR>
      </Canvas>
    </div>
  );
};

export default XrHitModelContainer;

