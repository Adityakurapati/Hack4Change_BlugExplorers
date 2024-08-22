import React, { useState } from 'react';
import styles from './water.module.css';

const options={
        cropType: [ 'BANANA', 'SOYABEAN', 'CABBAGE', 'POTATO', 'RICE', 'MELON', 'MAIZE', 'CITRUS', 'BEAN', 'WHEAT', 'MUSTARD', 'COTTON', 'SUGARCANE', 'TOMATO', 'ONION' ],
        soilType: [ 'DRY', 'HUMID', 'WET' ],
        region: [ 'DESERT', 'SEMI ARID', 'SEMI HUMID', 'HUMID' ],
        temperature: [ '20-30', '30-40', '40-50' ],
        weatherCondition: [ 'NORMAL', 'SUNNY', 'WINDY', 'RAINY' ]
};

const WaterRequirement=() =>
{
        const [ waterRequirement, setWaterRequirement ]=useState( null );
        const [ loading, setLoading ]=useState( false );
        const [ error, setError ]=useState( null );
        const [ formData, setFormData ]=useState( {
                cropType: options.cropType[ 0 ],
                soilType: options.soilType[ 0 ],
                region: options.region[ 0 ],
                temperature: options.temperature[ 0 ],
                weatherCondition: options.weatherCondition[ 0 ]
        } );

        const handleInputChange=( e ) =>
        {
                const { name, value }=e.target;
                setFormData( ( prev ) => ( { ...prev, [ name ]: value } ) );
        };

        const handleFetchRecommendation=async () =>
        {
                setLoading( true );
                setError( null );

                try
                {
                        const { cropType, soilType, region, temperature, weatherCondition }=formData;
                        const response=await fetch(
                                `http://localhost:5000/water_recommendation?crop_type=${ cropType }&soil_type=${ soilType }&region=${ region }&temperature=${ temperature }&weather_condition=${ weatherCondition }`
                        );
                        if ( !response.ok ) throw new Error( 'Network response was not ok' );

                        const data=await response.json();
                        setWaterRequirement( data.water_requirement );
                } catch ( err )
                {
                        setError( 'Error fetching data. Please try again later.' );
                        console.error( err );
                } finally
                {
                        setLoading( false );
                }
        };

        return (
                <div className={ styles.container }>
                        <h1 className={ styles.title }>Water Requirement Recommendation</h1>

                        <div className={ styles.formGroup }>
                                { Object.keys( options ).map( ( key ) => (
                                        <div key={ key } className={ styles.inputGroup }>
                                                <label htmlFor={ key } className={ styles.label }>{ key.replace( /([A-Z])/g, ' $1' ).trim() }:</label>
                                                <select
                                                        name={ key }
                                                        value={ formData[ key ] }
                                                        onChange={ handleInputChange }
                                                        className={ styles.select }
                                                >
                                                        { options[ key ].map( ( option ) => (
                                                                <option key={ option } value={ option }>{ option }</option>
                                                        ) ) }
                                                </select>
                                        </div>
                                ) ) }
                        </div>

                        <button
                                className={ styles.fetchButton }
                                onClick={ handleFetchRecommendation }
                                disabled={ loading }
                        >
                                { loading? 'Fetching...':'Get Water Requirement' }
                        </button>

                        { error&&<p className={ styles.error }>{ error }</p> }
                        { waterRequirement!==null&&(
                                <div className={ styles.result }>
                                        <h2 className={ styles.resultTitle }>Recommended Water Requirement:</h2>
                                        <p className={ styles.resultValue }>{ waterRequirement.toFixed( 2 ) } liters</p>
                                </div>
                        ) }
                </div>
        );
};

export default WaterRequirement;
