'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import styles from './remoteFarm.module.css';

const labourers=[
        { id: 1, name: 'Farm Cleaner', image: '/dashboard/labour.png' },
        { id: 2, name: 'Farm Worker', image: '/dashboard/labour.png' },
        { id: 3, name: 'Farm Helper', image: '/dashboard/labour.png' },
        { id: 4, name: 'Field Assistant', image: '/dashboard/labour.png' },
];

const FarmIndustryPartnership=() =>
{
        const [ labourRequest, setLabourRequest ]=useState( { purpose: '', production: '', advancePayment: '' } );

        const handleInputChange=( e ) =>
        {
                const { name, value }=e.target;
                setLabourRequest( prev => ( { ...prev, [ name ]: value } ) );
        };

        const handleSubmit=( e ) =>
        {
                e.preventDefault();
                console.log( 'Labour request:', labourRequest );
                setLabourRequest( { purpose: '', production: '', advancePayment: '' } );
        };

        return (
                <div className={ styles.container }>
                        <div className={ styles.requestSection }>
                                <h2>Request For A Industrial Service</h2>
                                <form onSubmit={ handleSubmit }>
                                        <div className={ styles.inputGroup }>
                                                <span className={ styles.inputIcon }>📋</span>
                                                <input
                                                        type="text"
                                                        name="purpose"
                                                        value={ labourRequest.purpose }
                                                        onChange={ handleInputChange }
                                                        placeholder="Why You Need the Labour"
                                                        className={ styles.input }
                                                        required
                                                />
                                        </div>
                                        <div className={ styles.inputGroup }>
                                                <span className={ styles.inputIcon }>📊</span>
                                                <input
                                                        type="text"
                                                        name="production"
                                                        value={ labourRequest.production }
                                                        onChange={ handleInputChange }
                                                        placeholder="What Is the Production"
                                                        className={ styles.input }
                                                        required
                                                />
                                        </div>
                                        <div className={ styles.inputGroup }>
                                                <span className={ styles.inputIcon }>💵</span>
                                                <input
                                                        type="text"
                                                        name="advancePayment"
                                                        value={ labourRequest.advancePayment }
                                                        onChange={ handleInputChange }
                                                        placeholder="How Much You Can Give in Advance"
                                                        className={ styles.input }
                                                        required
                                                />
                                        </div>
                                        <button type="submit" className={ styles.requestButton }>Request</button>
                                </form>
                        </div>

                        <div className={ styles.farmerImage }>
                                <Image src="/dashboard/labour.png" alt="Farmer" width={ 300 } height={ 300 } />
                        </div>

                        <div className={ styles.labourerList }>
                                <h2>Available Labourers</h2>
                                { labourers.map( ( labourer ) => (
                                        <div key={ labourer.id } className={ styles.labourerItem }>
                                                <Image src={ labourer.image } alt={ labourer.name } width={ 50 } height={ 50 } className={ styles.labourerImage } />
                                                <span className={ styles.labourerName }>{ labourer.name }</span>
                                                <button className={ styles.acceptButton }>Accept</button>
                                                <button className={ styles.rejectButton }>Reject</button>
                                        </div>
                                ) ) }
                                <div className={ styles.labourerDetails }>
                                        <div className={ styles.detailItem }>
                                                <span className={ styles.detailIcon }>📍</span>
                                                <span>Solapur</span>
                                        </div>
                                        <div className={ styles.detailItem }>
                                                <span className={ styles.detailIcon }>💰</span>
                                                <span>1000/day</span>
                                        </div>
                                </div>
                        </div>
                </div>
        );
};

export default FarmIndustryPartnership;
