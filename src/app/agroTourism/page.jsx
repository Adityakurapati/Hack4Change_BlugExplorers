'use client'
import React, { useState, useEffect } from 'react';
import styles from './agroTourism.module.css';

// Assume we have a 3D model component
import ThreeDTutor from '@components/ThreeDTutor';

const AgroTourism=() =>
{
        const [ currentTopic, setCurrentTopic ]=useState( 'productivity' );
        const [ realTimeData, setRealTimeData ]=useState( null );

        useEffect( () =>
        {
                // Fetch real-time data
                const fetchData=async () =>
                {
                        // Replace with actual API call
                        const response=await fetch( 'https://api.agriculture.com/data' );
                        const data=await response.json();
                        setRealTimeData( data );
                };

                fetchData();
        }, [] );

        const handleTopicChange=( topic ) =>
        {
                setCurrentTopic( topic );
        };

        return (
                <div className={ styles.container }>
                        <div className={ styles.leftPanel }>
                                <ThreeDTutor currentTopic={ currentTopic } />
                        </div>
                        <div className={ styles.rightPanel }>
                                <h1 className={ styles.title }>AgroTourism Education</h1>
                                <div className={ styles.topicSelector }>
                                        <button onClick={ () => handleTopicChange( 'productivity' ) }>Productivity</button>
                                        <button onClick={ () => handleTopicChange( 'effectiveness' ) }>Effectiveness</button>
                                        <button onClick={ () => handleTopicChange( 'losses' ) }>Losses</button>
                                </div>
                                <div className={ styles.content }>
                                        { currentTopic==='productivity'&&(
                                                <div>
                                                        <h2>Agricultural Productivity</h2>
                                                        <p>Learn about how farms maximize their crop yields.</p>
                                                        { realTimeData&&(
                                                                <div className={ styles.dataVisual }>
                                                                        <h3>Current Crop Yield:</h3>
                                                                        <p>{ realTimeData.cropYield } tons per hectare</p>
                                                                </div>
                                                        ) }
                                                </div>
                                        ) }
                                        { currentTopic==='effectiveness'&&(
                                                <div>
                                                        <h2>Farming Effectiveness</h2>
                                                        <p>Discover techniques for efficient farming practices.</p>
                                                        { realTimeData&&(
                                                                <div className={ styles.dataVisual }>
                                                                        <h3>Resource Utilization:</h3>
                                                                        <p>{ realTimeData.resourceEfficiency }% efficient</p>
                                                                </div>
                                                        ) }
                                                </div>
                                        ) }
                                        { currentTopic==='losses'&&(
                                                <div>
                                                        <h2>Agricultural Losses</h2>
                                                        <p>Understand challenges farmers face and how to mitigate losses.</p>
                                                        { realTimeData&&(
                                                                <div className={ styles.dataVisual }>
                                                                        <h3>Current Loss Rate:</h3>
                                                                        <p>{ realTimeData.lossRate }% of total production</p>
                                                                </div>
                                                        ) }
                                                </div>
                                        ) }
                                </div>
                        </div>
                </div>
        );
};

export default AgroTourism;