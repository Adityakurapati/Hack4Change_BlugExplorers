'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './register.module.css';
import { register } from '@lib/actions';
import { useRouter } from 'next/navigation';

const fetchStatesWithDistricts=async () =>
{
        const response=await fetch( '/stateDistricts.json' );
        if ( !response.ok )
        {
                throw new Error( 'Failed to fetch states and districts' );
        }
        return response.json();
};

const SignupPage=() =>
{
        const router=useRouter();
        const [ error, setError ]=useState( '' );
        const [ formData, setFormData ]=useState( {
                username: '',
                email: '',
                password: '',
                passwordRepeat: '',
                contactNumber: '',
                state: '',
                district: '',
                profileImage: null,
        } );
        const [ statesWithDistricts, setStatesWithDistricts ]=useState( {} );

        useEffect( () =>
        {
                const loadStatesWithDistricts=async () =>
                {
                        try
                        {
                                const data=await fetchStatesWithDistricts();
                                setStatesWithDistricts( data );
                        } catch ( error )
                        {
                                console.error( error );
                        }
                };

                loadStatesWithDistricts();
        }, [] );

        const handleChange=( e ) =>
        {
                const { name, value, files }=e.target;
                setFormData( {
                        ...formData,
                        [ name ]: files? files[ 0 ]:value,
                } );
        };

        useEffect( () =>
        {
                setFormData( ( prevData ) => ( {
                        ...prevData,
                        district: '',
                } ) );
        }, [ formData.state ] );

        const handleSubmit=async ( e ) =>
        {
                e.preventDefault();
                setError( '' );

                if ( formData.password!==formData.passwordRepeat )
                {
                        setError( "Passwords do not match" );
                        return;
                }

                const result=await register( null, new FormData( e.target ) );

                if ( result.error )
                {
                        setError( result.error );
                } else if ( result.success )
                {
                        router.push( '/login' );
                }
        };

        return (
                <div className={ styles.container }>
                        <div className={ styles.leftPanel }>
                                <Image src="/tractor-icon.svg" alt="Farm Flow Logistic" width={ 80 } height={ 80 } />
                                <h2>Farm Flow Logistic</h2>
                                <p>Create Your Account</p>
                        </div>
                        <div className={ styles.rightPanel }>
                                <h1 className={ styles.title }>Sign Up Here!</h1>
                                { error&&<p className={ styles.error }>{ error }</p> }
                                <form className={ styles.form } onSubmit={ handleSubmit }>
                                        <div className={ styles.formRow }>
                                                <div className={ styles.inputGroup }>
                                                        <label htmlFor="username">Username</label>
                                                        <input
                                                                type="text"
                                                                id="username"
                                                                name="username"
                                                                required
                                                                onChange={ handleChange }
                                                        />
                                                </div>
                                                <div className={ styles.inputGroup }>
                                                        <label htmlFor="email">Email</label>
                                                        <input
                                                                type="email"
                                                                id="email"
                                                                name="email"
                                                                required
                                                                onChange={ handleChange }
                                                        />
                                                </div>
                                        </div>
                                        <div className={ styles.formRow }>
                                                <div className={ styles.inputGroup }>
                                                        <label htmlFor="password">Password</label>
                                                        <input
                                                                type="password"
                                                                id="password"
                                                                name="password"
                                                                required
                                                                onChange={ handleChange }
                                                        />
                                                </div>
                                                <div className={ styles.inputGroup }>
                                                        <label htmlFor="passwordRepeat">Confirm Password</label>
                                                        <input
                                                                type="password"
                                                                id="passwordRepeat"
                                                                name="passwordRepeat"
                                                                required
                                                                onChange={ handleChange }
                                                        />
                                                </div>
                                        </div>
                                        <div className={ styles.formRow }>
                                                <div className={ styles.inputGroup }>
                                                        <label htmlFor="contactNumber">Contact Number</label>
                                                        <input
                                                                type="tel"
                                                                id="contactNumber"
                                                                name="contactNumber"
                                                                onChange={ handleChange }
                                                        />
                                                </div>
                                                <div className={ styles.inputGroup }>
                                                        <label htmlFor="state">State</label>
                                                        <select
                                                                id="state"
                                                                name="state"
                                                                required
                                                                onChange={ handleChange }
                                                        >
                                                                <option value="">Select State</option>
                                                                { Object.keys( statesWithDistricts ).map( ( state ) => (
                                                                        <option key={ state } value={ state }>
                                                                                { state }
                                                                        </option>
                                                                ) ) }
                                                        </select>
                                                </div>
                                        </div>
                                        <div className={ styles.formRow }>
                                                <div className={ styles.inputGroup }>
                                                        <label htmlFor="district">District</label>
                                                        <select
                                                                id="district"
                                                                name="district"
                                                                required
                                                                onChange={ handleChange }
                                                                disabled={ !formData.state }
                                                        >
                                                                <option value="">Select District</option>
                                                                { formData.state&&
                                                                        statesWithDistricts[ formData.state ].map( ( district ) => (
                                                                                <option key={ district } value={ district }>
                                                                                        { district }
                                                                                </option>
                                                                        ) ) }
                                                        </select>
                                                </div>
                                        </div>
                                        <div className={ styles.formRow }>
                                                <div className={ styles.inputGroup }>
                                                        <label htmlFor="profileImage">Profile Image</label>
                                                        <input
                                                                type="file"
                                                                id="profileImage"
                                                                name="profileImage"
                                                                accept="image/*"
                                                                onChange={ handleChange }
                                                        />
                                                </div>
                                        </div>
                                        <div className={ styles.buttonGroup }>
                                                <button type="submit" className={ styles.signupButton }>Sign Up</button>
                                        </div>
                                </form>
                                <p className={ styles.loginLink }>
                                        Already have an account? <a href="/login">Login</a>
                                </p>
                        </div>
                </div>
        );
};

export default SignupPage;
