// ServerNavbar.js
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { firebaseAuth } from "./auth";

export async function getServerSessionWrapper ()
{
        const session=await firebaseAuth;
        return session;
}