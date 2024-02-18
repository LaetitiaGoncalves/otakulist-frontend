import React, { useState } from "react";
import arrowbottom from "../images/arrowbottom.svg";

const AnimeCardItem = ({ anime, onClick }) => {
  const [status, setStatus] = useState("");

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    console.log(`Nouveau statut sélectionné : ${newStatus}`);
    await updateAnimeStatus(newStatus);
  };

  const updateAnimeStatus = async (newStatus) => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("userToken");

    console.log(`UserID depuis localStorage : ${userId}`);
    console.log(`Token depuis localStorage : ${token}`);
    console.log(
      `Envoi de la requête avec : userID=${userId}, animeId=${anime.mal_id}, title=${anime.title_english}, image=${anime.images?.jpg?.large_image_url}, status=${newStatus}`
    );

    if (!userId || !token) {
      console.log("User not logged in");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/list`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId,
          animeId: anime.mal_id,
          title: anime.title_english,
          image: anime.images?.jpg?.large_image_url,
          status: newStatus,
        }),
      });

      if (!response.ok) {
        throw new Error(`Erreur avec la requête : Statut ${response.status}`);
      }

      const result = await response.json();
      console.log("Réponse réussie de la requête : ", result);
    } catch (error) {
      console.error("Erreur lors de la mise à jour/ajout de l'anime:", error);
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
            onClick={(e) => e.stopPropagation()}
            style={{ cursor: "pointer", marginTop: "5px" }}
          >
            <option value="">Add to Favorites</option>
            <option value="watched">Watched</option>
            <option value="watching">Watching</option>
            <option value="toWatch">To Watch</option>
          </select>
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
