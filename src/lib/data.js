import { ref, get } from 'firebase/database';
import { firebaseDatabase } from './firebase';  // Import your initialized Firebase instance

// Function to get sensor data
export async function getSensorData ()
{
        try
        {
                const sensorRef=ref( firebaseDatabase, 'sensor_data' );
                const snapshot=await get( sensorRef );
                if ( snapshot.exists() )
                {
                        return snapshot.val();
                } else
                {
                        console.log( 'No data available' );
                        return null;
                }
        } catch ( error )
        {
                console.error( 'Error fetching sensor data:', error );
        }
}

// Function to get user data
export async function getUserData ()
{
        try
        {
                const userRef=ref( firebaseDatabase, 'users' );
                const snapshot=await get( userRef );
                if ( snapshot.exists() )
                {
                        return snapshot.val();
                } else
                {
                        console.log( 'No data available' );
                        return null;
                }
        } catch ( error )
        {
                console.error( 'Error fetching user data:', error );
        }
}

// Function to get machinery rental service data
export async function getMachineryRentalData ()
{
        try
        {
                const rentalRef=ref( firebaseDatabase, 'machinery_rental_services' );
                const snapshot=await get( rentalRef );
                if ( snapshot.exists() )
                {
                        return snapshot.val();
                } else
                {
                        console.log( 'No data available' );
                        return null;
                }
        } catch ( error )
        {
                console.error( 'Error fetching machinery rental data:', error );
        }
}

// Function to get scheme data
export async function getSchemeData ()
{
        try
        {
                const schemeRef=ref( firebaseDatabase, 'schemes' );
                const snapshot=await get( schemeRef );
                if ( snapshot.exists() )
                {
                        return snapshot.val();
                } else
                {
                        console.log( 'No data available' );
                        return null;
                }
        } catch ( error )
        {
                console.error( 'Error fetching scheme data:', error );
        }
}
