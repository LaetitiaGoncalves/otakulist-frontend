import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

//Pages
import Home from "./pages/Home";
import Header from "./components/Header";

function App() {
  const [search, setSearch] = useState("");
  return (
    <Router>
      <Header onSearch={setSearch} />
      <Routes>
        <Route path="/" element={<Home search={search} />} />
      </Routes>
    </Router>
  );
}

export default App;
