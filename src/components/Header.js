import logo from "../images/logo.svg";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Header = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(inputValue);
  };
  return (
    <header>
      <div className="header-container">
        <Link to="/">
          <img src={logo} alt="logo Otakulist" className="logo-header" />
        </Link>
        <div className="header-links">
          <Link>
            <p>Home</p>
          </Link>
          <Link>
            <p>Top Anime</p>
          </Link>
          <Link>
            <p>Genres</p>
          </Link>
          <Link>
            <p>Catégories</p>
          </Link>
          <Link>
            <p>News</p>
          </Link>
          <Link>
            <p>Ma Liste</p>
          </Link>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Rechercher..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </header>
  );
};

export default Header;
