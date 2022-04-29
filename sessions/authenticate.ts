import { Database } from "../database/Database.ts";
import { Session } from "./Session.ts";

export const authenticate = async (token: string, db: Database): Promise<Session> => {
    try {
        return await db.sessionByToken(token);
    } catch (c) {
        if (c instanceof Error && c.message === 'not found')
            throw new Error('unauthorized');
        else
            throw c;
    }
}

