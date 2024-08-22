'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import styles from './links.module.css';
import NavLink from './navLink/navLink';
import Image from 'next/image';
import { handleGithubSignout } from '@lib/actions';
const Links=( { session } ) =>
{
        const links=[
                { title: "DashBoard", path: "/Dashboard" },
                { title: "Market Prize ", path: "/MarketPrize" },
                { title: "Crop Recommendation", path: "/Dashboard" },
                { title: "Rental Service", path: "/RentalService" }
        ];

        const [ open, setOpen ]=useState( false );
        // const session=true;  // Temporary session state
        const isAdmin=true;  // Temporary admin state

        return (
                <div className={ styles.container }>
                        <div className={ styles.links }>
                                { links.map( link => (
                                        <NavLink item={ link } key={ link.title } />
                                ) ) }

                        </div>
                        <button className={ styles.menu__button } onClick={ () => setOpen( prev => !prev ) }>Menu</button>
                        <Image src="/menu.png" alt="" fill className={ styles.menu__button } onClick={ () => setOpen( prev => !prev ) } />
                        { open&&(
                                <div className={ styles.mobile_links }>
                                        { links.map( link => (
                                                <NavLink item={ link } key={ link.title } />
                                        ) ) }
                                </div>
                        ) }
                </div>
        );
};

export default Links;
