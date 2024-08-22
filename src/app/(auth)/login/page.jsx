'use client';

import React, { useState } from 'react';
import { signInUser } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import styles from './login.module.css';

const LoginPage=() =>
{
        const [ loginIdentifier, setLoginIdentifier ]=useState( '' );
        const [ password, setPassword ]=useState( '' );
        const [ error, setError ]=useState( '' );
        const router=useRouter();

        const handleLogin=async ( e ) =>
        {
                e.preventDefault();
                setError( '' );
                try
                {
                        const result=await signInUser( loginIdentifier, password );
                        if ( result.success )
                        {
                                // Store user information in localStorage or sessionStorage
                                localStorage.setItem( 'user', JSON.stringify( result.user ) );

                                router.push( '/' ); // Redirect to home page on success
                        }
                } catch ( error )
                {
                        setError( error.message ); // Display error message
                }
        };

        return (
                <div className={ styles.container }>
                        <div className={ styles.leftPanel }>
                                <h1 className={ styles.title }>Farm Flow Logistic</h1>
                                { error&&<p className={ styles.error }>{ error }</p> }
                                <form className={ styles.form } onSubmit={ handleLogin }>
                                        <div className={ styles.inputGroup }>
                                                <label htmlFor="loginIdentifier">Email / Username / Contact Number</label>
                                                <input
                                                        type="text"
                                                        id="loginIdentifier"
                                                        value={ loginIdentifier }
                                                        onChange={ ( e ) => setLoginIdentifier( e.target.value ) }
                                                        required
                                                />
                                        </div>
                                        <div className={ styles.inputGroup }>
                                                <label htmlFor="password">Password</label>
                                                <input
                                                        type="password"
                                                        id="password"
                                                        value={ password }
                                                        onChange={ ( e ) => setPassword( e.target.value ) }
                                                        required
                                                />
                                        </div>
                                        <button type="submit" className={ styles.loginButton }>Login</button>
                                </form>
                        </div>
                </div>
        );
};

export default LoginPage;
