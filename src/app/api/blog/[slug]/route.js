import { PostModel } from "@/lib/model";
import { connectToDB } from "@/lib/utils"
import { NextResponse } from "next/server";

export const GET=async ( request, { params } ) =>
{
        const { slag }=params;
        try
        {
                connectToDB();
                const post=PostModel.findOne( { slug } )
                NextResponse.json( post );

        } catch ( err )
        {
                console.log( err )
        }
}

export const DELETE=async ( request, { params } ) =>
{
        const { slug }=params;

        try
        {
                connectToDB();
                const status=await PostModel.deleteOne( { slug } );
                if ( status )
                {
                        NextResponse.json( "POst Deleted " )
                }
        } catch ( err )
        {
                console.log( err );
        }
}