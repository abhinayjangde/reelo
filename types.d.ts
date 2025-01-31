import { Connection } from "mongoose";

declare global {
    var mongoose: {
        conn: string | null;
        promise: Promise<Connection> | null;
    }
}

export { };