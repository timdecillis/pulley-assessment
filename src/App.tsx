import { useState, useEffect, useRef } from "react";
import "./App.css";
import axios from "axios";
import { decryptPath, fetchEndpoint } from "./decryptPath";

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
        const {decryptedPath, level} = await fetchEndpoint(url)
        setLevels(prevLevels => [...prevLevels, level])
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
