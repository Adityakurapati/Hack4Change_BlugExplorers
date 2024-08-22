import Image from 'next/image';
import styles from './about.module.css'

export const metadata={
        title: "Our Information",
        description: "Pure Farm And Farmer Friend"
};

const AboutPage=() =>
{
        const infoItems=[
                { title: 'Plant Disease', image: '/about/icon-1.png' },
                { title: 'Market Price Monitoring', image: '/about/icon-2.png' },
                { title: 'Remote Farm Monitoring', image: '/about/icon-3.png' },
                { title: 'Direct Customer - Farmer Support', image: '/about/icon-4.png' },
                { title: 'Bidding System', image: '/about/icon-5.png' },
                { title: 'Weather Monitoring TO Win Against Water Uncertainty', image: '/about/icon-6.png' },
        ];

        return (
                <div className={ styles.container }>
                        <h1 className={ styles.title }>Our Information</h1>
                        <div className={ styles.content }>
                                <div className={ styles.imageContainer }>
                                        <Image src='/about/farm-tractor.png' alt='Farm Tractor' fill className={ styles.img } />
                                        <div className={ styles.imageCaption }>
                                                <span>100+</span>
                                                <p>Farmers Registered</p>
                                        </div>
                                </div>
                                <div className={ styles.infoContainer }>
                                        <h2 className={ styles.subtitle }>
                                                Pure Farm And <span className={ styles.highlight }>Farmer Friend</span>
                                        </h2>
                                        <div className={ styles.gridContainer }>
                                                { infoItems.map( ( item, index ) => (
                                                        <div key={ index } className={ styles.gridItem }>
                                                                <Image src={ item.image } alt={ item.title } width={ 100 } height={ 100 } />
                                                                <p>{ item.title }</p>
                                                        </div>
                                                ) ) }
                                        </div>
                                </div>
                        </div>
                </div>
        )
}

export default AboutPage