import React, { useState } from "react";
import arrowbottom from "../images/arrowbottom.svg";

const AnimeCardItem = ({ anime, onClick }) => {
  const [status, setStatus] = useState("");

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const stopClickPropagation = (e) => {
    e.stopPropagation();
  };

  const addToFavorites = async (e) => {
    const userId = localStorage.getItem("userId");
    console.log(userId);

    try {
      const response = await fetch("http://localhost:3001/liste", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          title: anime.title_english,
          image: anime.images?.jpg?.large_image_url,
          status,
        }),
      });

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error("Failed to add to favorites:", error);
    }
  };

  return (
    <div className="anime-card" onClick={() => onClick(anime.mal_id)}>
      <div className="image-container">
        <img
          src={anime.images?.jpg?.large_image_url || anime.large_image_url}
          alt={anime.title_english || anime.title}
        />
        <div className="top-section">
          {anime.score !== "N/A" && <p>{anime.score}</p>}
        </div>
      </div>
      <div className="bottom-section">
        <div className="button-addList">
          <select
            value={status}
            onChange={handleStatusChange}
            onClick={stopClickPropagation}
            style={{ cursor: "pointer", marginTop: "5px" }}
          >
            <option value="">Add to Favorites</option>
            <option value="watched">Watched</option>
            <option value="watching">Watching</option>
            <option value="toWatch">To Watch</option>
          </select>
          <button
            onClick={(e) => {
              addToFavorites();
              e.stopPropagation();
            }}
            style={{ cursor: "pointer" }}
          >
            Add
          </button>
        </div>
        <p>{anime.title_english}</p>
        <ul>
          {anime.genres.map((genre, index) => (
            <li key={index}>{genre.name}</li>
          ))}
        </ul>
        <ul>
          {anime.demographics.map((demo, index) => (
            <li key={index}>{demo.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AnimeCardItem;
