import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import eye from "../images/eye.png";
import play from "../images/play.png";
import checkRed from "../images/checkRed.png";
import ArrowLeft from "../images/arrowLeft.svg";
import ArrowRight from "../images/arrowRight.svg";

const MyList = () => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Indices pour la pagination de chaque catégorie
  const [watchedIndex, setWatchedIndex] = useState(0);
  const [watchingIndex, setWatchingIndex] = useState(0);
  const [toWatchIndex, setToWatchIndex] = useState(0);
  const itemsPerSlide = 3; // Nombre d'éléments par slide

  const token = localStorage.getItem("userToken");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId || !token) {
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
        console.log(response.data);
      } catch (error) {
        setError("Erreur lors de la récupération des données.");
      }
    };

    fetchData();
  }, [userId, token]);

  const handleClick = (animeId) => {
    if (animeId) {
      navigate(`/anime/${animeId}`);
    } else {
      console.error("L'ID de l'anime est undefined.");
    }
  };

  const handleNext = (type) => {
    const index =
      type === "watched"
        ? watchedIndex
        : type === "watching"
        ? watchingIndex
        : toWatchIndex;
    const maxIndex =
      items.filter((anime) => anime.status === type).length - itemsPerSlide;
    const newIndex = Math.min(index + itemsPerSlide, maxIndex);

    if (type === "watched") {
      setWatchedIndex(newIndex);
    } else if (type === "watching") {
      setWatchingIndex(newIndex);
    } else if (type === "toWatch") {
      setToWatchIndex(newIndex);
    }
  };

  const handlePrevious = (type) => {
    const index =
      type === "watched"
        ? watchedIndex
        : type === "watching"
        ? watchingIndex
        : toWatchIndex;
    const newIndex = Math.max(0, index - itemsPerSlide);

    if (type === "watched") {
      setWatchedIndex(newIndex);
    } else if (type === "watching") {
      setWatchingIndex(newIndex);
    } else if (type === "toWatch") {
      setToWatchIndex(newIndex);
    }
  };

  // Fonction de rendu pour chaque catégorie de carrousel
  const renderCarousel = (status, title, icon) => {
    const startIndex =
      status === "watched"
        ? watchedIndex
        : status === "watching"
        ? watchingIndex
        : toWatchIndex;
    return (
      <div className="container">
        <div className="title-container container myList">
          <img src={icon} alt={title} />
          <h3>{title}</h3>
        </div>
        <div className="carousel-list">
          <button onClick={() => handlePrevious(status)}>
            <img src={ArrowLeft} alt="Previous" />
          </button>
          {items
            .filter((anime) => anime.status === status)
            .slice(startIndex, startIndex + itemsPerSlide)
            .map((anime) => (
              <div
                className="anime-card"
                key={anime.id}
                onClick={() => handleClick(anime.anime_id)}
              >
                <div className="image-container">
                  <img src={anime.image} alt={anime.title} />
                  <div className="top-section">
                    <p>{anime.status}</p>
                  </div>
                </div>
                <div className="bottom-section">
                  <p>{anime.title}</p>
                </div>
              </div>
            ))}
          <button onClick={() => handleNext(status)}>
            <img src={ArrowRight} alt="Next" />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div>
      <h2>My List</h2>
      {error ? (
        <p>{error}</p>
      ) : (
        <div className="background">
          {renderCarousel("watched", "Watched Anime", checkRed)}
          {renderCarousel("watching", "Watching Anime", eye)}
          {renderCarousel("toWatch", "Anime to Watch", play)}
        </div>
      )}
    </div>
  );
};

export default MyList;
