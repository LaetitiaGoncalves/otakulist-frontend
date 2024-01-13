import React from "react";
import arrowbottom from "../images/arrowbottom.svg";

const AnimeCard = ({ currentIndex, itemsPerPage, data }) => {
  console.log("Data received in AnimeCard:", data);
  const currentAnimeList = data.slice(
    currentIndex,
    currentIndex + itemsPerPage
  );
  console.log(`AnimeCard received data:`, data);
  console.log(
    `Current slice from ${currentIndex} to ${currentIndex + itemsPerPage}:`,
    currentAnimeList
  );

  // Si currentAnimeList est vide, il pourrait y avoir un problème
  if (currentAnimeList.length === 0) {
    console.error(
      `No items to display. Check if the slice parameters are correct.`
    );
  }

  return (
    <div className="anime-card-carousel">
      {currentAnimeList.map((anime, index) => (
        <div className="anime-card" key={index}>
          <div className="image-container">
            <img src={anime.images.jpg.large_image_url} alt={anime.title} />
            <div className="top-section">
              <p>{anime.score}</p>
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
                  console.log("Rendering genre with id:", genre.id);
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
