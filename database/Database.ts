import { Customer, CustomerId } from "../customers/Customer.ts";
import { Session, SessionId } from "../sessions/Session.ts";
import { SupporterId, Supporter } from "../supporters/Supporter.ts";
import { Ticket, TicketId } from "../tickets/Ticket.ts";

export interface Database {
    uniqueSessionId(): Promise<SessionId>;
    uniqueTicketId(): Promise<TicketId>;
    uniqueCustomerId(): Promise<CustomerId>;
    uniqueSupporterId(): Promise<SupporterId>;

    customer(id: CustomerId): Promise<Customer>;

    insertSession(session: Session): Promise<void>;

    supporter(id: SupporterId): Promise<Supporter>;
    supporterByEmail(email: string): Promise<Supporter>;
    isSupporterEmailUnique(email: string): Promise<boolean>;
    insertSupporter(supporter: Supporter): Promise<void>;

    allCategories(): Promise<string[]>;
    ticket(id: TicketId): Promise<Ticket>;
}
