import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

//import pictures
import similarity from "../images/similarity.svg";
import ArrowLeft from "../images/arrowLeft.svg";
import ArrowRight from "../images/arrowRight.svg";

//import components
import AnimeCard from "../components/AnimeCard";

const Anime = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  const [dataImages, setDataImages] = useState();
  const [dataRecommandation, setDataRecommandation] = useState([]);
  const [index, setIndex] = useState(0);

  const { id } = useParams();
  const itemsPerPage = 3;
  const imagesPerPage = 4;

  useEffect(() => {
    try {
      const fetchData = async () => {
        const responseData = await axios.get(
          `http://localhost:3001/anime/${id}`
        );
        setData(responseData.data.data);

        const responseImages = await axios.get(
          `http://localhost:3001/anime/pictures/${id}`
        );
        setDataImages(responseImages.data);

        const responseRecommandations = await axios.get(
          `http://localhost:3001/anime/recommandations/${id}`
        );
        console.log(responseRecommandations.data);
        setDataRecommandation(responseRecommandations.data.data);

        setIsLoading(false);
      };

      fetchData();
    } catch (error) {
      console.log(error.message);
    }
  }, [id]);

  // Fonction pour couper le synopsis

  const cutSynopsis = (synopsis) => {
    const cutWord = "[Written by";
    const index = synopsis.toLowerCase().indexOf(cutWord.toLowerCase());
    return index !== -1 ? synopsis.substring(0, index) : synopsis;
  };

  //Fonction pour adapter les data à envoyer à AnimeData

  const adaptedData =
    dataRecommandation && dataRecommandation.length > 0
      ? dataRecommandation.map((item) => {
          return {
            mal_id: item.entry.mal_id,
            title_english: item.entry.title,
            large_image_url: item.entry.images.jpg.large_image_url,
            score: item.entry.score || "N/A",
            genres: item.entry.genres || [],
            demographics: item.entry.demographics || [],
          };
        })
      : [];

  //Fonctions pour les carousels

  const isFirstPage = index === 0;
  const isLastPage = index + itemsPerPage >= adaptedData.length;
  const isLastPageImages =
    index + imagesPerPage >= (dataImages?.data?.length || 0);

  const handleNextImages = () => {
    const newIndex = index + imagesPerPage;
    setIndex(isLastPageImages ? index : newIndex);
  };
  const handlePrevious = () => {
    const newIndex = index - itemsPerPage;
    setIndex(newIndex < 0 ? 0 : newIndex);
  };
  const handleNext = () => {
    const newIndex = index + itemsPerPage;
    setIndex(newIndex >= dataRecommandation.length ? index : newIndex);
  };

  return (
    <div>
      {isLoading === true ? (
        <p>En cours de chargement</p>
      ) : (
        <>
          <div className="anime-page-banner">
            <img
              src={data.images.jpg.large_image_url}
              alt=""
              className="img-banner-back"
            />
            <div className="white-overlay"></div>
            <img
              src={data.images.jpg.large_image_url}
              alt=""
              className="img-banner-front"
            />
            <div className="popularity-banner">
              <p>#{data.rank} plus populaire sur 26531</p>
            </div>
          </div>
          <div className="info-section">
            <div className="title-score">
              <h1>{data.title_english}</h1>
              <div>
                <div className="score">
                  <p>{data.score}</p>
                </div>
                <a href="#">Noter</a>
              </div>
            </div>
            <div className="anime-page-buttons">
              <div>
                <p>En cours</p>
              </div>
              <div>Votre Note</div>
            </div>
            <div className="anime-page-description">
              <div>{cutSynopsis(data.synopsis)}</div>
              <div>
                <p>
                  Status : <span>{data.status}</span>
                </p>
                <p>
                  Genres :
                  {data.genres.map((genre, index) => {
                    return <span key={index}>{genre.name}</span>;
                  })}
                </p>
                {data.demographics && data.demographics.length > 0 ? (
                  <p>
                    Catégorie :
                    {data.demographics.map((demographic, index) => (
                      <span key={index}>
                        {demographic.name}
                        {index < data.demographics.length - 1 ? ", " : ""}
                      </span>
                    ))}
                  </p>
                ) : (
                  <p>
                    Catégorie :<span>Non définie</span>
                  </p>
                )}
                <p>
                  Episodes :<span>{data.episodes}</span>
                </p>
                <p>
                  Age conseillé :<span>{data.rating}</span>
                </p>
                <p>
                  Studio d'animation :
                  {data.studios.map((studio, index) => {
                    return <span key={index}>{studio.name}</span>;
                  })}
                </p>
                <p>
                  Plateforme :
                  {data.streaming.map((streaming, index) => {
                    return <span key={index}>{streaming.name}</span>;
                  })}
                </p>
              </div>
            </div>
            <div className="anime-page-images">
              <h2>Images</h2>
              <div className="carousel">
                <button onClick={handlePrevious} disabled={isFirstPage}>
                  <img src={ArrowLeft} alt="" />
                </button>
                <div className="anime-card-carousel">
                  {dataImages.data
                    .slice(index, index + imagesPerPage)
                    .map((image, index) => {
                      return (
                        <img
                          className="anime-card-carousel-img"
                          src={image.jpg.large_image_url}
                          alt=""
                          key={index}
                        />
                      );
                    })}
                </div>
                <button onClick={handleNextImages} disabled={isLastPageImages}>
                  <img src={ArrowRight} alt="" />
                </button>
              </div>
            </div>
            <div className="anime-page-trailer">
              <h2>Trailer</h2>
              <div className="iframe">
                <iframe
                  width="1240"
                  height="648"
                  src={data.trailer.embed_url}
                  frameBorder="0"
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
            <div className="title-container">
              <div>
                <img src={similarity} alt="logo presque égal" />
                <h3>Animés similaires</h3>
              </div>
            </div>
            <div className="carousel container">
              <button onClick={handlePrevious} disabled={isFirstPage}>
                <img src={ArrowLeft} alt="" />
              </button>
              <div className="anime-card-carousel">
                {dataRecommandation.length > 0 && (
                  <AnimeCard
                    data={adaptedData}
                    currentIndex={index}
                    itemsPerPage={itemsPerPage}
                  />
                )}
              </div>
              <button onClick={handleNext} disabled={isLastPage}>
                <img src={ArrowRight} alt="" />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Anime;
