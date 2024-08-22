'use client'
import React, { useState, useRef } from 'react';
import styles from './remoteFarm.module.css'

const RemoteFarm=() =>
{
        const [ isWaterControlActive, setIsWaterControlActive ]=useState( false );
        const videoRef=useRef( null );

        const handleStartWaterControl=() =>
        {
                setIsWaterControlActive( true );
                if ( videoRef.current )
                {
                        videoRef.current.play();
                }
        };

        const handleStopWaterControl=() =>
        {
                setIsWaterControlActive( false );
                if ( videoRef.current )
                {
                        videoRef.current.pause();
                        videoRef.current.currentTime=0;
                }
        };

        return (
                <div className={ styles.container }>
                        <h1 className={ styles.title }>Farm Remote Monitoring</h1>
                        <div className={ styles.videoContainer }>
                                <video
                                        ref={ videoRef }
                                        className={ styles.video }
                                        autoPlay
                                        loop
                                        muted
                                >
                                        <source src="/startup/clip6.mp4" type="video/mp4" />
                                        Your browser does not support the video tag.
                                </video>
                        </div>
                        <div className={ styles.buttonContainer }>
                                <button
                                        className={ `${ styles.button } ${ styles.startButton }` }
                                        onClick={ handleStartWaterControl }
                                        disabled={ isWaterControlActive }
                                >
                                        Start Water Control
                                </button>
                                <button
                                        className={ `${ styles.button } ${ styles.stopButton }` }
                                        onClick={ handleStopWaterControl }
                                        disabled={ !isWaterControlActive }
                                >
                                        Stop Water Control
                                </button>
                        </div>
                </div>
        );
};

export default RemoteFarm;