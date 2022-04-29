import { Router, Status } from "../imports/oak.ts";
import { Database } from "../database/Database.ts";
import { oneSupporter } from "../supporters/one.ts";
import { registerSupporter } from "../supporters/register.ts";
import { getBody, handleCatched, respondOK } from "./utils.ts";

export const supportersApiRouter = (db: Database): Router => {
    const router = new Router();
    router.prefix('/supporters');

    router.get('/:id', async (ctx) => {
        try {
            const supporter = await oneSupporter(parseInt(ctx.params.id), db);
            respondOK(ctx, {ok: true, supporter});
        } catch (c) {
            handleCatched(ctx, c, ['not found']);
        }
    });

    router.post('/register', async (ctx) => {
        try {
            const body = await getBody(ctx);
            const supporter = await registerSupporter(body, db);
            respondOK(ctx, {ok: true, supporter});
        } catch (c) {
            handleCatched(ctx, c, [
                'email not specified',
                'first name not specified',
                'last name not specified',
                'password not specified',
                'invalid value for permissions',
                'invalid value for role',
                'invalid email',
                'email taken',
            ]);
        }
    });

    return router;
}
