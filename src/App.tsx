import { useState, useEffect, useRef } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [objects, setObjects] = useState<any[]>([]);

  const hasFetched = useRef(false);

  useEffect(() => {
    const fetchEndpointsData = async () => {
      if (hasFetched.current) return;
      hasFetched.current = true;

      const response = await axios.get("/api/timdecillis@gmail.com");
      console.log("1:", response.data.encrypted_path);
      const response2 = await axios.get(response.data.encrypted_path);
      console.log("2:", response2.data);
      let nextPath;
      function decodeAsciiArray(asciiArray: number[]) {
        return asciiArray.map((value) => String.fromCharCode(value)).join("");
      }

      if (
        response2.data.encryption_method ===
        "converted to a JSON array of ASCII values"
      ) {
        const slicedPath = response2.data.encrypted_path.slice(5);
        nextPath = decodeAsciiArray(
          JSON.parse(response2.data.encrypted_path.slice(5))
        );
      }
      const response3 = nextPath ? await axios.get(`task_${nextPath}`) : null;
      let nextPath2;
      function swapPairs(str: string) {
        let swappedStr = "";

        for (let i = 0; i < str.length; i += 2) {
          if (i + 1 < str.length) {
            // Swap the pair of characters
            swappedStr += str[i + 1] + str[i];
          } else {
            // If there is an odd number of characters, just add the last character
            swappedStr += str[i];
          }
        }

        return swappedStr;
      }

      nextPath2 = swapPairs(response3?.data.encrypted_path.slice(5));
      console.log("3:", nextPath2);
      const response4 = nextPath2 ? await axios.get(`task_${nextPath2}`) : null;
      console.log('4:', response4?.data)

      // setObjects((prevData) => [...prevData, response.data]);
    };
    fetchEndpointsData();
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
