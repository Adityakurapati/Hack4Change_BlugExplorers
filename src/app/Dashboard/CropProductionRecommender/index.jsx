import React, { useState } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale, BarElement } from 'chart.js';
import styles from './weatherMonitor.module.css';

// Register Chart.js components
ChartJS.register( Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale, BarElement );

const CropProductionRecommender=() =>
{
        const [ recommendation, setRecommendation ]=useState( null );
        const [ loading, setLoading ]=useState( false );

        // Mock data; replace with your actual data fetching logic
        const sensorData={
                '-O4au0_OKuJStajyzN5a': {
                        benzin: 0.2,
                        co2: 415.3,
                        humidity: 65.7,
                        temperature: 25.3,
                        no2: 0.03,
                        lpg: 0.5,
                        water_level: 78.2,
                        n: 14.5,
                        p: 8.2,
                        k: 20.1,
                        ph: 6.8,
                        soil_moisture: 40
                }
        };

        const airQualityData={
                labels: [ 'NO2', 'CO2', 'LPG', 'Benzene' ],
                datasets: [ {
                        data: [
                                sensorData[ '-O4au0_OKuJStajyzN5a' ].no2,
                                sensorData[ '-O4au0_OKuJStajyzN5a' ].co2,
                                sensorData[ '-O4au0_OKuJStajyzN5a' ].lpg,
                                sensorData[ '-O4au0_OKuJStajyzN5a' ].benzin
                        ],
                        backgroundColor: [ '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0' ],
                        borderColor: [ '#fff', '#fff', '#fff', '#fff' ],
                        borderWidth: 1
                } ]
        };

        const airQualityOptions={
                responsive: true,
                plugins: {
                        legend: {
                                position: 'top',
                        },
                        tooltip: {
                                callbacks: {
                                        label: ( tooltipItem ) => `${ tooltipItem.label }: ${ tooltipItem.raw }`
                                }
                        }
                }
        };

        const comparisonData={
                labels: [ 'Temperature', 'Humidity' ],
                datasets: [ {
                        label: 'Measurement',
                        data: [
                                sensorData[ '-O4au0_OKuJStajyzN5a' ].temperature,
                                sensorData[ '-O4au0_OKuJStajyzN5a' ].humidity
                        ],
                        backgroundColor: [ '#FF6384', '#36A2EB' ],
                        borderColor: [ '#fff', '#fff' ],
                        borderWidth: 1
                } ]
        };

        const comparisonOptions={
                responsive: true,
                plugins: {
                        legend: {
                                position: 'top',
                        },
                        tooltip: {
                                callbacks: {
                                        label: ( tooltipItem ) => `${ tooltipItem.label }: ${ tooltipItem.raw }°C`
                                }
                        }
                },
                scales: {
                        y: {
                                beginAtZero: true
                        }
                }
        };

        const handlePredictClick=async () =>
        {
                setLoading( true );
                try
                {
                        const response=await fetch( `http://localhost:5000/crop_recommendation?n=${ sensorData[ '-O4au0_OKuJStajyzN5a' ].n }&p=${ sensorData[ '-O4au0_OKuJStajyzN5a' ].p }&k=${ sensorData[ '-O4au0_OKuJStajyzN5a' ].k }&temperature=${ sensorData[ '-O4au0_OKuJStajyzN5a' ].temperature }&humidity=${ sensorData[ '-O4au0_OKuJStajyzN5a' ].humidity }&ph=${ sensorData[ '-O4au0_OKuJStajyzN5a' ].ph }&rainfall=100` );
                        const result=await response.json();
                        setRecommendation( result );
                } catch ( error )
                {
                        console.error( 'Error fetching recommendation:', error );
                } finally
                {
                        setLoading( false );
                }
        };

        return (
                <div className={ styles.container }>
                        <div className={ styles.header }>
                                <h1 className={ styles.title }>Overall Strategy</h1>
                        </div>
                        <div className={ styles.content }>
                                <div className={ styles.section }>
                                        <h2 className={ styles.sectionTitle }>Temperature</h2>
                                        <hr />
                                        <div className={ styles.chart }>
                                                <img src='/startup/cloud-icon.png' width={ 200 } alt="Cloud Icon" />
                                                <div className={ styles.temperature }>
                                                        { sensorData? `${ sensorData[ '-O4au0_OKuJStajyzN5a' ].temperature } °C`:'Loading...' }
                                                </div>
                                        </div>
                                </div>
                                <div className={ styles.section }>
                                        <h2 className={ styles.sectionTitle }>Air Quality</h2>
                                        <div className={ styles.chart }>
                                                { sensorData? <Pie data={ airQualityData } options={ airQualityOptions } />:'Loading...' }
                                        </div>
                                </div>
                                <div className={ styles.section }>
                                        <h2 className={ styles.sectionTitle }>Temperature vs Humidity</h2>
                                        <div className={ styles.chart }>
                                                { sensorData? <Bar data={ comparisonData } options={ comparisonOptions } />:'Loading...' }
                                        </div>
                                </div>
                                <div className={ styles.extraSection }>
                                        <h2 className={ styles.extraSectionTitle }>Soil and Water Data</h2>
                                        <div className={ styles.blockContainer }>
                                                <div className={ styles.block }>
                                                        <h3>N</h3>
                                                        <div className={ styles.value }>
                                                                { sensorData? `${ sensorData[ '-O4au0_OKuJStajyzN5a' ].n }`:'Loading...' }
                                                        </div>
                                                </div>
                                                <div className={ styles.block }>
                                                        <h3>P</h3>
                                                        <div className={ styles.value }>
                                                                { sensorData? `${ sensorData[ '-O4au0_OKuJStajyzN5a' ].p }`:'Loading...' }
                                                        </div>
                                                </div>
                                                <div className={ styles.block }>
                                                        <h3>K</h3>
                                                        <div className={ styles.value }>
                                                                { sensorData? `${ sensorData[ '-O4au0_OKuJStajyzN5a' ].k }`:'Loading...' }
                                                        </div>
                                                </div>
                                                <div className={ styles.block }>
                                                        <h3>PH</h3>
                                                        <div className={ styles.value }>
                                                                { sensorData? `${ sensorData[ '-O4au0_OKuJStajyzN5a' ].ph }`:'Loading...' }
                                                        </div>
                                                </div>
                                                <div className={ styles.block }>
                                                        <h3>Soil Moisture</h3>
                                                        <div className={ styles.value }>
                                                                { sensorData? `${ sensorData[ '-O4au0_OKuJStajyzN5a' ].soil_moisture }%`:'Loading...' }
                                                        </div>
                                                </div>
                                                <div className={ styles.block }>
                                                        <h3>Water Level</h3>
                                                        <div className={ styles.value }>
                                                                { sensorData? `${ sensorData[ '-O4au0_OKuJStajyzN5a' ].water_level } %`:'Loading...' }
                                                        </div>
                                                </div>
                                        </div>
                                        <button className="primary" onClick={ handlePredictClick } disabled={ loading }>
                                                { loading? 'Loading...':'Predict Crop' }
                                        </button>
                                        { recommendation&&(
                                                <div className={ styles.recommendation }>
                                                        <h3>Recommended Crops:</h3>
                                                        <ul>
                                                                { recommendation.map( ( item, index ) => (
                                                                        <li key={ index }>
                                                                                { item.crop }: { Math.round( item.probability*100 ) }%
                                                                        </li>
                                                                ) ) }
                                                        </ul>
                                                </div>
                                        ) }
                                </div>
                        </div>
                </div>
        );
};

export default CropProductionRecommender;
