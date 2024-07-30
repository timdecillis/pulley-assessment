import { useState, useEffect, useRef } from "react";
import "./App.css";
import axios from "axios";
import { decryptPath } from "./decryptPath";

function App() {
  const [levels, setLevels] = useState<any[]>([]);
  const hasFetched = useRef(false);

  const fetchData = async () => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    let queue = ["/timdecillis@gmail.com"];
    while (queue.length) {
      const url = queue.pop();
      if (url) {
        const response = await axios.get(url);
        let { encrypted_path } = response.data;
        encrypted_path = encrypted_path.slice(5);
        const { encryption_method, level } = response.data;
        setLevels(prevLevels => [...prevLevels, level])
        const decryptedPath = decryptPath(encrypted_path, encryption_method);
        if (decryptedPath) queue.push(`task_${decryptedPath}`);
      }
    }
    return;
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="App">
      <h1>Endpoints Data</h1>
      {levels.map((level, i) => {
        return <div key={i}>Level reached: {level}</div>;
      })}
    </div>
  );
}

export default App;
