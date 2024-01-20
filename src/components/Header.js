import logo from "../images/logo.svg";
import loupe from "../images/loupe.svg";
import { Link } from "react-router-dom";
import { useState } from "react";

const Header = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e) => {
    setInputValue(e.target.value);
    console.log(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(inputValue);
    console.log(inputValue);
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
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Rechercher..."
              value={inputValue}
              onChange={handleChange}
            />
            <button type="submit">
              <img src={loupe} alt="" />
            </button>
          </form>
          <Link>
            <p>Profile</p>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
