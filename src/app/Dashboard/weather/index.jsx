'use client';

import React, { useState } from 'react';
import styles from './cropProductionRecommender.module.css';

const CropProductionRecommender=() =>
{
        const [ inputs, setInputs ]=useState( {
                n: '', p: '', k: '',
                ph: '', temperature: '', rainfall: '',
                cropType: '', plantingDate: '', growthStage: '',
                plantDensity: '', fertilization: '', irrigation: '',
        } );
        const [ recommendation, setRecommendation ]=useState( '' );

        const handleChange=( e ) =>
        {
                const { name, value }=e.target;
                setInputs( { ...inputs, [ name ]: value } );
        };

        const handleSubmit=async ( e ) =>
        {
                e.preventDefault();
                const rec=`For ${ inputs.cropType }, based on the provided data, consider adjusting your fertilization or irrigation.`;
                setRecommendation( rec );
        };

        return (
                <div className={ styles.container }>
                        <h2 className={ styles.title }>Crop Production Recommender</h2>
                        <form onSubmit={ handleSubmit } className={ styles.form }>
                                <div className={ styles.inputGrid }>
                                        { Object.entries( inputs ).map( ( [ key, value ] ) => (
                                                <div key={ key } className={ styles.inputGroup }>
                                                        <label htmlFor={ key }>{ key.charAt( 0 ).toUpperCase()+key.slice( 1 ).replace( /([A-Z])/g, ' $1' ) }:</label>
                                                        <input
                                                                type={ key==='plantingDate'? 'date':'text' }
                                                                id={ key }
                                                                name={ key }
                                                                value={ value }
                                                                onChange={ handleChange }
                                                        />
                                                </div>
                                        ) ) }
                                </div>
                                <button type="submit" className={ styles.submitButton }>Get Recommendation</button>
                        </form>
                        { recommendation&&<div className={ styles.recommendation }>{ recommendation }</div> }
                </div>
        );
};

export default CropProductionRecommender;