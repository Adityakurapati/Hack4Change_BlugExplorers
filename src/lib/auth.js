import { signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseAuth, firebaseDatabase, ref, child, get } from './firebase';
import bcrypt from 'bcryptjs';

export const signInUser=async ( email, password ) =>
{
        try
        {
                // Sign in with email and password
                const result=await signInWithEmailAndPassword( firebaseAuth, email, password );

                if ( result.user )
                {
                        // Fetch the user data from the Firebase Realtime Database
                        const userRef=ref( firebaseDatabase, `users/${ result.user.uid }` );
                        const snapshot=await get( child( userRef, '' ) );
                        const userData=snapshot.val();

                        // Compare the provided password with the hashed password in the database
                        const isPasswordValid=await bcrypt.compare( password, userData.password );

                        if ( isPasswordValid )
                        {
                                // Return a success message and user information
                                return { success: true, user: userData };
                        } else
                        {
                                throw new Error( 'Invalid email or password' );
                        }
                } else
                {
                        throw new Error( 'Invalid email or password' );
                }
        } catch ( err )
        {
                console.error( 'Login error:', err );
                throw new Error( 'Login failed: '+err.message );
        }
};