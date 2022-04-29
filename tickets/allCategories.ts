import { Database } from "../database/Database.ts";

export const allCategories = async (db: Database): Promise<string[]> => {
    return await db.allCategories();
}
