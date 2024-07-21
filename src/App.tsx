import { useState } from "react";
import "./App.css";

function App() {
  const [endpoints, setEndpoints] = useState([]);
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
