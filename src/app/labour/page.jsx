'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import axios from 'axios';
import styles from './labourService.module.css';
import LabourForm from './LabourForm';

const LabourService=() =>
{
        const imageUrls=[
                '/labours/image1.png',
                '/labours/image2.png',
                '/labours/image3.png',
                '/labours/image4.png',
                '/labours/image5.png',
        ];

        const [ laborRequests, setLaborRequests ]=useState( [] );
        const [ isFormVisible, setIsFormVisible ]=useState( false );
        const [ stateFilter, setStateFilter ]=useState( '' );
        const [ cityFilter, setCityFilter ]=useState( '' );
        const [ stateOptions, setStateOptions ]=useState( [] );
        const [ cityOptions, setCityOptions ]=useState( [] );
        const [ selectedLabor, setSelectedLabor ]=useState( null );

        // Fetch states and cities from JSON
        useEffect( () =>
        {
                const fetchStateData=async () =>
                {
                        try
                        {
                                const response=await axios.get( '/stateDistricts.json' );
                                const data=response.data;
                                setStateOptions( Object.keys( data ) );
                        } catch ( error )
                        {
                                console.error( 'Failed to fetch states', error );
                        }
                };

                fetchStateData();
        }, [] );

        // Update city options when the state changes
        useEffect( () =>
        {
                const fetchCityOptions=async () =>
                {
                        try
                        {
                                const response=await axios.get( '/stateDistricts.json' );
                                const data=response.data;
                                if ( data[ stateFilter ] )
                                {
                                        setCityOptions( data[ stateFilter ] );
                                        // Reset city filter if state changes
                                        setCityFilter( '' );
                                } else
                                {
                                        setCityOptions( [] );
                                        setCityFilter( '' );
                                }
                        } catch ( error )
                        {
                                console.error( 'Failed to fetch cities', error );
                        }
                };

                if ( stateFilter )
                {
                        fetchCityOptions();
                } else
                {
                        setCityOptions( [] );
                        setCityFilter( '' );
                }
        }, [ stateFilter ] );

        // Fetch labor requests on component mount
        useEffect( () =>
        {
                const fetchLabors=async () =>
                {
                        try
                        {
                                const response=await axios.get( '/api/labours/get' );
                                setLaborRequests( Object.values( response.data.labors||{} ) );
                        } catch ( error )
                        {
                                console.error( 'Failed to fetch labors', error );
                        }
                };

                fetchLabors();
        }, [] );

        // Filtered labor requests based on state and city
        const filteredLaborRequests=laborRequests.filter(
                ( labor ) =>
                        ( stateFilter? labor.state?.toLowerCase()===stateFilter.toLowerCase():true )&&
                        ( cityFilter? labor.city?.toLowerCase()===cityFilter.toLowerCase():true )
        );

        return (
                <div className={ styles.container }>
                        <div className={ styles.navBar }>
                                <select
                                        value={ stateFilter }
                                        onChange={ ( e ) => setStateFilter( e.target.value ) }
                                        className={ styles.dropdown }
                                >
                                        <option value="">Select State</option>
                                        { stateOptions.map( ( state, index ) => (
                                                <option key={ index } value={ state }>
                                                        { state }
                                                </option>
                                        ) ) }
                                </select>

                                <select
                                        value={ cityFilter }
                                        onChange={ ( e ) => setCityFilter( e.target.value ) }
                                        className={ styles.dropdown }
                                        disabled={ !stateFilter }
                                >
                                        <option value="">Select City</option>
                                        { cityOptions.map( ( city, index ) => (
                                                <option key={ index } value={ city }>
                                                        { city }
                                                </option>
                                        ) ) }
                                </select>
                        </div>

                        <div className={ styles.contentWrapper }>
                                <div className={ styles.sidebar }>
                                        <button
                                                className={ styles.postHiringButton }
                                                onClick={ () => setIsFormVisible( !isFormVisible ) }
                                        >
                                                Post Hiring
                                        </button>
                                </div>

                                <div className={ styles.mainContent }>
                                        { isFormVisible? (
                                                <LabourForm />
                                        ):selectedLabor? (
                                                <div className={ styles.selectedLabourCard }>
                                                        <h2>Labour Request Details</h2>
                                                        <div className={ styles.labourRequestCard }>
                                                                <Image
                                                                        src="/dashboard/farm.png"
                                                                        alt="Farm Image"
                                                                        width={ 150 }
                                                                        height={ 150 }
                                                                />
                                                                <div className={ styles.labourDetails }>
                                                                        <h3>{ selectedLabor.purpose }</h3>
                                                                        <p>{ selectedLabor.payment } per hour</p>
                                                                        <p>{ selectedLabor.days } days</p>
                                                                        <p>Location: { selectedLabor.city }, { selectedLabor.state }</p>
                                                                </div>
                                                                <button
                                                                        className={ styles.backButton }
                                                                        onClick={ () => setSelectedLabor( null ) }
                                                                >
                                                                        Back
                                                                </button>
                                                        </div>
                                                </div>
                                        ):(
                                                <div className={ styles.labourList }>
                                                        <h2>Available Labour Requests</h2>
                                                        { filteredLaborRequests.length>0? (
                                                                filteredLaborRequests.map( ( labor, index ) => (
                                                                        <div key={ index } className={ styles.labourRequestCard }>
                                                                                <Image
                                                                                        src={ imageUrls[ index%imageUrls.length ] }
                                                                                        alt="Farm Image"
                                                                                        width={ 100 }
                                                                                        height={ 100 }
                                                                                />
                                                                                <div className={ styles.labourDetails }>
                                                                                        <h3>{ labor.purpose }</h3>
                                                                                        <p>{ labor.payment } per hour</p>
                                                                                        <p>{ labor.days } days</p>
                                                                                </div>
                                                                                <button
                                                                                        className={ styles.checkoutButton }
                                                                                        onClick={ () => setSelectedLabor( labor ) }
                                                                                >
                                                                                        Check Out
                                                                                </button>
                                                                        </div>
                                                                ) )
                                                        ):(
                                                                <p>No available labor requests.</p>
                                                        ) }
                                                </div>
                                        ) }
                                </div>
                        </div>
                </div>
        );
};

export default LabourService;
