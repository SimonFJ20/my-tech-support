// deno-lint-ignore-file require-await
import { Customer, CustomerId } from "../customers/Customer.ts";
import { Session, SessionId } from "../sessions/Session.ts";
import { Supporter, SupporterId } from "../supporters/Supporter.ts";
import { Ticket, TicketId } from "../tickets/Ticket.ts";
import { Database } from "./Database.ts"

export class MemoryDb implements Database {

    private nextCustomerId: CustomerId = 0;
    private nextTicketId: TicketId = 0;
    private nextSupporterId: SupporterId = 0;
    private nextSessionId: SessionId = 0;

    private customers: Customer[] = [];
    private tickets: Ticket[] = [];
    private supporters: Supporter[] = [];
    private sessions: Session[] = [];

    public async uniqueSessionId(): Promise<number> {
        return this.nextSessionId++;
    }

    public async uniqueTicketId(): Promise<number> {
        return this.nextTicketId++;
    }

    public async uniqueCustomerId(): Promise<number> {
        return this.nextCustomerId++;
    }

    public async uniqueSupporterId(): Promise<number> {
        return this.nextSupporterId++;
    }



    public async customer(id: number): Promise<Customer> {
        return this.findInById(this.customers, id);
    }


    
    public async sessionByToken(token: string): Promise<Session> {
        return this.findIn(this.sessions, v => v.token === token);
    }

    public async insertSession(session: Session): Promise<void> {
        this.sessions.push(session);
    }



    public async supporter(id: number): Promise<Supporter> {
        return this.findInById(this.supporters, id);
    }
    
    public async supporterByEmail(email: string): Promise<Supporter> {
        return this.findIn(this.supporters, v => v.email === email);
    }

    public async isSupporterEmailUnique(email: string): Promise<boolean> {
        return this.supporters.find(v => v.email === email) === undefined;
    }

    public async insertSupporter(supporter: Supporter): Promise<void> {
        this.supporters.push(supporter);
    }



    public async allTicketCategories(): Promise<string[]> {
        return [...new Set(this.tickets.map(t => t.category))];
    }

    public async allTicketsSortedById(): Promise<Ticket[]> {
        return this.tickets.map(v => v).sort((a, b) => a.due.getTime() - b.due.getTime());
    }

    public async ticket(id: number): Promise<Ticket> {
        return this.findInById(this.tickets, id);
    }

    

    private findInById = <T extends {id: number}>(table: T[], id: number): T => {
        return this.findIn(table, v => v.id === id);
    }

    private findIn = <T>(table: T[], where: (v: T) => boolean) => {
        const v = table.find(where);
        if (v === undefined)
            throw new Error('not found');
        return v;
    }

}
