'use client';

import React, { useState } from 'react';
import styles from './fertilizerRecommendation.module.css';

const FertilizerRecommendation=() =>
{
        const [ cropType, setCropType ]=useState( '' );
        const [ region, setRegion ]=useState( '' );
        const [ areaSize, setAreaSize ]=useState( '' );
        const [ soilType, setSoilType ]=useState( '' );
        const [ irrigationMethod, setIrrigationMethod ]=useState( '' );
        const [ fertilizerPrediction, setFertilizerPrediction ]=useState( '' );

        const handleSubmit=( e ) =>
        {
                e.preventDefault();

                // Simulate API call for fertilizer recommendation
                const predictedFertilizer='NPK 20-20-20'; // Replace with API call result
                setFertilizerPrediction( predictedFertilizer );
        };

        return (
                <div className={ styles.container }>
                        <h2>Fertilizer Recommendation</h2>
                        <form className={ styles.form } onSubmit={ handleSubmit }>
                                <div className={ styles.formGroup }>
                                        <label htmlFor="cropType">Crop Type:</label>
                                        <input
                                                type="text"
                                                id="cropType"
                                                value={ cropType }
                                                onChange={ ( e ) => setCropType( e.target.value ) }
                                                required
                                        />
                                </div>
                                <div className={ styles.formGroup }>
                                        <label htmlFor="region">Region:</label>
                                        <input
                                                type="text"
                                                id="region"
                                                value={ region }
                                                onChange={ ( e ) => setRegion( e.target.value ) }
                                                required
                                        />
                                </div>
                                <div className={ styles.formGroup }>
                                        <label htmlFor="areaSize">Area Size (acres):</label>
                                        <input
                                                type="number"
                                                id="areaSize"
                                                value={ areaSize }
                                                onChange={ ( e ) => setAreaSize( e.target.value ) }
                                                required
                                        />
                                </div>
                                <div className={ styles.formGroup }>
                                        <label htmlFor="soilType">Soil Type:</label>
                                        <input
                                                type="text"
                                                id="soilType"
                                                value={ soilType }
                                                onChange={ ( e ) => setSoilType( e.target.value ) }
                                        />
                                </div>
                                <div className={ styles.formGroup }>
                                        <label htmlFor="irrigationMethod">Irrigation Method:</label>
                                        <input
                                                type="text"
                                                id="irrigationMethod"
                                                value={ irrigationMethod }
                                                onChange={ ( e ) => setIrrigationMethod( e.target.value ) }
                                        />
                                </div>
                                <button type="submit" className={ styles.submitButton }>
                                        Get Recommendation
                                </button>
                        </form>

                        { fertilizerPrediction&&(
                                <div className={ styles.result }>
                                        <h3>Recommended Fertilizer:</h3>
                                        <p>{ fertilizerPrediction }</p>
                                </div>
                        ) }
                </div>
        );
};

export default FertilizerRecommendation;
