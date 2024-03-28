import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Si vous voulez gérer la navigation

import eye from "../images/eye.png";
import play from "../images/play.png";
import checkRed from "../images/checkRed.png";

const MyList = () => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("userToken");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId || !token) {
      console.log("User not logged in");
      setError("Vous devez être connecté pour voir cette liste.");
      return;
    }

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/list/${userId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setItems(response.data);
        console.log("Data received from API:", response.data);
        setError("");
      } catch (error) {
        const errorMessage = error.response
          ? `${error.response.status}: ${error.response.data.error}`
          : "Erreur inconnue";
        setError(`Erreur lors de la récupération des données. ${errorMessage}`);
      }
    };

    fetchData();
  }, [userId, token]);

  const handleClick = (animeId) => {
    navigate(`/anime/${animeId}`);
    window.scrollTo(0, 0);
  };

  return (
    <div>
      <h1>My List</h1>
      {error ? (
        <p>{error}</p>
      ) : (
        <div>
          <div className="background">
            <div>
              <div className="title-container container myList">
                <img src={checkRed} alt="" />
                <h3>Watched Anime</h3>
              </div>

              {items
                .filter((anime) => anime.status === "watched")
                .map((anime) => (
                  <div key={anime.id} onClick={() => handleClick(anime.id)}>
                    <div>
                      <h3>{anime.title}</h3>
                    </div>
                    <div>
                      <p>Status: {anime.status}</p>
                      <img src={anime.image} alt={anime.title} />
                    </div>
                  </div>
                ))}
            </div>

            <div>
              <div className="title-container container myList">
                <img src={eye} alt="" />
                <h3>Watching Anime</h3>
              </div>

              {items
                .filter((anime) => anime.status === "watching")
                .map((anime) => (
                  <div key={anime.id} onClick={() => handleClick(anime.id)}>
                    <h3>{anime.title}</h3>
                    <p>Status: {anime.status}</p>
                    <img src={anime.image} alt={anime.title} />
                  </div>
                ))}
            </div>

            <div>
              <div className="title-container container myList">
                <img src={play} alt="" />
                <h3>Anime to watch</h3>
              </div>

              {items
                .filter((anime) => anime.status === "toWatch")
                .map((anime) => (
                  <div key={anime.id} onClick={() => handleClick(anime.id)}>
                    <h3>{anime.title}</h3>
                    <p>Status: {anime.status}</p>
                    <img src={anime.image} alt={anime.title} />
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyList;
