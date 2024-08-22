'use client'

import { usePathname } from 'next/navigation';
import React from 'react';
import styles from './navLink.module.css';
import Link from 'next/link';

const NavLink=( { item } ) =>
{
        const pathName=usePathname();
        return (
                <Link href={ item.path } className={ `${ styles.container }` }>
                        { item.title }
                </Link>
        );
}

export default NavLink;
