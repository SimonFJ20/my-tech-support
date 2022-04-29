import { Database } from "../database/Database.ts";
import { Supporter, SupporterId } from "./Supporter.ts";

export const oneSupporter = async (id: SupporterId, db: Database): Promise<Supporter> => {
    return await db.supporter(id);
}
