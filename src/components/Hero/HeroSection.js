'use client';
import { motion } from 'framer-motion';
import styles from './hero.module.css';

const HeroSection=() =>
{
        return (
                <section className={ styles.hero }>
                        <motion.div
                                className={ styles.content }
                                initial={ { opacity: 0, x: -50 } }
                                animate={ { opacity: 1, x: 0 } }
                                transition={ { duration: 1 } }
                        >
                                <h1 className={ styles.title }>
                                        Cultivating the Future of Agriculture
                                </h1>
                                <p className={ styles.subtitle }>
                                        Harnessing technology to grow sustainable solutions for farmers worldwide
                                </p>
                                <div className={ styles.cta }>
                                        <motion.button
                                                className={ `${ styles.button } ${ styles.primaryButton }` }
                                                whileHover={ { scale: 1.05, y: -3 } }
                                        >
                                                Explore Our Solutions
                                        </motion.button>
                                        <motion.button
                                                className={ `${ styles.button } ${ styles.secondaryButton }` }
                                                whileHover={ { scale: 1.05, y: -3 } }
                                        >
                                                Learn More
                                        </motion.button>
                                </div>
                        </motion.div>

                        <motion.div
                                className={ styles.imageContainer }
                                initial={ { opacity: 0, x: 50 } }
                                animate={ { opacity: 1, x: 0 } }
                                transition={ { duration: 1 } }
                        >
                                <img
                                        src="/startup/hero.png"
                                        alt="Agriculture Hero"
                                        className={ styles.heroImage }
                                />
                        </motion.div>
                </section>
        );
};

export default HeroSection;


// 'use client';
// import { Canvas, useFrame } from '@react-three/fiber';
// import { OrbitControls, Environment, useGLTF } from '@react-three/drei';
// import { Suspense, useState, useRef } from 'react';
// import { motion } from 'framer-motion';
// import styles from './hero.module.css';

// const AgricultureModel=() =>
// {
//         const { scene }=useGLTF( '/startup/model/plant/source/crop.glb' );
//         return <primitive object={ scene } scale={ 2 } />;
// };

// const ModelViewer=( { setRotation, setZoom, isHovered } ) =>
// {
//         const orbitRef=useRef();

//         useFrame( () =>
//         {
//                 if ( orbitRef.current )
//                 {
//                         setRotation( [
//                                 orbitRef.current.getAzimuthalAngle().toFixed( 2 ),
//                                 orbitRef.current.getPolarAngle().toFixed( 2 ),
//                         ] );
//                         setZoom( orbitRef.current.object.zoom.toFixed( 2 ) );
//                 }
//         } );

//         return (
//                 <>
//                         <OrbitControls
//                                 ref={ orbitRef }
//                                 enableZoom={ true }
//                                 autoRotate={ isHovered }
//                                 autoRotateSpeed={ 5 }
//                         />
//                         <Environment preset="sunset" />
//                         <AgricultureModel />
//                 </>
//         );
// };

// const HeroSection=() =>
// {
//         const [ isHovered, setIsHovered ]=useState( false );
//         const [ rotation, setRotation ]=useState( [ 0, 0, 0 ] );
//         const [ zoom, setZoom ]=useState( 1.5 );

//         return (
//                 <section className={ styles.hero }>
//                         <motion.div
//                                 className={ styles.content }
//                                 initial={ { opacity: 0, x: -50 } }
//                                 animate={ { opacity: 1, x: 0 } }
//                                 transition={ { duration: 1 } }
//                         >
//                                 <h1 className={ styles.title }>
//                                         Cultivating the Future of Agriculture
//                                 </h1>
//                                 <p className={ styles.subtitle }>
//                                         Harnessing technology to grow sustainable solutions for farmers worldwide
//                                 </p>
//                                 <div className={ styles.cta }>
//                                         <motion.button
//                                                 className={ `${ styles.button } ${ styles.primaryButton }` }
//                                                 whileHover={ { scale: 1.05, y: -3 } }
//                                                 onMouseEnter={ () => setIsHovered( true ) }
//                                                 onMouseLeave={ () => setIsHovered( false ) }
//                                         >
//                                                 Explore Our Solutions
//                                         </motion.button>
//                                         <motion.button
//                                                 className={ `${ styles.button } ${ styles.secondaryButton }` }
//                                                 whileHover={ { scale: 1.05, y: -3 } }
//                                         >
//                                                 Learn More
//                                         </motion.button>
//                                 </div>
//                         </motion.div>

//                         <motion.div
//                                 className={ styles.model }
//                                 initial={ { opacity: 0, x: 50 } }
//                                 animate={ { opacity: 1, x: 0 } }
//                                 transition={ { duration: 1 } }
//                         >
//                                 <Canvas
//                                         camera={ {
//                                                 position: [ 1.5, 2.5, 2.5 ], // Adjust these values to center the model
//                                                 zoom: 2,
//                                         } }
//                                 >
//                                         <Suspense fallback={ null }>
//                                                 <ModelViewer
//                                                         setRotation={ setRotation }
//                                                         setZoom={ setZoom }
//                                                         isHovered={ isHovered }
//                                                 />
//                                         </Suspense>
//                                 </Canvas>

//                         </motion.div>

//                         <div className={ styles.infoPanel }>
//                                 <p>Rotation: { rotation[ 0 ] } / { rotation[ 1 ] }</p>
//                                 <p>Zoom: { zoom }</p>
//                         </div>
//                 </section>
//         );
// };

// export default HeroSection;
