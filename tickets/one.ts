import { Database } from "../database/Database.ts";
import { TicketId,Ticket } from "./Ticket.ts";

export const oneTicket = async (id: TicketId, db: Database): Promise<Ticket> => {
    return await db.ticket(id);
}
