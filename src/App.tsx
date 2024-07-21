import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [endpoints, setEndpoints] = useState([]);

  useEffect(() => {}, []);
  return (
    <div className="App">
      <h1>Endpoints Data</h1>
      {endpoints.map((data) => (
        <div>{data}</div>
      ))}
    </div>
  );
}

export default App;
