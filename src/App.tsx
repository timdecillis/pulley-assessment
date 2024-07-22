import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [endpoints, setEndpoints] = useState<any[]>([]);

  useEffect(() => {
    const fetchEndpointsData = async () => {
      const response = await axios.get("/api/timdecillis@gmail.com");
      console.log(response)
      setEndpoints((prevEndpoints) => [...prevEndpoints, response.data]);
    };
    fetchEndpointsData();
  }, []);
  return (
    <div className="App">
      <h1>Endpoints Data</h1>
      {endpoints.map((object) => {
        return (
          <div>{object.challenger}</div>
        )
      })}
    </div>
  );
}

export default App;
