'use client';

import React, { useEffect, useState } from 'react';
import Links from './links/Links';
import styles from './navbar.module.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOutUser } from '@/lib/auth';
import { useRouter } from 'next/navigation';

const useActive=( path ) =>
{
        const pathname=usePathname();
        return pathname===path;
};

const Navbar=( { user } ) =>
{
        const router=useRouter();
        const pathname=usePathname();
        const isHome=useActive( '/' );
        const isLogin=useActive( '/login' )||useActive( '/register' );
        const isSoil=useActive( '/soil_control' );
        const isDashboard=useActive( '/Dashboard' );
        const isLabour=useActive( '/labour' ); // Added check for '/labour' path

        const [ isWaterOn, setIsWaterOn ]=useState( false );
        const [ temperature, setTemperature ]=useState( 28 );
        const [ humidity, setHumidity ]=useState( 45 );
        const [ navbarColor, setNavbarColor ]=useState( 'transparent' ); // State for navbar color

        useEffect( () =>
        {
                const handleScroll=() =>
                {
                        const scrollPosition=window.scrollY;
                        const pageHeight=document.documentElement.scrollHeight-window.innerHeight;
                        const scrollPercent=( scrollPosition/pageHeight )*100;

                        if ( scrollPercent>30 )
                        {
                                setNavbarColor( 'rgb(99 95 142)' ); // Change to desired color
                        } else
                        {
                                setNavbarColor( 'transparent' ); // Original color
                        }
                };

                window.addEventListener( 'scroll', handleScroll );

                // Cleanup on component unmount
                return () => window.removeEventListener( 'scroll', handleScroll );
        }, [] );

        useEffect( () =>
        {
                if ( isHome||isLogin||isSoil||isLabour )
                {
                        document.body.style.backgroundImage="url('/background.png')";
                        document.body.style.backgroundSize='cover';
                        document.body.style.backgroundPosition='center';
                } else
                {
                        document.body.style.backgroundImage='none';
                        document.body.style.backgroundColor='#013D3B';
                }
        }, [ isHome, isLogin, isSoil, isDashboard, isLabour ] ); // Included isLabour in the dependency array

        const toggleWater=() => setIsWaterOn( !isWaterOn );

        const handleLogout=async () =>
        {
                try
                {
                        await signOutUser();
                        router.push( '/login' );
                } catch ( error )
                {
                        console.error( 'Logout error:', error );
                }
        };

        return (
                <div
                        className={ `${ styles.container } ${ isHome||isDashboard? styles.transparent:'' } ${ isLogin||isLabour? styles.hidden:''
                                }` }
                        style={ { backgroundColor: navbarColor } } // Apply navbar color
                >
                        { !isDashboard&&(
                                <Link href='/' style={ { marginLeft: "30px", fontSize: '25px' } }>
                                        <span>Ashwatthama</span>
                                        <div style={ { fontSize: '14px', color: 'black', marginTop: '-2px' } }>from Javan to kisan</div>
                                </Link>
                        ) }

                        { !isDashboard&&(
                                <>
                                        { isSoil&&(
                                                <div className={ styles.environmentInfo }>
                                                        <div className={ styles.infoItem }>
                                                                <i className="fas fa-thermometer-half"></i>
                                                                <span>{ temperature }°C</span>
                                                        </div>
                                                        <div className={ styles.infoItem }>
                                                                <i className="fas fa-tint"></i>
                                                                <span>{ humidity }%</span>
                                                        </div>
                                                        <button
                                                                className={ `${ styles.waterToggle } ${ isWaterOn? styles.on:styles.off }` }
                                                                onClick={ toggleWater }
                                                                aria-label={ isWaterOn? "Turn water off":"Turn water on" }
                                                        >
                                                                <i className={ `fas fa-${ isWaterOn? 'tint':'tint-slash' }` }></i>
                                                        </button>
                                                </div>
                                        ) }

                                        { !isHome&&(
                                                <div className={ styles.navLinks }>
                                                        <Links />
                                                        { user? (
                                                                <>
                                                                        <span className={ styles.userEmail }>{ user.email }</span>
                                                                        <button onClick={ handleLogout } className={ styles.logoutButton }>Logout</button>
                                                                </>
                                                        ):(
                                                                <Link href="/login" className={ styles.loginLink }>Login</Link>
                                                        ) }
                                                </div>
                                        ) }
                                </>
                        ) }
                </div>
        );
};

export default Navbar;
