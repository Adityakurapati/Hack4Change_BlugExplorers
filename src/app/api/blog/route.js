import { PostModel } from "@/lib/model";
import { connectToDB } from "@/lib/utils";
import { NextResponse } from "next/server";

export const GET=async () =>
{
        try
        {
                connectToDB();
                const posts=await PostModel.find();
                return NextResponse.json( posts );
        } catch ( err )
        {
                console.log( err );
                throw new Error( err );
        }
}