'use client'
import { useState } from 'react';
import axios from 'axios';

const LocationFetcher=() =>
{
        const [ district, setDistrict ]=useState( '' );
        const [ location, setLocation ]=useState( null );
        const [ error, setError ]=useState( '' );

        const handleFetchLocation=async () =>
        {
                try
                {
                        const response=await axios.get( '/api/geocode', {
                                params: { district },
                        } );

                        setLocation( response.data );
                        setError( '' );
                } catch ( err )
                {
                        setError( 'Error fetching location' );
                        setLocation( null );
                }
        };

        return (
                <div>
                        <h2>Get Latitude and Longitude</h2>
                        <input
                                type="text"
                                value={ district }
                                onChange={ ( e ) => setDistrict( e.target.value ) }
                                placeholder="Enter district name"
                        />
                        <button onClick={ handleFetchLocation }>Fetch Location</button>

                        { location&&(
                                <div>
                                        <h3>Location:</h3>
                                        <p>Latitude: { location.lat }</p>
                                        <p>Longitude: { location.lon }</p>
                                        <p>Location Name: { location.display_name }</p>
                                </div>
                        ) }

                        { error&&<p>{ error }</p> }
                </div>
        );
};

export default LocationFetcher;
