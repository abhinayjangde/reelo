import { SessionProvider } from "next-auth/react";
import { ImageKitProvider } from "imagekitio-next";

const urlEndpoint = process.env.URL_ENDPOINT;
const publicKey = process.env.PUBLIC_KEY;


export default function Providers({ children }: { children: React.ReactNode }) {
    const authenticator = async () => {
        try {
            const response = await fetch("/api/imagekit-auth");

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Request failed with status ${response.status}: ${errorText}`);
            }

            const data = await response.json();
            const { signature, expire, token } = data;
            return { signature, expire, token };
        } catch (error) {
            console.log(error)
            throw new Error(`ImageKit Authentication request failed`);
        }
    };
    return (
        <SessionProvider>
            <ImageKitProvider urlEndpoint={urlEndpoint} publicKey={publicKey} authenticator={authenticator}>
                {children}

            </ImageKitProvider>
        </SessionProvider>

    );
}