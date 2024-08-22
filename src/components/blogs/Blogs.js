'use client'

import { useState, useEffect } from 'react';
import { fetchAgricultureNews } from '@lib/actions';
import styles from './blogs.module.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { motion, AnimatePresence } from 'framer-motion';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function Blogs ()
{
        const [ blogPosts, setBlogPosts ]=useState( [] );
        const [ loading, setLoading ]=useState( true );
        const [ error, setError ]=useState( null );

        useEffect( () =>
        {
                loadNews();
        }, [] );

        async function loadNews ()
        {
                setLoading( true );
                setError( null );
                try
                {
                        console.log( 'Fetching agriculture news...' );
                        const response=await fetchAgricultureNews( 1, 9 );
                        console.log( 'API Response:', response );

                        if ( response&&Array.isArray( response.articles ) )
                        {
                                setBlogPosts( response.articles );
                                console.log( 'News articles loaded successfully:', response.articles.length );
                        } else
                        {
                                throw new Error( 'Invalid response structure' );
                        }
                } catch ( err )
                {
                        console.error( 'Error fetching news:', err );
                        setError( 'Failed to load news. Please try again later.' );
                } finally
                {
                        setLoading( false );
                }
        }

        const containerVariants={
                hidden: { opacity: 0 },
                visible: {
                        opacity: 1,
                        transition: {
                                delayChildren: 0.3,
                                staggerChildren: 0.2
                        }
                }
        };

        const itemVariants={
                hidden: { y: 20, opacity: 0 },
                visible: {
                        y: 0,
                        opacity: 1
                }
        };

        if ( error ) return (
                <motion.div
                        initial={ { opacity: 0 } }
                        animate={ { opacity: 1 } }
                        className={ styles.error }
                >
                        { error }
                </motion.div>
        );

        if ( loading ) return (
                <motion.div
                        initial={ { opacity: 0 } }
                        animate={ { opacity: 1 } }
                        className={ styles.loading }
                >
                        Loading...
                </motion.div>
        );

        return (
                <motion.section
                        className={ styles.blog }
                        initial="hidden"
                        animate="visible"
                        variants={ containerVariants }
                >
                        <motion.h2 variants={ itemVariants }>Agriculture News And Articles</motion.h2>
                        <Swiper
                                modules={ [ Navigation, Pagination, Autoplay ] }
                                spaceBetween={ 30 }
                                slidesPerView={ 1 }
                                navigation
                                pagination={ { clickable: true } }
                                autoplay={ { delay: 5000, disableOnInteraction: false } }
                                breakpoints={ {
                                        640: {
                                                slidesPerView: 2,
                                        },
                                        1024: {
                                                slidesPerView: 3,
                                        },
                                } }
                                className={ styles.swiperContainer }
                        >
                                <AnimatePresence>
                                        { blogPosts.map( ( post, index ) => (
                                                <SwiperSlide key={ index } className={ styles.swiperSlide }>
                                                        <motion.div
                                                                className={ styles.post }
                                                                variants={ itemVariants }
                                                                whileHover={ { scale: 1.05 } }
                                                                whileTap={ { scale: 0.95 } }
                                                        >
                                                                { post.image&&(
                                                                        <motion.img
                                                                                src={ post.image }
                                                                                alt={ post.title||'News image' }
                                                                                initial={ { opacity: 0 } }
                                                                                animate={ { opacity: 1 } }
                                                                                transition={ { delay: 0.2 } }
                                                                        />
                                                                ) }
                                                                <motion.div
                                                                        className={ styles.postContent }
                                                                        initial={ { opacity: 0, y: 20 } }
                                                                        animate={ { opacity: 1, y: 0 } }
                                                                        transition={ { delay: 0.3 } }
                                                                >
                                                                        <h3>{ post.title||'Untitled' }</h3>
                                                                        { post.description&&(
                                                                                <p className={ styles.description }>
                                                                                        { post.description.length>100
                                                                                                ? `${ post.description.substring( 0, 100 ) }...`
                                                                                                :post.description }
                                                                                </p>
                                                                        ) }
                                                                        { post.publishedAt&&(
                                                                                <p className={ styles.date }>
                                                                                        Published: { new Date( post.publishedAt ).toLocaleDateString() }
                                                                                </p>
                                                                        ) }
                                                                        { post.url&&(
                                                                                <motion.a
                                                                                        href={ post.url }
                                                                                        target="_blank"
                                                                                        rel="noopener noreferrer"
                                                                                        className={ styles.readMore }
                                                                                        whileHover={ { scale: 1.1 } }
                                                                                        whileTap={ { scale: 0.9 } }
                                                                                >
                                                                                        Read more
                                                                                </motion.a>
                                                                        ) }
                                                                </motion.div>
                                                        </motion.div>
                                                </SwiperSlide>
                                        ) ) }
                                </AnimatePresence>
                        </Swiper>
                </motion.section>
        );
}