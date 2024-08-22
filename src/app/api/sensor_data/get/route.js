import { firebaseDatabase } from '@lib/firebase';
import { ref, get } from 'firebase/database';
import { NextResponse } from 'next/server';

export async function GET ()
{
        try
        {
                const sensorRef=ref( firebaseDatabase, 'sensor_data' );
                const snapshot=await get( sensorRef );

                if ( snapshot.exists() )
                {
                        const sensorData=snapshot.val();
                        return NextResponse.json( { sensorData }, { status: 200 } );
                } else
                {
                        return NextResponse.json( { message: 'No sensor data found' }, { status: 404 } );
                }
        } catch ( error )
        {
                console.error( 'Failed to fetch sensor data:', error );
                return NextResponse.json( { error: 'Failed to fetch sensor data' }, { status: 500 } );
        }
}
