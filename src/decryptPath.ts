import { methods, Key } from "./methods";
import { findMethodKey } from "./utils";

export const decryptPath = (path: string, method: string): string => {
  const methodKey: Key | "" = findMethodKey(method);
  if (methodKey) {
    const currentMethod = methods[methodKey];
    return currentMethod(path, method);
  }
  return ""
};
