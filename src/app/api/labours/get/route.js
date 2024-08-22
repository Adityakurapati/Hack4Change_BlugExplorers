// /app/api/labors/route.js
import { firebaseDatabase } from '@lib/firebase';
import { ref, get } from 'firebase/database';
import { NextResponse } from 'next/server';

export async function GET ()
{
        try
        {
                const laborRef=ref( firebaseDatabase, 'labours' );
                const snapshot=await get( laborRef );

                if ( snapshot.exists() )
                {
                        const labors=snapshot.val();
                        return NextResponse.json( { labors }, { status: 200 } );
                } else
                {
                        return NextResponse.json( { message: 'No labor data found' }, { status: 404 } );
                }
        } catch ( error )
        {
                console.error( 'Failed to fetch labor data:', error );
                return NextResponse.json( { error: 'Failed to fetch labor data' }, { status: 500 } );
        }
}