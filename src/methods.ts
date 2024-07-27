import {
  decodeCustomHex,
  swapPairs,
  decodeBase64Path,
  decodeScrambledHex,
  decodeRotated,
} from "./utils";

export type Methods = {
  nothing: (path: string) => string;
  swapped: (path: string) => string;
  customHex: (path: string, method: string) => string;
  scrambled: (path: string, method: string) => string;
  base64: (path: string) => string;
  rotated: (path: string, method: string) => string;
  hashed: (path: string) => "";
};

export type Key = keyof Methods;

export const methods: Methods = {
  nothing: (path: string) => path,
  swapped: swapPairs,
  customHex: decodeCustomHex,
  scrambled: decodeScrambledHex,
  base64: decodeBase64Path,
  rotated: decodeRotated,
  hashed: (path: string) => "",
};
