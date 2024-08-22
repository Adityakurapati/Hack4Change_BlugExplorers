import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';  // Import Firebase Auth
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';

const firebaseConfig={
        apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
        authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
        databaseURL: process.env.NEXT_PUBLIC_DB_URL,
        projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
        storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
        messagingSenderId: process.env.NEXT_PUBLIC_SENDER_ID,
        appId: process.env.NEXT_PUBLIC_APP_ID,
};

// Initialize Firebase
const app=initializeApp( firebaseConfig );
const firebaseAuth=getAuth( app );  // Initialize Firebase Auth
const firebaseDatabase=getDatabase( app );
const firebaseStorage=getStorage( app );

export { firebaseAuth, firebaseDatabase, firebaseStorage };
