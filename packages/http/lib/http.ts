import { AppError, toAppError } from "@functional-ts/core";
import { PrimitiveEither, ReaderT, TaskEither, Task, readerT, task } from "@functional-ts/monads";

const headers: HeadersInit = { "Content-Type": "application/json" };

function responseToJson<A>(response: Response): TaskEither<AppError, A> {
  if (!response.ok) return TaskEither.left(toAppError(response.statusText));
  return Task.from(() => response.json()).toEither(toAppError);
}

function responseToEither<A>(response: Response): TaskEither<AppError, A> {
  return task<PrimitiveEither<any, A>>(() => response.json())
    .toEither(toAppError)
    .bind(TaskEither.fromPrimitives)
    .bindLeft(() => TaskEither.left(toAppError(response.statusText)));
}

export type HttpInterceptors = {
  headers?(headers: HeadersInit): HeadersInit;
};
export type HttpOptions = { isEither: boolean; interceptors?: HttpInterceptors } | undefined;

export function get<A>(url: string): ReaderT<HttpOptions, A> {
  return readerT((options) =>
    Task.from(() =>
      fetch(url, { method: "GET", headers: options?.interceptors?.headers?.(headers) ?? headers })
    )
      .toEither(toAppError)
      .chain<A>(options?.isEither ? responseToEither : responseToJson)
  );
}

export function post<A>(url: string, body?: any): ReaderT<HttpOptions, A> {
  return readerT((options) =>
    Task.from(() =>
      fetch(url, {
        method: "POST",
        headers: options?.interceptors?.headers?.(headers) ?? headers,
        body: JSON.stringify(body ?? {}),
      })
    )
      .toEither(toAppError)
      .chain<A>(options?.isEither ? responseToEither : responseToJson)
  );
}

export function put<A>(url: string, body?: any): ReaderT<HttpOptions, A> {
  return readerT((options) =>
    Task.from(() =>
      fetch(url, {
        method: "PUT",
        headers: options?.interceptors?.headers?.(headers) ?? headers,
        body: JSON.stringify(body ?? {}),
      })
    )
      .toEither(toAppError)
      .chain<A>(options?.isEither ? responseToEither : responseToJson)
  );
}

export function del<A>(url: string): ReaderT<HttpOptions, A> {
  return readerT((options) =>
    Task.from(() =>
      fetch(url, {
        method: "DELETE",
        headers: options?.interceptors?.headers?.(headers) ?? headers,
      })
    )
      .toEither(toAppError)
      .chain<A>(options?.isEither ? responseToEither : responseToJson)
  );
}

export function patch<A>(url: string, body?: any): ReaderT<HttpOptions, A> {
  return readerT((options) =>
    Task.from(() =>
      fetch(url, {
        method: "PATCH",
        headers: options?.interceptors?.headers?.(headers) ?? headers,
        body: JSON.stringify(body ?? {}),
      })
    )
      .toEither(toAppError)
      .chain<A>(options?.isEither ? responseToEither : responseToJson)
  );
}
