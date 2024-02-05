import React from "react";
import arrowbottom from "../images/arrowbottom.svg";
import { useNavigate } from "react-router-dom";

const AnimeCard = ({ data, currentIndex = 0, itemsPerPage = data.length }) => {
  const navigate = useNavigate();
  const currentAnimeList = Array.isArray(data)
    ? data.slice(currentIndex, currentIndex + itemsPerPage)
    : [data];

  if (currentAnimeList.length === 0) {
    console.error(`No items to display`);
  }

  const handleClick = (animeId) => {
    navigate(`/anime/${animeId}`);
    window.scrollTo(0, 0);
  };

  return (
    <div className="anime-card-carousel">
      {currentAnimeList.map((anime, index) => (
        <div
          className="anime-card"
          key={index}
          onClick={() => handleClick(anime.mal_id)}
        >
          <div className="image-container">
            <img
              src={anime.images?.jpg?.large_image_url || anime.large_image_url}
              alt={anime.title_english || anime.title}
            />
            <div className="top-section">
              {anime.score !== "N/A" && <p>{anime.score}</p>}
            </div>
            <div className="bottom-section">
              <div className="button-addList">
                <p> + Add to list</p>
                <img
                  src={arrowbottom}
                  alt="arrow bottom"
                  style={{ width: "9px", marginTop: "5px" }}
                />
              </div>

              <p>{anime.title_english}</p>
              <ul>
                {anime.genres.map((genre, index) => {
                  return <li key={index}>{genre.name}</li>;
                })}
              </ul>
              <ul>
                {anime.demographics.map((demo, index) => (
                  <li key={index}>{demo.name}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnimeCard;
