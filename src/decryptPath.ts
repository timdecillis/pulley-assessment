import axios from "axios";
import { methods, Key } from "./methods";
import { findMethodKey } from "./utils";

export const fetchEndpoint = async (url: string) => {
  const response = await axios.get(url);
  console.log(response.data);
  let { encryption_method, level, encrypted_path } = response.data;
  encrypted_path = encrypted_path.slice(5);
  const decryptedPath = decryptPath(encrypted_path, encryption_method);
  return { decryptedPath, level };
};

export const decryptPath = (path: string, method: string): string => {
  const methodKey: Key | "" = findMethodKey(method);
  if (methodKey) {
    const currentMethod = methods[methodKey];
    return currentMethod(path, method);
  }
  return "";
};

export const fetchAllEndpoints = async (startURL: string) => {
  let queue = [startURL];
  let levels = [];
  while (queue.length) {
    const url = queue.pop();
    if (url) {
      try {
        const { decryptedPath, level } = await fetchEndpoint(url);
        levels.push(level);
        if (decryptedPath) queue.push(`task_${decryptedPath}`);
      } catch (err) {
        console.error(`There was an error resolving the endpoint: ${err}`);
      }
    }
  }
  return levels;
};
