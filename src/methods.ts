import {
  decodeCustomHex,
  swapPairs,
  decodeAsciiArray,
  decodeAsciiString,
  decodeBase64Path,
  decodeScrambledHex,
  decodeRotated,
} from "./utils";

export const methods = {
  none: (path: string) => path,
  "converted to a JSON array of ASCII values": decodeAsciiArray,
  "swapped every pair of characters": swapPairs,
  "encoded it with custom hex character": decodeCustomHex,
  "scrambled!": decodeScrambledHex,
  "encoded as base64": decodeBase64Path,
  "circularly rotated": decodeRotated,
  added: decodeAsciiString,
  hashed: (path: string) => path,
};
