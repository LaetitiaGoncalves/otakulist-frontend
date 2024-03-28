import logo from "../images/logo.svg";
import loupe from "../images/loupe.svg";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Signup from "./Signup";


const Header = () => {
  const [inputValue, setInputValue] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputValue(e.target.value);
    console.log(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const searchTerm = inputValue.toLowerCase();
    navigate(`/search/${searchTerm}`);
    setInputValue("");
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

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
          <Link onClick={toggleModal}>
            <p>Profile</p>
          </Link>
          <Signup isOpen={isModalOpen} onClose={toggleModal} />
        </div>
      </div>
    </header>
  );
};

export default Header;
