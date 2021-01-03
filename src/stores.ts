import { writable, Writable } from "svelte/store";

export const makeFormStore: <A>(initialValues: A) => Writable<A> = (initialValues) =>
  writable(initialValues);
