'use client';
import { useRouter } from 'next/navigation';
import styles from './redirector.module.css'
const Redirector=() =>
{
        const router=useRouter();

        const handleRedirect=() =>
        {
                router.push( '/home' );
        };
        return (
                <button className={ styles.button } onClick={ handleRedirect }>Let's Start</button>
        )
}

export default Redirector