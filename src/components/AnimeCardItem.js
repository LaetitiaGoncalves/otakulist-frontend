import React, { useState, useEffect } from "react";

const AnimeCardItem = ({ anime, onClick }) => {
  const [status, setStatus] = useState("");
  const [animeList, setAnimeList] = useState([]);

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
      setAnimeList(list);

      list.forEach((item) => {
        console.log(
          `Comparaison des identifiants: animeId de la liste=${item.anime_id}, animeId du composant=${anime.mal_id}`
        );
        if (item.anime_id === anime.mal_id) {
          setStatus(item.status);
          console.log(
            `Statut actuel de l'anime dans la liste : ${item.status}`
          );
        }
      });
    } catch (error) {
      console.error("Erreur lors de la récupération de la liste :", error);
    }
  };

  useEffect(() => {
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

      const result = await response.json();
      console.log("Réponse réussie de la requête : ", result);
      fetchList();
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
