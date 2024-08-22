'use client'
import styles from './footer.module.css';

const Footer=() =>
{
        return (
                <div className={ styles.container }>
                        <div className={ styles.logo }>
                                Lamba Dev
                        </div>
                        <div className={ styles.text }>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Delectus rem eaque possimus!</div>
                </div>
        )
}

export default Footer
