import { Database } from "./Database.ts";
import { AsyncResource } from "../utils/utils.ts"
import { Customer } from "../customers/Customer.ts";
import { Session } from "../sessions/Session.ts";
import { Supporter } from "../supporters/Supporter.ts";
import { Ticket } from "../tickets/Ticket.ts";
import { Client } from "https://deno.land/x/mysql@v2.10.2/mod.ts";

export class MysqlDb implements Database, AsyncResource {

    private client: Client = new Client();    

    public async open(): Promise<void> {
        await this.client.connect({
            hostname: 'localhost:3306',
            db: 'MyTechSupport',
            username: 'root',
            password: 'example',
        });
    }
    public async close(): Promise<void> {
        await this.client.close();
    }

    public uniqueSessionId(): Promise<number> {
        throw new Error("Method not implemented.");
    }

    public uniqueTicketId(): Promise<number> {
        throw new Error("Method not implemented.");
    }

    public uniqueCustomerId(): Promise<number> {
        throw new Error("Method not implemented.");
    }

    public uniqueSupporterId(): Promise<number> {
        throw new Error("Method not implemented.");
    }

    public customer(id: number): Promise<Customer> {
        throw new Error("Method not implemented.");
    }

    public insertSession(session: Session): Promise<void> {
        throw new Error("Method not implemented.");
    }

    public supporter(id: number): Promise<Supporter> {
        throw new Error("Method not implemented.");
    }

    public supporterByEmail(email: string): Promise<Supporter> {
        throw new Error("Method not implemented.");
    }

    public isSupporterEmailUnique(email: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    public insertSupporter(supporter: Supporter): Promise<void> {
        throw new Error("Method not implemented.");
    }

    public async allCategories(): Promise<string[]> {
        const result = await this.client.query('SELECT DISTINCT category FROM Tickets');
        return result;
    }

    public ticket(id: number): Promise<Ticket> {
        throw new Error("Method not implemented.");
    }
}
