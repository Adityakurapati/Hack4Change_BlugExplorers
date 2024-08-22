import { firebaseDatabase } from '@lib/firebase';
import { ref, push, set } from 'firebase/database';
import { NextResponse } from 'next/server';

export async function GET ( request )
{
        try
        {
                const url=new URL( request.url );

                const newMachine={
                        available_quantity: url.searchParams.get( 'available_quantity' ),
                        provider: url.searchParams.get( 'provider' ),
                        rent_amount: url.searchParams.get( 'rent_amount' ),
                        vehicle_type: url.searchParams.get( 'vehicle_type' ),
                        contactNumber: url.searchParams.get( 'contactNumber' )
                };

                // Log the received parameters for debugging
                console.log( 'Received newMachine data:', newMachine );

                // Ensure newMachine has all required fields
                if ( !newMachine.available_quantity||!newMachine.provider||!newMachine.rent_amount||!newMachine.vehicle_type||!newMachine.contactNumber )
                {
                        console.error( 'Missing required fields:', newMachine );
                        return NextResponse.json( { error: 'Missing required fields' }, { status: 400 } );
                }

                const machineriesRef=ref( firebaseDatabase, 'machinery_rental_services' );
                const newMachineRef=push( machineriesRef ); // Create a new reference using push
                await set( newMachineRef, newMachine ); // Use set to save the new machine details

                // Log success message
                console.log( 'Machine added successfully:', newMachine );

                return NextResponse.json( { message: 'Machine added successfully!' }, { status: 200 } );
        } catch ( error )
        {
                // Log the error for debugging
                console.error( 'Failed to add machine:', error );
                return NextResponse.json( { error: 'Failed to add machine' }, { status: 500 } );
        }
}
