import { Router } from "../imports/oak.ts";
import { Database } from "../database/Database.ts";
import { login } from "../sessions/login.ts";
import { handleCatched, getBody, respondOK } from "./utils.ts"

export const sessionsApiRouter = (db: Database): Router => {
    const router = new Router();
    router.prefix('/sessions');

    router.post('/login', async (ctx) => {
        try {
            const session = await login(await getBody(ctx), db);
            respondOK(ctx, {ok: true, session});
        } catch (c) {
            handleCatched(ctx, c, [
                'incomplete input',
                'unknown email',
                'incorrect password',
            ]);
        }
    });

    return router;
}
