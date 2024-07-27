import {
  decodeCustomHex,
  swapPairs,
  decodeAsciiString,
  decodeBase64Path,
  decodeScrambledHex,
  decodeRotated,
} from "./utils";

export const methods = {
  nothing: (path: string) => path,
  swapped: swapPairs,
  customHex: decodeCustomHex,
  scrambled: decodeScrambledHex,
  base64: decodeBase64Path,
  rotated: decodeRotated,
  added: decodeAsciiString,
  hashed: (path: string) => "",
};
