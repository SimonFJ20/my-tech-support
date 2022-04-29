import * as bcrypt from "https://deno.land/x/bcrypt@v0.3.0/mod.ts";

export const hashText = async (password: string): Promise<string> => {
    return await bcrypt.hash(password);
}

export const compareHash = async (text: string, hash: string): Promise<boolean> => {
    return await bcrypt.compare(text, hash);
}
