import styles from "./home.module.css";
import Redirector from "./redirector/redirector";

export default function Home ()
{


        return (
                <main className={ styles.mainContainer }>

                        <video autoPlay muted loop className={ styles.backgroundVideo }>
                                <source src="/startup/clip5.mp4" type="video/mp4" />
                                Your browser does not support the video tag.
                        </video>
                        <audio autoPlay loop>
                                <source src="/startup/audio.mp3" type="audio/mp3" />
                                Your browser does not support the audio tag.
                        </audio>

                        <section className={ styles.container }>
                                <article className={ styles.textContainer }>
                                        <h1 className={ styles.heading }>AgriHelper Matters To The Future Of Farmers</h1>
                                        <p>Innovating for a Greener Tomorrow</p>
                                        <div className={ styles.buttonsContainer }>
                                                <Redirector />
                                        </div>
                                </article>
                        </section>
                </main>
        );
}
