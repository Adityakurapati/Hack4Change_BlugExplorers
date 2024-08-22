import styles from './contact.module.css';

export const metadata={
        title: "Let's Start With You",
        description: "Contact Us"
};

const Contact=() =>
{
        return (
                <div className={ styles.container }>
                        <div className={ styles.formContainer }>
                                <h2 className={ styles.formTitle }>Let&apos;s Start With You</h2>
                                <form className={ styles.contactForm }>
                                        <div className={ styles.inputGroup }>
                                                <div>
                                                        <label htmlFor="name" className={ styles.formLabel }>Your Name</label>
                                                        <input type="text" id="name" className={ styles.formInput } placeholder="Username" required />
                                                </div>
                                                <div>
                                                        <label htmlFor="address" className={ styles.formLabel }>Address</label>
                                                        <input type="text" id="address" className={ styles.formInput } placeholder="Your City / State" required />
                                                </div>
                                        </div>
                                        <div>
                                                <label htmlFor="email" className={ styles.formLabel }>Email Id</label>
                                                <input type="email" id="email" className={ styles.formInput } placeholder="abc@gmail.com" required />
                                        </div>
                                        <div>
                                                <label htmlFor="message" className={ styles.formLabel }>Raise Your Hand</label>
                                                <textarea id="message" className={ styles.formTextarea } rows={ 4 } placeholder="Your Thought"></textarea>
                                        </div>
                                        <button type="submit" className={ styles.submitButton }>Send</button>
                                </form>
                        </div>
                </div>
        );
}

export default Contact;