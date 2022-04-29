import { Supporter } from "./Supporter.ts";
import { Database } from "../database/Database.ts"
import { inValues, isValidEmail } from "../utils/utils.ts";
import { hashText } from "../utils/crypto.ts";

export type SupporterRegisterRequest = {
    email: string,
    firstName: string,
    lastName: string,
    password: string,
    permissions: 'default' | 'admin',
    role: 'level 1' | 'level 2',
};

export const registerSupporter = async (req: SupporterRegisterRequest, db: Database): Promise<Supporter> => {
    validateRequestFields(req);
    await validateEmail(req.email, db);
    const supporter = await makeSupporter(req, db);
    await db.insertSupporter(supporter);
    return supporter;
}



const validateRequestFields = (req: SupporterRegisterRequest) => {
    if (typeof req.email !== 'string' || req.email === '')
        throw new Error('email not specified');
    if (typeof req.firstName !== 'string' || req.firstName === '')
        throw new Error('first name not specified');
    if (typeof req.lastName !== 'string' || req.lastName === '')
        throw new Error('last name not specified');
    if (typeof req.password !== 'string' || req.password === '')
        throw new Error('password not specified');
    if (!inValues(req.permissions, ['default', 'admin']))
        throw new Error('invalid value for permissions');
    if (!inValues(req.role, ['level 1', 'level 2']))
        throw new Error('invalid value for role');
}

const validateEmail = async (email: string, db: Database) => {
    if (!isValidEmail(email))
        throw new Error('invalid email');
    if (!await db.isSupporterEmailUnique(email))
        throw new Error('email taken');
}

const makeSupporter = async (req: SupporterRegisterRequest, db: Database): Promise<Supporter> => {
    return {
        id: await db.uniqueSupporterId(),
        createdAt: new Date(),
        email: req.email,
        firstName: req.firstName.toLocaleLowerCase(),
        lastName: req.lastName.toLocaleLowerCase(),
        passwordHash: await hashText(req.password),
        permissions: req.permissions,
        role: req.role,
    }
}
