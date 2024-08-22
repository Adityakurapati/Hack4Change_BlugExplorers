import { firebaseDatabase } from '@lib/firebase';
import { ref, push, set } from 'firebase/database';
import { NextResponse } from 'next/server';

export async function GET ( request )
{
        try
        {
                const url=new URL( request.url );
                const laborDetails={
                        purpose: url.searchParams.get( 'purpose' ),
                        payment: url.searchParams.get( 'payment' ),
                        days: url.searchParams.get( 'days' )
                };

                // Ensure laborDetails has all required fields
                if ( !laborDetails.purpose||!laborDetails.payment||!laborDetails.days )
                {
                        return NextResponse.json( { error: 'Missing required fields' }, { status: 400 } );
                }

                const laboursRef=ref( firebaseDatabase, 'labours' );
                const newLabourRef=push( laboursRef ); // Correctly create a new reference
                await set( newLabourRef, laborDetails ); // Use set on the newLabourRef

                return NextResponse.json( { message: 'Labour request added successfully!' }, { status: 200 } );
        } catch ( error )
        {
                console.error( 'Failed to add labour request:', error );
                return NextResponse.json( { error: 'Failed to add labour request' }, { status: 500 } );
        }
}
