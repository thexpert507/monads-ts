import { PrimitiveEither, Either } from "./either/Either";
type F<A, B> = (a: NonNullable<A>) => B;
export declare class TaskEither<L, R> {
    readonly run: () => Promise<Either<L, R>>;
    static sequence<L, R>(arr: TaskEither<L, R>[]): TaskEither<L, R[]>;
    private static parsePrimitiveEither;
    static fromPrimitives<L, R>(value: PrimitiveEither<L, R>): TaskEither<L, R>;
    static from<L, R>(value: () => Promise<Either<L, R>>): TaskEither<L, R>;
    static of<L, R>(value: Either<L, R>): TaskEither<L, R>;
    static right<L, R>(value: R): TaskEither<L, R>;
    static left<L, R>(value: L): TaskEither<L, R>;
    static appply<L, A, B>(f: TaskEither<L, F<A, B>>, mb: TaskEither<L, NonNullable<A>>): TaskEither<L, B>;
    constructor(run: () => Promise<Either<L, R>>);
    fold<T>(left: (l: L) => T, right: (r: R) => T): Promise<T>;
    left(): Promise<L | undefined>;
    right(): Promise<R | undefined>;
    isLeft(): Promise<boolean>;
    isRight(): Promise<boolean>;
    map<T>(f: (r: R) => T): TaskEither<L, T>;
    tap(f: (r: R) => void): TaskEither<L, R>;
    chain<T>(f: (r: R) => TaskEither<L, T>): TaskEither<L, T>;
    chainLeft<T>(f: (l: L) => TaskEither<T, R>): TaskEither<T, R>;
    getOrElse(defaultValue: R): Promise<R>;
    getOrElseThrow(defaultLeft?: L): Promise<R>;
    toPrimitive(): Promise<PrimitiveEither<L, R>>;
}
export declare const taskEither: typeof TaskEither.from;
export declare const taskEitherOf: typeof TaskEither.of;
export declare const applyTaskEither: typeof TaskEither.appply;
export {};
