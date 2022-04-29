import { Router } from "../imports/oak.ts";
import { Database } from "../database/Database.ts";
import { oneCustomer } from "../customers/one.ts";
import { respondOK,handleCatched } from "./utils.ts";

export const customersApiRouter = (db: Database): Router => {
    const router = new Router();
    router.prefix('/customer');

    router.get('/:id', async (ctx) => {
        try {
            const customer = await oneCustomer(parseInt(ctx.params.id), db);
            respondOK(ctx, {ok: true, customer});
        } catch (c) {
            handleCatched(ctx, c, ['not found']);
        }
    });

    return router;
}
