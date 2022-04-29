import { Database } from "../database/Database.ts";
import { Ticket } from "./Ticket.ts";

export const allTicketsSortedByDue = async (db: Database): Promise<Ticket[]> => {
    return await db.allTicketsSortedById()
}
