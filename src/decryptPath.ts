import { methods } from "./methods";
import { findMethodKey } from "./utils";

export const decryptPath = (
  path: string,
  method: keyof typeof methods
): string => {
  const methodKey = findMethodKey(method) as keyof typeof methods;
  const currentMethod = methods[methodKey] as (
    path: string,
    method?: keyof typeof methods
  ) => any;
  return currentMethod.length === 2
    ? currentMethod(path, method)
    : currentMethod(path);
};