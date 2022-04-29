import { Context, Status } from "https://deno.land/x/oak@v10.4.0/mod.ts";
import { ResponseBody,ResponseBodyFunction } from "https://deno.land/x/oak@v10.4.0/response.ts";

export const getBody = (ctx: Context) => {
    const body = ctx.request.body();
    if (body.type !== 'json')
        throw new Error('expected application/json');
    return body.value;
}

export const handleCatched = (ctx: Context, c: unknown, knownErrors: string[]) => {
    const error = asError(c);
    if (error && [...knownErrors, 'expected application/json'].find(msg => msg === error.message) !== undefined) {
        ctx.response.status = Status.BadRequest;
        ctx.response.body = {ok: false, error: error.message};
    } else {
        ctx.response.status = Status.InternalServerError;
        ctx.response.body = {ok: false, error: 'internal server error'};
        console.error(`\nOn route '${ctx.request.url}`)
        console.error(error);
    }
}

const asError = (catched: unknown): Error | null => {
    if (!(catched instanceof Error))
        return null;
    return catched;
}

export const respondOK = (ctx: Context, body: ResponseBody | ResponseBodyFunction) => respond(ctx, Status.OK, body);

export const respond = (ctx: Context, status: Status, body: ResponseBody | ResponseBodyFunction) => {
    ctx.response.status = status,
    ctx.response.body = body;
}

