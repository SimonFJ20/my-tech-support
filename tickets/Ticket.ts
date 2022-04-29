import { Supporter } from "../supporters/Supporter.ts";

export type TicketId = number;

export type Ticket = {
    id: TicketId,
    createdAt: Date,
    title: string,
    assignee: Supporter,
    category: string,
    due: Date,
};
