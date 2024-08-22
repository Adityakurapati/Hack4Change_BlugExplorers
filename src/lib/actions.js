'use server';
import { signIn, signOut } from 'next-auth/react';
import { ref as dbRef, child, get, set } from 'firebase/database';
import bcrypt from 'bcryptjs';
import { firebaseDatabase } from './firebase';

export const handleGoogleLogin=async () =>
{
        try
        {
                await signIn( 'google', { callbackUrl: '/' } );
        } catch ( error )
        {
                console.error( "Google login error:", error );
                return { error: "Failed to login with Google" };
        }
};

export const handleSignOut=async () =>
{
        try
        {
                await signOut( { callbackUrl: '/login' } );
        } catch ( error )
        {
                console.error( "Sign out error:", error );
                return { error: "Failed to sign out" };
        }
};

export const register=async ( previousState, formData ) =>
{
        const { username, email, password, passwordRepeat, contactNumber, state, district }=Object.fromEntries( formData );

        if ( password!==passwordRepeat )
        {
                return { error: "Passwords do not match" };
        }

        try
        {
                const dbRefInstance=dbRef( firebaseDatabase );
                const userRef=child( dbRefInstance, `users/${ username }` );
                const snapshot=await get( userRef );

                if ( snapshot.exists() )
                {
                        return { error: "Username already exists" };
                }

                const salt=await bcrypt.genSalt( 10 );
                const hashedPassword=await bcrypt.hash( password, salt );

                await set( userRef, {
                        username,
                        email,
                        password: hashedPassword,
                        contactNumber,
                        state,
                        district,
                        createdAt: new Date().toISOString(),
                } );

                return { success: true };
        } catch ( err )
        {
                console.error( "Error registering user:", err );
                return { error: "Registration failed: "+err.message };
        }
};
