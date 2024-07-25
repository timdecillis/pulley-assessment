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

export const findHexSet = (string: string) => {
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
export const decodeAsciiArray = (asciiArray: number[]) => {
  return asciiArray.map((value) => String.fromCharCode(value)).join("");
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
