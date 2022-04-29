import { Application, Router, send } from "https://deno.land/x/oak@v10.4.0/mod.ts";
import { Database } from "../database/Database.ts";
import { supportersApiRouter } from "./supporters.ts";

export const webserver = async (port: number, db: Database) => {
    const app = new Application();
    const router = new Router();

    router.all('/api/:path', async (ctx, next) => (ctx.response.type = 'json') && await next());

    router.get('/api/test', async (ctx) => {
        ctx.response.body = await new Promise(resolve => resolve({msg: 'bruh'}));
    });

    router.use(apiRouter(db).routes());

    app.use(router.allowedMethods());
    app.use(router.routes());
    
    app.use(async (ctx) => {
        await send(ctx, ctx.request.url.pathname, {
            root: `${Deno.cwd()}/web/public`,
            index: 'index.html',
        });
    });

    app.addEventListener('listen', () => console.log(`Webserver running at http://localhost:${port}/`))
    return await app.listen({port});
}

const apiRouter = (db: Database): Router => {
    const router = new Router();
    router.prefix('/api');
    router.use(supportersApiRouter(db).routes());
    return router;
}
