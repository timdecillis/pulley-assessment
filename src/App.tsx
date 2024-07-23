import { useState, useEffect, useRef } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [objects, setObjects] = useState<any[]>([]);
  const hasFetched = useRef(false);

  const swapPairs = (str: string) => {
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
  const decodeAsciiString = (encryptedStr: string, number: number) => {
    let decodedStr = "";

    for (let i = 0; i < encryptedStr.length; i++) {
      const decodedCharCode = encryptedStr.charCodeAt(i) + number;
      decodedStr += String.fromCharCode(decodedCharCode);
    }

    return decodedStr;
  };
  const decodeAsciiArray = (asciiArray: number[]) => {
    return asciiArray.map((value) => String.fromCharCode(value)).join("");
  };

  const fetchData = async () => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    let queue = ["/api/timdecillis@gmail.com"];
    while (queue.length) {
      const url = queue.pop();
      if (url) {
        const response = await axios.get(url);
        console.log("response:", response.data);
        let { encrypted_path } = response.data;
        encrypted_path = encrypted_path.slice(5);
        if (
          response.data.encryption_method ===
          "converted to a JSON array of ASCII values"
        ) {
          encrypted_path = decodeAsciiArray(JSON.parse(encrypted_path));
        }
        if (
          response.data.encryption_method === "swapped every pair of characters"
        ) {
          encrypted_path = swapPairs(encrypted_path);
        }
        if (response.data.encryption_method.slice(0, 5) === "added") {
          let numberToAdd: number;
          const method = response.data.encryption_method;
          if (method.slice(7, 8) !== " ") {
            numberToAdd = method.slice(6, 8);
          } else {
            numberToAdd = method.slice(6, 7);
          }
          encrypted_path = decodeAsciiString(
            JSON.parse(encrypted_path),
            numberToAdd
          );
        }
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
