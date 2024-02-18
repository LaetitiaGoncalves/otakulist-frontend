import { useState, useEffect } from "react";
import axios from "axios";

//import components
import AnimeCard from "../components/AnimeCard";

//import pictures
import feuillederable from "../images/feuillederable.png";
import sakura from "../images/sakura.png";
import snowflake from "../images/snowflake.png";
import sun from "../images/sun.png";
import medaille from "../images/medaille.png";
import augmenter from "../images/augmenter.png";
import feu from "../images/feu.png";
import ArrowLeft from "../images/arrowLeft.svg";
import ArrowRight from "../images/arrowRight.svg";
import arrowbottom from "../images/arrowbottom.svg";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);

  const [currentSeason, setCurrentSeason] = useState("");

  const [dataSeasonal, setDataSeasonal] = useState([]);
  const [dataUpcoming, setDataUpcoming] = useState([]);
  const [dataTopAnime, setDataTopAnime] = useState([]);
  const [dataAiring, setDataAiring] = useState([]);

  const [indexSeasonal, setIndexSeasonal] = useState(0);
  const [indexUpcoming, setIndexUpcoming] = useState(0);
  const [indexTopAnime, setIndexTopAnime] = useState(0);
  const [indexAiring, setIndexAiring] = useState(0);

  const itemsPerPage = 3;

  // URLs d'API

  const apiTopAnime = "http://localhost:3001/topanime"; //modifié car trop de requetes
  const apiSeasonal = "http://localhost:3001/seasonal";
  const apiUpcoming = "http://localhost:3001/upcoming";
  const apiAiring = "http://localhost:3001/upcoming"; //airing modifiée en upcoming pour cause de bug api

  // Fonction tronquer

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }

    const endOfSentence = text.lastIndexOf(".", maxLength);
    if (endOfSentence !== -1) {
      return text.substr(0, endOfSentence + 1) + "..";
    } else {
      return text.substr(0, maxLength);
    }
  };

  // Fonctions pour les carousels

  const handlePreviousSeasonal = () => {
    const newIndex = indexSeasonal - itemsPerPage;
    setIndexSeasonal(newIndex < 0 ? 0 : newIndex);
  };
  const handleNextSeasonal = () => {
    const newIndex = indexSeasonal + itemsPerPage;
    setIndexSeasonal(
      newIndex >= dataSeasonal.length ? indexSeasonal : newIndex
    );
  };

  const handlePreviousTopAnime = () => {
    const newIndex = indexTopAnime - itemsPerPage;
    setIndexTopAnime(newIndex < 0 ? 0 : newIndex);
  };
  const handleNextTopAnime = () => {
    const newIndex = indexTopAnime + itemsPerPage;
    setIndexTopAnime(
      newIndex >= dataTopAnime.length ? indexTopAnime : newIndex
    );
  };

  const handlePreviousUpComing = () => {
    const newIndex = indexUpcoming - itemsPerPage;
    setIndexUpcoming(newIndex < 0 ? 0 : newIndex);
  };
  const handleNextUpComing = () => {
    const newIndex = indexUpcoming + itemsPerPage;
    setIndexUpcoming(
      newIndex >= dataUpcoming.length ? indexUpcoming : newIndex
    );
  };

  const handlePreviousAiring = () => {
    const newIndex = indexAiring - itemsPerPage;
    setIndexAiring(newIndex < 0 ? 0 : newIndex);
  };
  const handleNextAiring = () => {
    const newIndex = indexAiring + itemsPerPage;
    setIndexAiring(newIndex >= dataAiring.length ? indexAiring : newIndex);
  };

  useEffect(() => {
    const getSeason = () => {
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth() + 1;

      if (currentMonth >= 3 && currentMonth <= 5) {
        setCurrentSeason("Spring");
      } else if (currentMonth >= 6 && currentMonth <= 8) {
        setCurrentSeason("Summer");
      } else if (currentMonth >= 9 && currentMonth <= 11) {
        setCurrentSeason("Fall");
      } else {
        setCurrentSeason("Winter");
      }
    };

    getSeason();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseSeasonal = await axios.get(apiSeasonal);
        setDataSeasonal(responseSeasonal.data.data);
        const responseUpcoming = await axios.get(apiUpcoming);
        setDataUpcoming(responseUpcoming.data.data);
        const responseTopAnime = await axios.get(apiTopAnime);
        setDataTopAnime(responseTopAnime.data.data);
        const responseAiring = await axios.get(apiAiring);
        setDataAiring(responseAiring.data.data);

        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {isLoading === true ? (
        <p>En cours de chargement</p>
      ) : (
        <>
          {dataAiring.map((data, index) => {
            if (index === 0) {
              return (
                <div className="banner" key="index">
                  <div>
                    <div className="banner-content">
                      <p>#1 Plus populaire du moment</p>
                      <h1>{truncateText(data.title_english, 25)}</h1>
                      <p className={"banner-truncate-text"}>
                        {truncateText(data.synopsis, 400)}
                      </p>
                      <div className="banner-button">
                        <button>En savoir plus</button>
                        <div className="button-addList">
                          <p> + Add to list</p>
                          <img src={arrowbottom} alt="arrow bottom" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="banner-img">
                    <div style={{ width: "800px", height: "600px" }}>
                      <img
                        src={data.images.jpg.large_image_url}
                        alt=""
                        className="img-banner-back"
                      />
                      <div className="white-overlay"></div>
                    </div>

                    <div
                      style={{
                        width: "400px",
                        height: "600px",
                        position: "absolute",
                        top: "0",
                        left: "50%",
                        transform: "translateX(-50%)",
                        overflow: "hidden",
                      }}
                    >
                      <img
                        src={data.images.jpg.large_image_url}
                        alt=""
                        className="img-banner-front"
                      />
                    </div>
                  </div>
                </div>
              );
            }
            return null;
          })}
          <h2>Le meilleur des animés</h2>
          <div className="background">
            <div className="title-container container">
              <div>
                {currentSeason === "Winter" ? (
                  <img src={snowflake} alt="snowflake" />
                ) : currentSeason === "Fall" ? (
                  <img src={feuillederable} alt="feuille d'érable" />
                ) : currentSeason === "Spring" ? (
                  <img src={sakura} alt="fleur de sakura" />
                ) : (
                  <img src={sun} alt="soleil" />
                )}
                <h3>Animés de la saison</h3>
              </div>
              <a href="/">Voir plus</a>
            </div>
            <div className="carousel container">
              <button onClick={handlePreviousSeasonal}>
                <img src={ArrowLeft} alt="" />
              </button>
              {dataSeasonal && dataSeasonal.length > 0 && (
                <AnimeCard
                  currentIndex={indexSeasonal}
                  itemsPerPage={itemsPerPage}
                  data={dataSeasonal}
                />
              )}
              <button onClick={handleNextSeasonal}>
                <img src={ArrowRight} alt="" />
              </button>
            </div>

            <div className="title-container container">
              <div>
                <img src={feu} alt="flamme" />
                <h3>Animés les plus attendus</h3>
              </div>
              <a href="/">Voir plus</a>
            </div>
            <div className="carousel container">
              <button onClick={handlePreviousUpComing}>
                <img src={ArrowLeft} alt="" />
              </button>
              {dataUpcoming && dataUpcoming.length > 0 && (
                <AnimeCard
                  currentIndex={indexUpcoming}
                  itemsPerPage={itemsPerPage}
                  data={dataUpcoming}
                />
              )}
              <button onClick={handleNextUpComing}>
                <img src={ArrowRight} alt="" />
              </button>
            </div>
            <div className="title-container container">
              <div>
                <img src={medaille} alt="medaille" />
                <h3>Top 100 des meilleurs animés</h3>
              </div>
              <a href="/">Voir plus</a>
            </div>
            <div className="carousel container">
              <button onClick={handlePreviousTopAnime}>
                <img src={ArrowLeft} alt="" />
              </button>
              {dataTopAnime && dataTopAnime.length > 0 && (
                <AnimeCard
                  currentIndex={indexTopAnime}
                  itemsPerPage={itemsPerPage}
                  data={dataTopAnime}
                />
              )}
              <button onClick={handleNextTopAnime}>
                <img src={ArrowRight} alt="" />
              </button>
            </div>
            <div className="title-container container">
              <div>
                <img src={augmenter} alt="flèche en hausse" />
                <h3>Animés les plus populaires du moment</h3>
              </div>
              <a href="/">Voir plus</a>
            </div>
            <div className="carousel container">
              <button onClick={handlePreviousAiring}>
                <img src={ArrowLeft} alt="" />
              </button>
              {dataAiring && dataAiring.length > 0 && (
                <AnimeCard
                  currentIndex={indexAiring}
                  itemsPerPage={itemsPerPage}
                  data={dataAiring}
                />
              )}
              <button onClick={handleNextAiring}>
                <img src={ArrowRight} alt="" />
              </button>
            </div>
          </div>
          <h2>Les dernières news</h2>
          <h2>Les animés awards de 2024</h2>
        </>
      )}
    </div>
  );
};

export default Home;
