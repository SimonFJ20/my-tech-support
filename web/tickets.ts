import { Router } from "../imports/oak.ts";
import { Database } from "../database/Database.ts";
import { respondOK,handleCatched } from "./utils.ts";
import { oneTicket } from "../tickets/one.ts";

export const ticketsApiRouter = (db: Database): Router => {
    const router = new Router();
    router.prefix('/tickets');

    router.get('/:id', async (ctx) => {
        try {
            const ticket = await oneTicket(parseInt(ctx.params.id), db);
            respondOK(ctx, {ok: true, ticket});
        } catch (c) {
            handleCatched(ctx, c, ['not found']);
        }
    });

    return router;
}
