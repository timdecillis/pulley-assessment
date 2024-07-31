import { useState, useEffect, useRef } from "react";
import "./App.css";
import { fetchAllEndpoints } from "./decryptPath";

function App() {
  const [levels, setLevels] = useState<any[]>([]);
  const hasFetched = useRef(false);

  const fetchData = async () => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const updatedLevels = await fetchAllEndpoints("/timdecillis@gmail.com");
    setLevels((prevLevels) => [...prevLevels, updatedLevels]);
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
