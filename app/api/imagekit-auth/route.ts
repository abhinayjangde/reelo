import ImageKit from "imagekit"
import { NextResponse } from "next/server";

const imagekit = new ImageKit({
  publicKey: process.env.PUBLIC_KEY!,
  privateKey: process.env.PRIVATE_KEY!,
  urlEndpoint: process.env.URL_ENDPOINT!,
});

export async function GET() {
    try {
        const authenticationParameters = imagekit.getAuthenticationParameters()
        return NextResponse.json(authenticationParameters);
        
    } catch (error) {
        return NextResponse.json(
            {error:"ImageKit auth Failed!"},
            {status: 500}
        )
    }
}