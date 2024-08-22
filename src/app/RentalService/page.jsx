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
let counter=1;

const COLORS=[ '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40' ];

const RentalService=() =>
{
        const [ machineries, setMachineries ]=useState( [] );
        const [ newMachine, setNewMachine ]=useState( { available_quantity: '', provider: '', rent_amount: '', vehicle_type: '', contactNumber: '' } );
        const [ showForm, setShowForm ]=useState( false );

        useEffect( () =>
        {
                // Fetch machineries data from the backend API
                const fetchMachineries=async () =>
                {
                        try
                        {
                                const response=await axios.get( '/api/machineries/get' );
                                const data=response.data.machineries? Object.values( response.data.machineries ):[];
                                setMachineries( data );
                        } catch ( error )
                        {
                                console.error( 'Failed to fetch machineries', error );
                        }
                };

                fetchMachineries();
        }, [] );

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
                        const params=new URLSearchParams( newMachine ).toString();
                        await axios.get( `/api/machineries/add?${ params }` );
                        setNewMachine( { available_quantity: '', provider: '', rent_amount: '', vehicle_type: '', contactNumber: '' } );
                        setShowForm( false );

                        // Re-fetch the updated machineries list
                        const response=await axios.get( '/api/machineries/get' );
                        const data=response.data.machineries? Object.values( response.data.machineries ):[];
                        setMachineries( data );

                } catch ( error )
                {
                        console.error( 'Failed to add machine', error );
                }
        };

        const handleGetButtonClick=async ( contactNumber ) =>
        {
                try
                {
                        // Send a message to the contactNumber
                        await axios.post( '/api/machineries/contact', { contactNumber } );
                } catch ( error )
                {
                        console.error( 'Failed to send message', error );
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
                },
                title: {
                        text: 'Machinery Availability',
                },
                plotOptions: {
                        pie: {
                                innerSize: 100,
                                depth: 45,
                                dataLabels: {
                                        enabled: true,
                                        format: '<b>{point.name}</b>: {point.y}',
                                },
                        },
                },
                series: [
                        {
                                name: 'Count',
                                data: machineries.map( ( machine, index ) => ( {
                                        name: machine.vehicle_type,
                                        y: parseInt( machine.available_quantity )||0, // Ensure that the count is an integer
                                        color: COLORS[ index%COLORS.length ],
                                } ) ),
                        },
                ],
        };

        return (
                <div className={ styles.container }>
                        <div className={ styles.machineList }>
                                <h2>Available Machineries</h2>
                                { machineries.map( ( machine, index ) => (
                                        <div key={ index } className={ styles.machineItem }>
                                                <Image
                                                        key={ index }
                                                        src={ `/rental/image${ counter++ }.png` }
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
                                                        onClick={ () => handleGetButtonClick( machine.contactNumber ) }
                                                >
                                                        Get
                                                </button>
                                        </div>
                                ) ) }
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
                                                        <div className={ styles.formGroup }>
                                                                <input
                                                                        type="text"
                                                                        name="available_quantity"
                                                                        value={ newMachine.available_quantity }
                                                                        onChange={ handleInputChange }
                                                                        placeholder="Available Quantity"
                                                                        className={ styles.input }
                                                                        required
                                                                />
                                                        </div>
                                                        <div className={ styles.formGroup }>
                                                                <input
                                                                        type="text"
                                                                        name="provider"
                                                                        value={ newMachine.provider }
                                                                        onChange={ handleInputChange }
                                                                        placeholder="Provider"
                                                                        className={ styles.input }
                                                                        required
                                                                />
                                                        </div>
                                                        <div className={ styles.formGroup }>
                                                                <input
                                                                        type="text"
                                                                        name="rent_amount"
                                                                        value={ newMachine.rent_amount }
                                                                        onChange={ handleInputChange }
                                                                        placeholder="Rent Amount"
                                                                        className={ styles.input }
                                                                        required
                                                                />
                                                        </div>
                                                        <div className={ styles.formGroup }>
                                                                <input
                                                                        type="text"
                                                                        name="vehicle_type"
                                                                        value={ newMachine.vehicle_type }
                                                                        onChange={ handleInputChange }
                                                                        placeholder="Vehicle Type"
                                                                        className={ styles.input }
                                                                        required
                                                                />
                                                        </div>
                                                        <div className={ styles.formGroup }>
                                                                <input
                                                                        type="text"
                                                                        name="contactNumber"
                                                                        value={ newMachine.contactNumber }
                                                                        onChange={ handleInputChange }
                                                                        placeholder="Contact Number"
                                                                        className={ styles.input }
                                                                        required
                                                                />
                                                        </div>
                                                        <button type="submit" className={ styles.addButton }>Add Machine</button>
                                                </form>
                                        ) }
                                </div>
                        </div>
                </div>
        );
};

export default RentalService;
