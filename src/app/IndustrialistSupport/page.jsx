'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import styles from './remoteFarm.module.css';
const labourers=[
        {
                id: 1,
                name: 'Farm Cleaner',
                image: '/dashboard/labour.png',
                company: 'AgriTech Solutions',
                requirement: 'Cleaning and maintenance of farm',
                place: 'Rural Area 1'
        },
        {
                id: 2,
                name: 'Farm Worker',
                image: '/dashboard/labour.png',
                company: 'Green Farms Ltd.',
                requirement: 'General farm work including planting and harvesting',
                place: 'Rural Area 2'
        },
        {
                id: 3,
                name: 'Farm Helper',
                image: '/dashboard/labour.png',
                company: 'FarmCo',
                requirement: 'Assisting in daily farm operations',
                place: 'Rural Area 3'
        },
        {
                id: 4,
                name: 'Field Assistant',
                image: '/dashboard/labour.png',
                company: 'AgriWorks Inc.',
                requirement: 'Field work and crop monitoring',
                place: 'Rural Area 4'
        },
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
                                                        placeholder="Company Name"
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
                                                        placeholder="Crop Production Requirement"
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
                                                        placeholder="Quantity"
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
                                                        placeholder="Quantity"
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
                                <h2>Requirements From Industrialist</h2>
                                <div className={ styles.labourerContainer }>
                                        { labourers.map( ( labourer ) => (
                                                <div key={ labourer.id } className={ styles.labourerCard }>
                                                        <Image
                                                                src={ labourer.image }
                                                                alt={ labourer.name }
                                                                width={ 150 }
                                                                height={ 150 }
                                                                className={ styles.labourerImage }
                                                        />
                                                        <div className={ styles.labourerDetails }>
                                                                <h2 className={ styles.labourerName }>{ labourer.name }</h2>
                                                                <p className={ styles.companyName }>{ labourer.company }</p>
                                                                <p className={ styles.requirement }>{ labourer.requirement }</p>
                                                                <p className={ styles.place }>{ labourer.place }</p>
                                                        </div>
                                                        <div className={ styles.labourerActions }>
                                                                <button className={ styles.acceptButton }>Accept</button>
                                                                <button className={ styles.rejectButton }>Reject</button>
                                                        </div>
                                                </div>
                                        ) ) }
                                </div>

                        </div>
                </div>
        );
};

export default FarmIndustryPartnership;
