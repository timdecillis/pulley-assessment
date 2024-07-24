const fruits = {
  apple: { color: "red", mass: 100 },
  grape: { color: "red", mass: 5 },
  banana: { color: "red", mass: 183 },
  lemon: { color: "red", mass: 80 },
  pear: { color: "red", mass: 178 },
  orange: { color: "red", mass: 262 },
  raspberry: { color: "red", mass: 4 },
  cherry: { color: "red", mass: 5 },
};

interface Dict<T> {
  [k: string]: T;
}

export const mapDict = <T>(object: Dict<T>) => {
  console.log('object:', object)
};
export const filterDict = () => {};
export const reduceDict = () => {};
