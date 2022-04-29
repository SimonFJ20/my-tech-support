import { Database } from "../database/Database.ts";
import { Customer, CustomerId } from "./Customer.ts";

export const oneCustomer = async (id: CustomerId, db: Database): Promise<Customer> => {
    return await db.customer(id);
}
