import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET ( request )
{
        const { searchParams }=new URL( request.url );
        const district=searchParams.get( 'district' );

        if ( !district )
        {
                return NextResponse.json( { error: 'District name is required' }, { status: 400 } );
        }

        try
        {
                const response=await axios.get(
                        `https://nominatim.openstreetmap.org/search`,
                        {
                                params: {
                                        q: district,
                                        format: 'json',
                                        limit: 1,
                                },
                        }
                );

                if ( response.data.length>0 )
                {
                        const location=response.data[ 0 ];
                        return NextResponse.json( {
                                lat: location.lat,
                                lon: location.lon,
                                display_name: location.display_name,
                        } );
                } else
                {
                        return NextResponse.json( { error: 'Location not found' }, { status: 404 } );
                }
        } catch ( error )
        {
                return NextResponse.json( { error: 'Failed to fetch data from Nominatim API' }, { status: 500 } );
        }
}