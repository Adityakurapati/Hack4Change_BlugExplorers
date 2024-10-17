'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './labourService.module.css';
import LabourForm from './LabourForm';
import LoadingSpinner from './LoadingSpinner';
import { fill } from 'three/src/extras/TextureUtils';

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
        const [ loading, setLoading ]=useState( true );

        useEffect( () =>
        {
                const fetchStateData=async () =>
                {
                        try
                        {
                                const response=await axios.get( '/stateDistricts.json' );
                                setStateOptions( Object.keys( response.data ) );
                        } catch ( error )
                        {
                                console.error( 'Failed to fetch states', error );
                        }
                };
                fetchStateData();
        }, [] );

        useEffect( () =>
        {
                const fetchCityOptions=async () =>
                {
                        if ( !stateFilter )
                        {
                                setCityOptions( [] );
                                setCityFilter( '' );
                                return;
                        }
                        try
                        {
                                const response=await axios.get( '/stateDistricts.json' );
                                setCityOptions( response.data[ stateFilter ]||[] );
                                setCityFilter( '' );
                        } catch ( error )
                        {
                                console.error( 'Failed to fetch cities', error );
                        }
                };
                fetchCityOptions();
        }, [ stateFilter ] );

        useEffect( () =>
        {
                const fetchLabors=async () =>
                {
                        setLoading( true );
                        try
                        {
                                const response=await axios.get( '/api/labours/get' );
                                setLaborRequests( Object.values( response.data.labors||{} ) );
                        } catch ( error )
                        {
                                console.error( 'Failed to fetch labors', error );
                        } finally
                        {
                                setLoading( false );
                        }
                };
                fetchLabors();
        }, [] );

        const filteredLaborRequests=laborRequests.filter(
                ( labor ) =>
                        ( !stateFilter||labor.state?.toLowerCase()===stateFilter.toLowerCase() )&&
                        ( !cityFilter||labor.city?.toLowerCase()===cityFilter.toLowerCase() )
        );

        return (
                <div className={ styles.container }>
                        <motion.div
                                className={ styles.navBar }
                                initial={ { y: -50, opacity: 0 } }
                                animate={ { y: 0, opacity: 1 } }
                                transition={ { duration: 0.5 } }
                        >
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
                        </motion.div>

                        <div className={ styles.contentWrapper }>
                                <motion.div
                                        className={ styles.sidebar }
                                        initial={ { x: -100, opacity: 0 } }
                                        animate={ { x: 0, opacity: 1 } }
                                        transition={ { duration: 0.5, delay: 0.2 } }
                                >
                                        <button
                                                className={ styles.postHiringButton }
                                                onClick={ () => setIsFormVisible( !isFormVisible ) }
                                        >
                                                { isFormVisible? 'Close Form':'Post Hiring' }
                                        </button>
                                </motion.div>

                                <motion.div
                                        className={ styles.mainContent }
                                        initial={ { opacity: 0 } }
                                        animate={ { opacity: 1 } }
                                        transition={ { duration: 0.5, delay: 0.4 } }
                                >
                                        <AnimatePresence mode="wait">
                                                { loading? (
                                                        <motion.div
                                                                key="loading"
                                                                initial={ { opacity: 0 } }
                                                                animate={ { opacity: 1 } }
                                                                exit={ { opacity: 0 } }
                                                                className={ styles.loadingSpinner }
                                                        >
                                                                <LoadingSpinner />
                                                        </motion.div>
                                                ):isFormVisible? (
                                                        <motion.div
                                                                key="form"
                                                                initial={ { opacity: 0, y: 20 } }
                                                                animate={ { opacity: 1, y: 0 } }
                                                                exit={ { opacity: 0, y: -20 } }
                                                        >
                                                                <LabourForm onClose={ () => setIsFormVisible( false ) } />
                                                        </motion.div>
                                                ):selectedLabor? (
                                                        <motion.div
                                                                key="selected"
                                                                initial={ { opacity: 0, scale: 0.9 } }
                                                                animate={ { opacity: 1, scale: 1 } }
                                                                exit={ { opacity: 0, scale: 0.9 } }
                                                                className={ styles.selectedLabourCard }
                                                        >
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
                                                        </motion.div>
                                                ):(
                                                        <motion.div
                                                                key="list"
                                                                initial={ { opacity: 0 } }
                                                                animate={ { opacity: 1 } }
                                                                exit={ { opacity: 0 } }
                                                                className={ styles.labourList }
                                                        >
                                                                <h2>Available Labour Requests</h2>
                                                                { filteredLaborRequests.length>0? (
                                                                        filteredLaborRequests.map( ( labor, index ) => (
                                                                                <motion.div
                                                                                        key={ index }
                                                                                        className={ styles.labourRequestCard }
                                                                                        initial={ { opacity: 0, y: 20 } }
                                                                                        animate={ { opacity: 1, y: 0 } }
                                                                                        transition={ { delay: index*0.1 } }
                                                                                >
                                                                                        <Image
                                                                                                src={ imageUrls[ index%imageUrls.length ] }
                                                                                                alt="Farm Image"
                                                                                                fill
                                                                                                className={ styles.image }
                                                                                                style={ { objectFit: 'cover' } }
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
                                                                                </motion.div>
                                                                        ) )
                                                                ):(
                                                                        <p>No available labor requests.</p>
                                                                ) }
                                                        </motion.div>
                                                ) }
                                        </AnimatePresence>
                                </motion.div>
                        </div>
                </div>
        );
};

export default LabourService;