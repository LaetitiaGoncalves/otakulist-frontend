import React, { useState, useEffect } from "react";

const AnimeCardItem = ({ anime, onClick }) => {
  const [status, setStatus] = useState("");

  useEffect(() => {
    const fetchList = async () => {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("userToken");

      if (!userId || !token) {
        console.log("User not logged in");
        return;
      }

      try {
        const response = await fetch(`http://localhost:3001/list/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Erreur avec la requête : Statut ${response.status}`);
        }

        const list = await response.json();
        const animeItem = list.find((item) => item.anime_id === anime.mal_id);
        if (animeItem) {
          setStatus(animeItem.status);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération de la liste :", error);
      }
    };

    fetchList();
  }, [anime.mal_id]);

  const updateAnimeStatus = async (newStatus) => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("userToken");

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

      console.log("Réponse réussie de la requête : ", await response.json());
    } catch (error) {
      console.error("Erreur lors de la mise à jour/ajout de l'anime:", error);
    }
  };

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    await updateAnimeStatus(newStatus);
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
        <select
          className="button-addList"
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
