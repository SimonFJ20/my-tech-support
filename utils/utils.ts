
const RANDOM_STRING_CHARS = 'abcdefghijklmopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'

export const randomString = (length: number, chars: string = RANDOM_STRING_CHARS): string => {
    return ' '.repeat(length).split('').map(() => chars.at(Math.random() * chars.length)).join('');
}

const EMAIL_REGEX =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const isValidEmail = (email: string) => EMAIL_REGEX.test(email);

export interface AsyncResource {
    open(): Promise<void>;
    close(): Promise<void>;
}

export const doWith = async (resource: AsyncResource, func: (r: AsyncResource) => void) => {
    try {
        await resource.open();
        func(resource);
    } catch (e) {
        throw e;
    } finally {
        await resource.close();
    }
}

export const inValues = <T>(value: T, values: T[]) => values.find(v => v === value) !== undefined;
