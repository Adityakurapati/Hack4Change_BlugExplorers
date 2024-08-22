'use client'
import React, { useState } from 'react';
import styles from './agritutor.module.css';

const blogPosts=[
        {
                id: 1,
                title: 'Mushroom Cultivation: A Beginner\'s Guide',
                excerpt: 'Learn the basics of growing various types of mushrooms, from shiitake to oyster.',
                image: '/images/mushroom.jpg',
                category: 'Unique Crops'
        },
        {
                id: 2,
                title: 'Dragon Fruit: The Exotic Super Fruit',
                excerpt: 'Discover how to grow and care for dragon fruit plants in your own garden.',
                image: '/images/dragon-fruit.jpg',
                category: 'Exotic Fruits'
        },
        {
                id: 3,
                title: 'Kiwi Farming: Tips for Success',
                excerpt: 'Master the art of kiwi cultivation with our comprehensive guide.',
                image: '/images/kiwi.jpg',
                category: 'Nutritious Fruits'
        },
        {
                id: 4,
                title: 'Quinoa: The Super Grain',
                excerpt: 'Explore the benefits and cultivation techniques for this nutrient-rich crop.',
                image: '/images/quinoa.jpg',
                category: 'Nutritious Crops'
        },
        {
                id: 5,
                title: 'Vertical Farming: Maximize Your Space',
                excerpt: 'Learn how to implement vertical farming techniques for urban agriculture.',
                image: '/images/vertical-farming.jpg',
                category: 'Modern Techniques'
        },
        {
                id: 6,
                title: 'Hydroponics: Soil-Free Farming',
                excerpt: 'Dive into the world of hydroponics and grow crops without soil.',
                image: '/images/hydroponics.jpg',
                category: 'Modern Techniques'
        }
];

const AgriTutor=() =>
{
        const [ filter, setFilter ]=useState( 'All' );

        const filteredPosts=filter==='All'
                ? blogPosts
                :blogPosts.filter( post => post.category===filter );

        return (
                <section className={ styles.agriTutor }>
                        <h2 className={ styles.title }>Agri-Tutor: Learn, Grow, Succeed</h2>
                        <div className={ styles.filterContainer }>
                                <button onClick={ () => setFilter( 'All' ) } className={ `${ styles.filterButton } ${ filter==='All'? styles.active:'' }` }>All</button>
                                <button onClick={ () => setFilter( 'Unique Crops' ) } className={ `${ styles.filterButton } ${ filter==='Unique Crops'? styles.active:'' }` }>Unique Crops</button>
                                <button onClick={ () => setFilter( 'Exotic Fruits' ) } className={ `${ styles.filterButton } ${ filter==='Exotic Fruits'? styles.active:'' }` }>Exotic Fruits</button>
                                <button onClick={ () => setFilter( 'Nutritious Crops' ) } className={ `${ styles.filterButton } ${ filter==='Nutritious Crops'? styles.active:'' }` }>Nutritious Crops</button>
                                <button onClick={ () => setFilter( 'Modern Techniques' ) } className={ `${ styles.filterButton } ${ filter==='Modern Techniques'? styles.active:'' }` }>Modern Techniques</button>
                        </div>
                        <div className={ styles.blogGrid }>
                                { filteredPosts.map( post => (
                                        <div key={ post.id } className={ styles.blogCard }>
                                                <img src={ post.image } alt={ post.title } className={ styles.blogImage } />
                                                <div className={ styles.blogContent }>
                                                        <h3 className={ styles.blogTitle }>{ post.title }</h3>
                                                        <p className={ styles.blogExcerpt }>{ post.excerpt }</p>
                                                        <span className={ styles.blogCategory }>{ post.category }</span>
                                                </div>
                                        </div>
                                ) ) }
                        </div>
                </section>
        );
};

export default AgriTutor;