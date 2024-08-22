import HeroSection from '@components/Hero/HeroSection';
import Features from '@components/features/Features';
import Blogs from '@components/blogs/Blogs';
import styles from './home.module.css';
import Contact from '@components/contact/Contact';

export default function Home ()
{
        return (
                <div className={ styles.container }>
                        <HeroSection />
                        <Features />
                        <Blogs />
                        <Contact />
                </div>
        );
}