import { Supporter } from "../supporters/Supporter.ts";
import { Session } from "./Session.ts";
import { Database } from "../database/Database.ts"
import { compareHash } from "../utils/crypto.ts";
import { randomString } from "../utils/utils.ts";

export type SessionsLoginRequest = {
    email: string,
    password: string,
};

export const login = async (req: SessionsLoginRequest, db: Database): Promise<Session> => {
    validateRequestFields(req);
    const supporter = await supporterFromDb(db, req);
    await validatePassword(req, supporter);
    const session = await makeSession(supporter, db);
    await db.insertSession(session);
    return session;
}

const makeSession = async (supporter: Supporter, db: Database): Promise<Session> => {
    return {
        id: await db.uniqueSessionId(),
        createdAt: new Date(),
        supporter,
        token: randomString(64),
    };
}

const validateRequestFields = (req: SessionsLoginRequest) => {
    if (!req.email || !req.password)
        throw new Error('incomplete input');
}

const supporterFromDb = async (db: Database, req: SessionsLoginRequest): Promise<Supporter> => {
    try {
        return await db.supporterByEmail(req.email);
    } catch (e) {
        if (e instanceof Error && e.message === 'not found')
            throw new Error('unknown email');
    }
    throw new Error('unreachable');
}

const validatePassword = async (req: SessionsLoginRequest, supporter: Supporter) => {
    if (!(await compareHash(req.password, supporter.passwordHash)))
        throw new Error('incorrect password');
}
