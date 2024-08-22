import React, { useRef, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, useAnimations, Html } from '@react-three/drei';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

function Model ( { currentTopic } )
{
        const group=useRef();
        const { scene, animations }=useLoader( GLTFLoader, '/person_model/person.glb' );
        const { actions }=useAnimations( animations, group );

        useEffect( () =>
        {
                if ( actions[ currentTopic ] )
                {
                        actions[ currentTopic ].reset().fadeIn( 0.5 ).play();
                        return () => actions[ currentTopic ].fadeOut( 0.5 );
                } else
                {
                        console.warn( `No animation found for topic: ${ currentTopic }` );
                }
        }, [ actions, currentTopic ] );

        useFrame( ( state, delta ) =>
        {
                if ( group.current )
                {
                        group.current.rotation.y+=delta*0.1;
                }
        } );

        return <primitive object={ scene } ref={ group } />;
}

function Fallback ()
{
        return (
                <Html center>
                        <div style={ { color: 'white', fontSize: '24px' } }>Loading...</div>
                </Html>
        );
}

function ThreeDTutor ( { currentTopic } )
{
        return (
                <Canvas
                        camera={ { position: [ 0, 0, 5 ], fov: 50 } }
                        style={ { background: '#d4e6c0' } }
                >
                        <ambientLight intensity={ 0.5 } />
                        <spotLight position={ [ 10, 10, 10 ] } angle={ 0.15 } penumbra={ 1 } />
                        <pointLight position={ [ -10, -10, -10 ] } />
                        <Suspense fallback={ <Fallback /> }>
                                <Model currentTopic={ currentTopic } />
                        </Suspense>
                        <OrbitControls />
                </Canvas>
        );
}

export default ThreeDTutor;