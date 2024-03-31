import React, { useState } from "react";
import logo from "../images/logo.svg";
import loupe from "../images/loupe.svg";
import { Link, useNavigate } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";

const Header = () => {
  const [inputValue, setInputValue] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => setInputValue(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/${inputValue.trim().toLowerCase()}`);
    setInputValue("");
  };

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  return (
    <header>
      <div className="header-container">
        <Link to="/">
          <img src={logo} alt="logo Otakulist" className="logo-header" />
        </Link>
        <div className="header-links">
          <Link to="/">
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
          <Link to="/list">
            <p>My List</p>
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

          <div className="profile-menu" onClick={toggleDropdown}>
            <p>Profile</p>
            {showDropdown && (
              <div className="dropdown-menu">
                <p onClick={() => setIsSignupModalOpen(true)}>Sign Up</p>
                <p onClick={() => setIsLoginModalOpen(true)}>Login</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Signup
        isOpen={isSignupModalOpen}
        onClose={() => setIsSignupModalOpen(false)}
        onOpenLogin={() => {
          setIsSignupModalOpen(false);
          setIsLoginModalOpen(true);
        }}
      />
      <Login
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </header>
  );
};

export default Header;
