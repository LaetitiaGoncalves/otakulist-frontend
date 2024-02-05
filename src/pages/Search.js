import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AnimeCard from "../components/AnimeCard";
import ArrowLeft from "../images/arrowLeft.svg";
import ArrowRight from "../images/arrowRight.svg";

const Search = () => {
  const { searchTerm } = useParams();
  const [dataSearch, setDataSearch] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [indexSearch, setIndexSearch] = useState(0);

  const itemsPerPage = 3;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:3001/searchanime?search=${searchTerm}`
        );
        if (response.data.data) {
          const filteredData = response.data.data.filter((anime) => {
            return anime.title_english
              ?.toLowerCase()
              .includes(searchTerm.toLowerCase());
          });
          setDataSearch(filteredData);
        } else {
          setDataSearch([]);
        }
      } catch (error) {
        console.error(error);
        setDataSearch([]);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [searchTerm]);

  const handlePreviousSearch = () => {
    const newIndex = indexSearch - itemsPerPage;
    setIndexSearch(newIndex < 0 ? 0 : newIndex);
  };

  const handleNextSearch = () => {
    const newIndex = indexSearch + itemsPerPage;
    setIndexSearch(newIndex >= dataSearch.length ? indexSearch : newIndex);
  };

  const isLastPage = indexSearch + itemsPerPage >= dataSearch.length;
  const isFirstPage = indexSearch === 0;

  return (
    <div>
      {isLoading ? (
        <p>Chargement...</p>
      ) : (
        <div className="search-page container">
          <h1>Résultats pour la recherche : "{searchTerm}"</h1>
          <div className="carousel container">
            <button onClick={handlePreviousSearch} disabled={isFirstPage}>
              <img src={ArrowLeft} alt="" />
            </button>
            <div className="anime-card-carousel">
              {dataSearch
                .slice(indexSearch, indexSearch + itemsPerPage)
                .map((anime, index) => (
                  <AnimeCard key={index} data={anime} />
                ))}
            </div>
            <button onClick={handleNextSearch} disabled={isLastPage}>
              <img src={ArrowRight} alt="" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
