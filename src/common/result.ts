export type Result<T, E extends Error> = Ok<T> | Err<E>;

export type Ok<T> = {
    ok: true;
    value: T;
};

export type Err<E extends Error> = {
    ok: false;
    error: E;
};

export function ok<T>(value: T): Ok<T> {
    return { ok: true, value };
}   

export function err<E extends Error>(error: E): Err<E> {
    return { ok: false, error };
}

export function errFromMessage(message: string): Err<Error> {
    return err(new Error(message));
}

export function isOk<T, E extends Error>(result: Result<T, E>): result is Ok<T> {
    return result.ok;
}

export function isErr<T, E extends Error>(result: Result<T, E>): result is Err<E> {
    return !result.ok;
}

export function unwrapOr<T, E extends Error>(result: Result<T, E>, defaultValue: T): T {
    return result.ok ? result.value : defaultValue;
}

export function unwrap<T, E extends Error>(result: Result<T, E>): T {
    if (result.ok) {
        return result.value;
    } else {
        throw result.error;
    }
}