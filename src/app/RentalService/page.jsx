'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import axios from 'axios';
import Highcharts from 'highcharts';
import Highcharts3D from 'highcharts/highcharts-3d';
import HighchartsReact from 'highcharts-react-official';
import styles from './rentalService.module.css';

if ( typeof Highcharts==='object' )
{
        Highcharts3D( Highcharts );
}

const COLORS=[ '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40' ];

const RentalService=() =>
{
        const [ machineries, setMachineries ]=useState( [] );
        const [ newMachine, setNewMachine ]=useState( {
                available_quantity: '',
                provider: '',
                rent_amount: '',
                vehicle_type: '',
                contactNumber: ''
        } );
        const [ showForm, setShowForm ]=useState( false );
        const [ loading, setLoading ]=useState( true );
        const [ expandedMachineId, setExpandedMachineId ]=useState( null );

        useEffect( () =>
        {
                fetchMachineries();
        }, [] );

        const fetchMachineries=async () =>
        {
                try
                {
                        setLoading( true );
                        const response=await axios.get( '/api/machineries/get' );
                        const data=response.data.machineries? Object.values( response.data.machineries ):[];
                        setMachineries( data );
                } catch ( error )
                {
                        console.error( 'Failed to fetch machineries', error );
                } finally
                {
                        setLoading( false );
                }
        };

        const handleInputChange=( e ) =>
        {
                const { name, value }=e.target;
                setNewMachine( prev => ( { ...prev, [ name ]: value } ) );
        };

        const handleSubmit=async ( e ) =>
        {
                e.preventDefault();
                try
                {
                        setLoading( true );
                        const params=new URLSearchParams( newMachine ).toString();
                        await axios.get( `/api/machineries/add?${ params }` );
                        setNewMachine( {
                                available_quantity: '',
                                provider: '',
                                rent_amount: '',
                                vehicle_type: '',
                                contactNumber: ''
                        } );
                        setShowForm( false );
                        await fetchMachineries();
                } catch ( error )
                {
                        console.error( 'Failed to add machine', error );
                } finally
                {
                        setLoading( false );
                }
        };

        const handleGetButtonClick=async ( machineId ) =>
        {
                if ( expandedMachineId===machineId )
                {
                        setExpandedMachineId( null );
                } else
                {
                        setExpandedMachineId( machineId );
                        try
                        {
                                const machine=machineries.find( m => m.id===machineId );
                                if ( machine )
                                {
                                        await axios.post( '/api/machineries/contact', { contactNumber: machine.contactNumber } );
                                        // Show a success message to the user
                                }
                        } catch ( error )
                        {
                                console.error( 'Failed to send message', error );
                                // Show an error message to the user
                        }
                }
        };

        const toggleForm=() =>
        {
                setShowForm( !showForm );
        };

        const chartOptions={
                chart: {
                        type: 'pie',
                        options3d: {
                                enabled: true,
                                alpha: 45,
                                beta: 0,
                        },
                        backgroundColor: 'var(--bg-soft)',
                },
                title: {
                        text: 'Machinery Availability',
                        style: { color: 'var(--text)' }
                },
                plotOptions: {
                        pie: {
                                innerSize: 100,
                                depth: 45,
                                dataLabels: {
                                        enabled: true,
                                        format: '<b>{point.name}</b>: {point.y}',
                                        style: { color: 'var(--text-soft)' }
                                },
                        },
                },
                series: [ {
                        name: 'Count',
                        data: machineries.map( ( machine, index ) => ( {
                                name: machine.vehicle_type,
                                y: parseInt( machine.available_quantity )||0,
                                color: COLORS[ index%COLORS.length ],
                        } ) ),
                } ],
        };

        return (
                <div className={ styles.container }>
                        <div className={ styles.machineList }>
                                <h2>Available Machineries</h2>
                                { loading? (
                                        <div className={ styles.loader }>
                                                <div className={ styles.spinner }></div>
                                                <p>Loading machineries...</p>
                                        </div>
                                ):(
                                        machineries.map( ( machine, index ) => (
                                                <div key={ machine.id||index } className={ `${ styles.machineItem } ${ expandedMachineId===machine.id? styles.expanded:'' }` }>
                                                        <div className={ styles.machineItemHeader }>
                                                                <Image
                                                                        src={ `/rental/image${ index+1 }.png` }
                                                                        alt={ machine.vehicle_type }
                                                                        width={ 50 }
                                                                        height={ 50 }
                                                                        className={ styles.machineImage }
                                                                />
                                                                <span className={ styles.machineName }>{ machine.vehicle_type }</span>
                                                                <span className={ styles.locationIcon }>📍 { machine.provider }</span>
                                                                <span className={ styles.rentAmount }>${ machine.rent_amount }</span>
                                                                <button
                                                                        className={ styles.getButton }
                                                                        onClick={ () => handleGetButtonClick( machine.id ) }
                                                                >
                                                                        { expandedMachineId===machine.id? 'Close':'Get' }
                                                                </button>
                                                        </div>
                                                        { expandedMachineId===machine.id&&(
                                                                <div className={ styles.expandedContent }>
                                                                        <Image
                                                                                src={ `/rental/image${ index+1 }.png` }
                                                                                alt={ machine.vehicle_type }
                                                                                width={ 200 }
                                                                                height={ 200 }
                                                                                className={ styles.expandedImage }
                                                                        />
                                                                        <div className={ styles.detailedInfo }>
                                                                                <p><strong>Vehicle Type:</strong> { machine.vehicle_type }</p>
                                                                                <p><strong>Provider:</strong> { machine.provider }</p>
                                                                                <p><strong>Rent Amount:</strong> ${ machine.rent_amount }</p>
                                                                                <p><strong>Available Quantity:</strong> { machine.available_quantity }</p>
                                                                                <p><strong>Contact Number:</strong> { machine.contactNumber }</p>
                                                                        </div>
                                                                </div>
                                                        ) }
                                                </div>
                                        ) )
                                ) }
                        </div>
                        <div className={ styles.rightSection }>
                                <h2>Machinery Availability</h2>
                                <div className={ styles.chartContainer }>
                                        <HighchartsReact
                                                highcharts={ Highcharts }
                                                options={ chartOptions }
                                        />
                                </div>
                                <div className={ styles.addMachineSection }>
                                        <button onClick={ toggleForm } className={ styles.addIcon }>
                                                { showForm? '✖':'➕' }
                                        </button>
                                        { showForm&&(
                                                <form onSubmit={ handleSubmit } className={ styles.addMachineForm }>
                                                        <h3>Add Machine For Rent</h3>
                                                        { [ 'available_quantity', 'provider', 'rent_amount', 'vehicle_type', 'contactNumber' ].map( ( field ) => (
                                                                <div key={ field } className={ styles.formGroup }>
                                                                        <input
                                                                                type="text"
                                                                                name={ field }
                                                                                value={ newMachine[ field ] }
                                                                                onChange={ handleInputChange }
                                                                                placeholder={ field.split( '_' ).map( word => word.charAt( 0 ).toUpperCase()+word.slice( 1 ) ).join( ' ' ) }
                                                                                className={ styles.input }
                                                                                required
                                                                        />
                                                                </div>
                                                        ) ) }
                                                        <button type="submit" className={ styles.addButton }>
                                                                { loading? 'Adding...':'Add Machine' }
                                                        </button>
                                                </form>
                                        ) }
                                </div>
                        </div>
                </div>
        );
};

export default RentalService;