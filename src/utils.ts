import { decode as msgpackDecode } from "@msgpack/msgpack";

export const findMethodKey = (method: string): string => {
  if (method === "encoded as base64") return "base64";
  if (method === "nothing") return "nothing";
  if (method === "swapped every pair of characters") return "swapped";
  if (method.includes("circularly rotated")) return "rotated";
  if (method.includes("encoded it with custom hex character"))
    return "customHex";
  if (method.includes("scrambled!")) return "scrambled";
  if (method.includes("hashed")) return "hashed";
  return "";
};

export const swapPairs = (str: string) => {
  let swappedStr = "";

  for (let i = 0; i < str.length; i += 2) {
    if (i + 1 < str.length) {
      swappedStr += str[i + 1] + str[i];
    } else {
      swappedStr += str[i];
    }
  }

  return swappedStr;
};

export const findSet = (string: string) => {
  let index;
  for (let i = string.length - 1; i > 0; i--) {
    if (string[i] === " ") {
      index = i + 1;
      break;
    }
  }
  return string.slice(index);
};

export const decodeAsciiString = (encryptedStr: string, number: number) => {
  let decodedStr = "";

  for (let i = 0; i < encryptedStr.length; i++) {
    const decodedCharCode = encryptedStr.charCodeAt(i) - number;
    decodedStr += String.fromCharCode(decodedCharCode);
  }

  return decodedStr;
};

export const decodeCustomHex = (
  encodedString: string,
  method: string
): string => {
  const standardHexSet = "0123456789abcdef";
  const customHexSet = findSet(method);

  const customToStandardMap: { [key: string]: string } = {};
  for (let i = 0; i < customHexSet.length; i++) {
    customToStandardMap[customHexSet[i]] = standardHexSet[i];
  }

  let decodedString = "";
  for (let char of encodedString) {
    decodedString += customToStandardMap[char];
  }

  return decodedString;
};
export const decodeScrambledHex = (
  encodedString: string,
  method: string
): string => {
  const base64Positions = findSet(method);
  function base64Decode(base64: string): Uint8Array {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  }

  const messagePackData = base64Decode(base64Positions);

  const positionsArray = msgpackDecode(messagePackData) as number[];

  const decodedArray = new Array(encodedString.length);

  for (let i = 0; i < encodedString.length; i++) {
    const originalPosition = positionsArray[i];
    decodedArray[originalPosition] = encodedString[i];
  }

  return decodedArray.join("");
};

export const decodeBase64Path = (encryptedPath: string): string => {
  try {
    const decodedString = atob(encryptedPath);
    return decodedString;
  } catch (error) {
    console.error("Failed to decode the encrypted path:", error);
    return "";
  }
};

export const decodeRotated = (
  encryptedPath: string,
  method: string
): string => {
  const amount = parseInt(findSet(method));
  const beginningSlice = encryptedPath.slice(-amount);
  const endSlice = encryptedPath.slice(0, -amount);
  return beginningSlice + endSlice;
};
export const fruits = {
  apple: { color: "red", mass: 100 },
  grape: { color: "red", mass: 5 },
  banana: { color: "yellow", mass: 183 },
  lemon: { color: "yellow", mass: 80 },
  pear: { color: "green", mass: 178 },
  orange: { color: "orange", mass: 262 },
  raspberry: { color: "red", mass: 4 },
  cherry: { color: "red", mass: 5 },
};

interface Dict<T> {
  [k: string]: T;
}

export const mapDict = <T>(object: Dict<T>): Dict<T> => {
  let result: Dict<T> = {};
  const keys = Object.keys(object);
  keys.forEach((key) => {
    result[key + "s"] = object[key];
  });
  return result;
};
export const filterDict = () => {};
export const reduceDict = () => {};
