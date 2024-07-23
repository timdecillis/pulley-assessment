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
      const decodedCharCode = encryptedStr.charCodeAt(i) - number;
      decodedStr += String.fromCharCode(decodedCharCode);
    }

    return decodedStr;
  };
  const decodeAsciiArray = (asciiArray: number[]) => {
    return asciiArray.map((value) => String.fromCharCode(value)).join("");
  };
  const findHexSet = (string: string) => {

    let index;
    for (let i = string.length - 1; i > 0; i--) {

      if (string[i] === " ") {
        index = i;
        break;
      }
    }
    return string.slice(index);
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
          console.log("hex set:", findHexSet(encryption_method));
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
