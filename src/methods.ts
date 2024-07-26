import { decodeCustomHex, swapPairs } from "./utils";

export const methods = {
  "none": (path: string) => path,
  "converted to a JSON array of ASCII values": (path: string) => path,
  "swapped every pair of characters": swapPairs,
  "encoded it with custom hex character": decodeCustomHex,
  "scrambled!": (path: string) => path,
  "encoded as base64": (path: string) => path,
  "circularly rotated": (path: string) => path,
  "hashed": (path: string) => path
};