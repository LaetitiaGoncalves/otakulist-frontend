import { useState, useEffect } from "react";

//import components
import AnimeCard from "../components/AnimeCard";

//import pictures
import feuillederable from "../images/feuillederable.png";
import sakura from "../images/sakura.png";
import snowflake from "../images/snowflake.png";
import sun from "../images/sun.png";

const Home = () => {
  const [currentSeason, setCurrentSeason] = useState("");
  const apiTopAnime = "http://localhost:3001/topanime";
  const apiSeasonal = "http://localhost:3001/seasonal";
  const apiUpcoming = "http://localhost:3001/upcoming";
  const apiAiring = "http://localhost:3001/airing";

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

  return (
    <div>
      <h2>Le meilleur des animés</h2>
      <div className="title-container">
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
      <AnimeCard apiSeasonal={apiSeasonal} />
      <h3>Animés les plus attendus</h3>
      <AnimeCard apiUpcoming={apiUpcoming} />
      <h3>Top 100 des meilleurs animés</h3>
      <AnimeCard apiTopAnime={apiTopAnime} />
      <h3>Animés les plus populaires du moment</h3>
      <AnimeCard apiAiring={apiAiring} />
      <h2>Les dernières new</h2>
      <h2>Les animes awards de 2024</h2>
    </div>
  );
};

export default Home;
