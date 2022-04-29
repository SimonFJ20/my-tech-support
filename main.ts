import { MemoryDb } from "./database/MemoryDb.ts";
import { registerSupporter } from "./supporters/register.ts";
import { webserver } from "./web/server.ts";

const db = new MemoryDb();
await registerSupporter({
    email: 'testuser@mail.com',
    firstName: 'test',
    lastName: 'user',
    password: '1234',
    permissions: 'admin',
    role: 'level 1',
}, db);
await webserver(8000, db);
