import { firebaseDatabase } from '@lib/firebase';
import { ref, get } from 'firebase/database';
import { NextResponse } from 'next/server';

export async function GET ()
{
        try
        {
                // Reference to the 'machinery_rental_services' node
                const machineriesRef=ref( firebaseDatabase, 'machinery_rental_services' );
                const snapshot=await get( machineriesRef );

                if ( snapshot.exists() )
                {
                        const machineries=snapshot.val();
                        return NextResponse.json( { machineries }, { status: 200 } );
                } else
                {
                        return NextResponse.json( { message: 'No machinery data found' }, { status: 404 } );
                }
        } catch ( error )
        {
                console.log( error );
                return NextResponse.json( { error: 'Failed to fetch machinery data' }, { status: 500 } );
        }
}
