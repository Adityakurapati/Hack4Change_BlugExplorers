import React, { useState } from 'react';
import axios from 'axios';
import styles from './labourForm.module.css';

const LabourForm=() =>
{
        const [ laborRequest, setLaborRequest ]=useState( {
                purpose: '',
                payment: '',
                days: '',
                city: ''  // Added city field
        } );

        const handleInputChange=( e ) =>
        {
                const { name, value }=e.target;
                setLaborRequest( ( prev ) => ( { ...prev, [ name ]: value } ) );
        };

        const handleSubmit=async ( e ) =>
        {
                e.preventDefault();
                try
                {
                        const queryString=new URLSearchParams( laborRequest ).toString();
                        const response=await axios.get( `/api/labours/add?${ queryString }` );
                        setLaborRequest( { purpose: '', payment: '', days: '', city: '' } ); // Reset city field
                        alert( 'Labor request posted successfully!' );
                } catch ( error )
                {
                        console.error( 'Failed to post labor request', error );
                }
        };

        return (
                <div className={ styles.formContainer }>
                        <h2>Request For A Labour</h2>
                        <form onSubmit={ handleSubmit }>
                                <div className={ styles.inputGroup }>
                                        <label>Why do you need the labor?</label>
                                        <input
                                                type="text"
                                                name="purpose"
                                                value={ laborRequest.purpose }
                                                onChange={ handleInputChange }
                                                placeholder="Purpose"
                                                className={ styles.input }
                                        />
                                </div>
                                <div className={ styles.inputGroup }>
                                        <label>How much will you pay per hour?</label>
                                        <input
                                                type="text"
                                                name="payment"
                                                value={ laborRequest.payment }
                                                onChange={ handleInputChange }
                                                placeholder="Payment"
                                                className={ styles.input }
                                        />
                                </div>
                                <div className={ styles.inputGroup }>
                                        <label>For how many days do you need the labor?</label>
                                        <input
                                                type="text"
                                                name="days"
                                                value={ laborRequest.days }
                                                onChange={ handleInputChange }
                                                placeholder="Days"
                                                className={ styles.input }
                                        />
                                </div>
                                <div className={ styles.inputGroup }>
                                        <label>City</label> {/* New city field */ }
                                        <input
                                                type="text"
                                                name="city"
                                                value={ laborRequest.city }
                                                onChange={ handleInputChange }
                                                placeholder="City"
                                                className={ styles.input }
                                        />
                                </div>
                                <button type="submit" className={ styles.submitButton }>Submit Request</button>
                        </form>
                </div>
        );
};

export default LabourForm;
