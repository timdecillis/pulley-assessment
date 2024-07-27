import { useState, useEffect, useRef } from "react";
import "./App.css";
import axios from "axios";
import {
  mapDict,
  fruits,
  swapPairs,
  decodeAsciiString,
  decodeAsciiArray,
  decodeCustomHex,
  decodeScrambledHex,
  decodeBase64Path,
  decodeRotated,
  findMethodKey,
  decryptPath,
} from "./utils";

function App() {
  const [objects, setObjects] = useState<any[]>([]);
  const hasFetched = useRef(false);

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
        queue.push(`task_${decryptPath(encrypted_path, encryption_method)}`);
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
