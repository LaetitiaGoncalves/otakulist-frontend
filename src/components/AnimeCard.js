import React, { useState, useEffect } from "react";
import axios from "axios";
import arrowbottom from "../images/arrowbottom.svg";

const AnimeCard = ({ apiTopAnime, apiSeasonal, apiUpcoming, apiAiring }) => {
  const [animeData, setAnimeData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        if (apiSeasonal) {
          response = await axios.get(apiSeasonal);
        } else if (apiTopAnime) {
          response = await axios.get(apiTopAnime);
        } else if (apiUpcoming) {
          response = await axios.get(apiUpcoming);
        } else {
          response = await axios.get(apiAiring);
        }
        setAnimeData(response.data.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [apiTopAnime, apiSeasonal, apiUpcoming, apiAiring]);

  return (
    <div className="anime-card-carousel">
      {animeData.map((item) => (
        <div className="anime-card" key={item.id}>
          <div className="image-container">
            <img src={item.images.jpg.large_image_url} alt="" />
            <div className="top-section">
              <p>{item.score}</p>
            </div>
            <div className="bottom-section">
              <div className="button-container">
                <p> + Add to list</p>
                <img
                  src={arrowbottom}
                  alt="arrow bottom"
                  style={{ width: "9px", marginTop: "5px" }}
                />
              </div>

              <p>{item.title_english}</p>
              <ul>
                {item.genres.map((genreItem) => (
                  <li key={genreItem.id}>{genreItem.name}</li>
                ))}
              </ul>
              <ul>
                {item.demographics.map((demoItem) => (
                  <li key={demoItem.id}>{demoItem.name}</li>
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
