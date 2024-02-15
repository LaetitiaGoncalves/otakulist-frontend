import React from "react";
import { useNavigate } from "react-router-dom";
import AnimeCardItem from "./AnimeCardItem";

const AnimeCard = ({
  data,
  currentIndex = 0,
  itemsPerPage = data.length,
  userId,
}) => {
  const navigate = useNavigate();
  const currentAnimeList = Array.isArray(data)
    ? data.slice(currentIndex, currentIndex + itemsPerPage)
    : [data];

  const handleClick = (animeId) => {
    navigate(`/anime/${animeId}`);
    window.scrollTo(0, 0);
  };

  return (
    <div className="anime-card-carousel">
      {currentAnimeList.map((anime, index) => (
        <AnimeCardItem
          key={index}
          anime={anime}
          userId={userId}
          onClick={handleClick}
        />
      ))}
    </div>
  );
};

export default AnimeCard;
