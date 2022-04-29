import { Supporter } from "../supporters/Supporter.ts";

export type SessionId = number;

export type Session = {
    id: SessionId,
    createdAt: Date,
    supporter: Supporter,
    token: string,
};
