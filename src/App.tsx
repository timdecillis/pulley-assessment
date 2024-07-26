import { useState, useEffect, useRef } from "react";
import "./App.css";
import axios from "axios";
import {
  mapDict,
  fruits,
  swapPairs,
  decodeAsciiString,
  decodeAsciiArray,
  findHexSet,
  decodeCustomHex,
  decodeScrambledHex,
  decodeBase64Path,
  decodeRotated,
} from "./utils";
import { methods } from "./methods";

function App() {
  const [objects, setObjects] = useState<any[]>([]);
  const hasFetched = useRef(false);

  const decryptPath = (path: string, method: keyof typeof methods = "none") => {
    const result = methods[method](path, method)
  };

  const fetchData = async () => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    // console.log(mapDict(fruits))

    let queue = ["/timdecillis@gmail.com"];
    while (queue.length) {
      const url = queue.pop();
      if (url) {
        const response = await axios.get(url);
        console.log("response:", response.data);
        let { encrypted_path } = response.data;
        encrypted_path = encrypted_path.slice(5);
        const { encryption_method } = response.data;
        if (encryption_method === "converted to a JSON array of ASCII values") {
          encrypted_path = decodeAsciiArray(JSON.parse(encrypted_path));
        }
        if (encryption_method === "swapped every pair of characters") {
          encrypted_path = swapPairs(encrypted_path);
        }
        if (encryption_method.slice(0, 5) === "added") {
          let numberToAdd: number | string;
          if (encryption_method.slice(7, 8) !== " ") {
            numberToAdd = encryption_method.slice(6, 8);
          } else {
            numberToAdd = encryption_method.slice(6, 7);
          }
          numberToAdd = parseInt(numberToAdd as string);
          encrypted_path = decodeAsciiString(encrypted_path, numberToAdd);
        }
        if (
          encryption_method.includes("encoded it with custom hex character")
        ) {
          const hexSet = findHexSet(encryption_method);
          encrypted_path = decodeCustomHex(encrypted_path, hexSet);
        }
        if (encryption_method.includes("scrambled!")) {
          let hexSet = findHexSet(encryption_method);
          encrypted_path = decodeScrambledHex(encrypted_path, hexSet);
          console.log("encrypted:", encrypted_path);
        }
        if (encryption_method === "encoded as base64") {
          encrypted_path = decodeBase64Path(encrypted_path);
        }
        if (encryption_method.includes("circularly rotated")) {
          encrypted_path = decodeRotated(
            encrypted_path,
            parseInt(findHexSet(encryption_method))
          );
        }
        if (encryption_method.includes("hashed")) return;
        queue.push(`task_${encrypted_path}`);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="App">
      <h1>Endpoints Data</h1>
      {/* {objects.map((object) => {
        return <div>{object.step}</div>;
      })} */}
    </div>
  );
}

export default App;
