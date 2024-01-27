import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

//Pages
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Anime from "./pages/Anime";

function App() {
  const [search, setSearch] = useState("");
  return (
    <Router>
      <Header onSearch={setSearch} />
      <Routes>
        <Route path="/" element={<Home search={search} />} />
        <Route path="/anime/:id" element={<Anime />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
