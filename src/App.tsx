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
      setObjects((prevData) => [...prevData, response.data]);
    };
    fetchEndpointsData();
  }, []);
  return (
    <div className="App">
      <h1>Endpoints Data</h1>
      {objects.map((object) => {
        return <div>{object.step}</div>;
      })}
    </div>
  );
}

export default App;
