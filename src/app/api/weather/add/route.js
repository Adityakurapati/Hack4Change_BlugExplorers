import { firebaseDatabase } from '@lib/firebase';
import { ref, push, get } from 'firebase/database';
import { NextResponse } from 'next/server';

export async function POST ( req )
{
        try
        {
                const sensorData=await req.json();

                // Ensure all required fields are present
                const requiredFields=[ 'n', 'p', 'k', 'temperature', 'humidity', 'water_level', 'fire_detect', 'co2', 'lpg', 'benzin', 'no2' ];
                for ( const field of requiredFields )
                {
                        if ( !( field in sensorData ) )
                        {
                                return NextResponse.json( { error: `Missing required field: ${ field }` }, { status: 400 } );
                        }
                }

                // Add timestamp
                sensorData.timestamp=new Date().toISOString();

                const sensorDataRef=ref( firebaseDatabase, 'sensor_data' );
                const newDataRef=push( sensorDataRef );
                await newDataRef.set( sensorData );

                return NextResponse.json( { message: 'Sensor data added successfully!' }, { status: 200 } );
        } catch ( error )
        {
                console.error( 'Failed to add sensor data:', error );
                return NextResponse.json( { error: 'Failed to add sensor data' }, { status: 500 } );
        }
}

export async function GET ()
{
        try
        {
                const sensorDataRef=ref( firebaseDatabase, 'sensor_data' );
                const snapshot=await get( sensorDataRef );

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