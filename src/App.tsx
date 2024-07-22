import { useState, useEffect, useRef } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [endpoints, setEndpoints] = useState<any[]>([]);
  const hasFetched = useRef(false);

  useEffect(() => {
    const fetchEndpointsData = async () => {
      if (hasFetched.current) return;
      hasFetched.current = true;
      const response = await axios.get("/api/timdecillis@gmail.com");
      setEndpoints((prevEndpoints) => [...prevEndpoints, response.data]);
    };
    fetchEndpointsData();
  }, []);
  return (
    <div className="App">
      <h1>Endpoints Data</h1>
      {endpoints.map((object, i) => {
        const keys = Object.keys(object);
        return (
          <div key={i}>
            <h5>Step {object.level}</h5>
            {keys.map((key, index) => {
              return <div key={index}>{object[key]}</div>;
            })}
          </div>
        );

        return <div>{object.challenger}</div>;
      })}
    </div>
  );
}

export default App;
