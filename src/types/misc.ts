export type Nullable<T> = T | null | undefined;

export type SimpleObject = { [x: string]: unknown };

export type Required<T> = { [P in keyof T]-?: NonNullable<T[P]> };
