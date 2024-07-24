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
        index = i + 1;
        break;
      }
    }
    return string.slice(index);
  };
  const decodeWithHexSet = (encodedStr: string, hexSet: string): string => {
    if (hexSet.length !== 16) {
      throw new Error("Hex set must contain exactly 16 characters.");
    }

    // Create a mapping from hex set characters to their corresponding values (0-15)
    const hexMap: { [key: string]: number } = {};
    for (let i = 0; i < hexSet.length; i++) {
      hexMap[hexSet[i]] = i;
    }

    console.log("Hex Map:", hexMap);

    let decodedStr = "";

    // Iterate through the encoded string two characters at a time
    for (let i = 0; i < encodedStr.length; i += 2) {
      const highChar = encodedStr[i];
      const lowChar = encodedStr[i + 1];

      // Ensure the characters are in the hexMap
      if (!(highChar in hexMap) || !(lowChar in hexMap)) {
        throw new Error(`Encoded string contains characters not in the hex set: ${highChar}, ${lowChar}`);
      }

      // Convert hex pair to the corresponding ASCII character
      const highValue = hexMap[highChar];
      const lowValue = hexMap[lowChar];
      const decodedCharCode = (highValue << 4) | lowValue;

      console.log(`Chars: ${highChar}${lowChar}, Values: ${highValue}, ${lowValue}, Decoded Char Code: ${decodedCharCode}`);

      decodedStr += String.fromCharCode(decodedCharCode);
    }

    return decodedStr;
  };

  const fetchData = async () => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    let queue = ["/api/timdecillis@gmail.com"];
    while (queue.length) {
      const url = queue.pop();
      console.log("url:", url);
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
          console.log("hex:", hexSet);
          encrypted_path = decodeWithHexSet(encrypted_path, hexSet);
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
