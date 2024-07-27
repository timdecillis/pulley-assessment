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

export const mapDict = <T, S>(
  inputDict: Dict<T>,
  mapFunction: (original: T, key: string) => S
): Dict<S> => {
  let result: Dict<S> = {};
  const keys = Object.keys(inputDict);
  keys.forEach((key) => {
    result[key] = mapFunction(inputDict[key], key);
  });
  return result;
};
export const filterDict = <T>(
  inputDict: Dict<T>,
  filterFunction: (original: T, key: string) => boolean
): Dict<T> => {
  let result: Dict<T> = {};
  for (let key of Object.keys(inputDict)) {
    const current = inputDict[key];
    if (filterFunction(current, key)) {
      result[key] = current;
    }
  }
  return result;
};
export const reduceDict = <T, S>(
  inputDict: Dict<T>,
  reduceFunction: (current: S, next: T, key: string) => S,
  initialValue?: S
) => {
  for (let key of Object.keys(inputDict)) {
    const current = inputDict[key]
    if (initialValue === undefined) {
      initialValue = current as unknown as S
      continue;
    }
    initialValue = reduceFunction(initialValue, current, key)
  }
  return initialValue
};