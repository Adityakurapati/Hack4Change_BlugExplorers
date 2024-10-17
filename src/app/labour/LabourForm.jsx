import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import styles from './labourForm.module.css';

const LabourForm=( { onClose } ) =>
{
        const [ laborRequest, setLaborRequest ]=useState( {
                purpose: '',
                payment: '',
                days: '',
                city: '',
                state: '',
        } );

        const [ isSubmitting, setIsSubmitting ]=useState( false );

        const handleInputChange=( e ) =>
        {
                const { name, value }=e.target;
                setLaborRequest( ( prev ) => ( { ...prev, [ name ]: value } ) );
        };

        const handleSubmit=async ( e ) =>
        {
                e.preventDefault();
                setIsSubmitting( true );
                try
                {
                        const queryString=new URLSearchParams( laborRequest ).toString();
                        await axios.get( `/api/labours/add?${ queryString }` );
                        setLaborRequest( { purpose: '', payment: '', days: '', city: '', state: '' } );
                        alert( 'Labor request posted successfully!' );
                        onClose();
                } catch ( error )
                {
                        console.error( 'Failed to post labor request', error );
                        alert( 'Failed to post labor request. Please try again.' );
                } finally
                {
                        setIsSubmitting( false );
                }
        };

        return (
                <motion.div
                        className={ styles.formContainer }
                        initial={ { opacity: 0, y: 20 } }
                        animate={ { opacity: 1, y: 0 } }
                        exit={ { opacity: 0, y: -20 } }
                >
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
                                                required
                                        />
                                </div>
                                <div className={ styles.inputGroup }>
                                        <label>How much will you pay per hour?</label>
                                        <input
                                                type="number"
                                                name="payment"
                                                value={ laborRequest.payment }
                                                onChange={ handleInputChange }
                                                placeholder="Payment"
                                                className={ styles.input }
                                                required
                                        />
                                </div>
                                <div className={ styles.inputGroup }>
                                        <label>For how many days do you need the labor?</label>
                                        <input
                                                type="number"
                                                name="days"
                                                value={ laborRequest.days }
                                                onChange={ handleInputChange }
                                                placeholder="Days"
                                                className={ styles.input }
                                                required
                                        />
                                </div>
                                <div className={ styles.inputGroup }>
                                        <label>City</label>
                                        <input
                                                type="text"
                                                name="city"
                                                value={ laborRequest.city }
                                                onChange={ handleInputChange }
                                                placeholder="City"
                                                className={ styles.input }
                                                required
                                        />
                                </div>
                                <div className={ styles.inputGroup }>
                                        <label>State</label>
                                        <input
                                                type="text"
                                                name="state"
                                                value={ laborRequest.state }
                                                onChange={ handleInputChange }
                                                placeholder="State"
                                                className={ styles.input }
                                                required
                                        />
                                </div>
                                <motion.button
                                        type="submit"
                                        className={ styles.submitButton }
                                        disabled={ isSubmitting }
                                        whileHover={ { scale: 1.05 } }
                                        whileTap={ { scale: 0.95 } }
                                >
                                        { isSubmitting? 'Submitting...':'Submit Request' }
                                </motion.button>
                        </form>
                </motion.div>
        );
};

export default LabourForm;