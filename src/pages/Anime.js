import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Anime = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  const [dataImages, setDataImages] = useState();
  const { id } = useParams();

  useEffect(() => {
    try {
      const fetchData = async () => {
        const responseData = await axios.get(
          `http://localhost:3001/anime/${id}`
        );
        setData(responseData.data.data);

        const responseImages = await axios.get(
          `https://api.jikan.moe/v4/anime/${id}/pictures`
        );
        setDataImages(responseImages.data);
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
            <div className="title&score">
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
                <p>Status : {data.status}</p>
                <p>
                  Genres :
                  {data.genres.map((genre, index) => {
                    return <p key="index">{genre.name}</p>;
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
                  <p>Catégorie : Non définie</p>
                )}
                <p>Episodes : {data.episodes}</p>
                <p>Age conseillé : {data.rating}</p>
                <p>
                  Studio d'animation :
                  {data.studios.map((studio, index) => {
                    return <p key="index">{studio.name}</p>;
                  })}
                </p>
                <p>
                  Plateforme :
                  {data.streaming.map((streaming, index) => {
                    return <p key="index">{streaming.name}</p>;
                  })}
                </p>
              </div>
            </div>
            <div className="anime-page-images">
              <h2>Images</h2>
              <div>
                {dataImages.data.map((image, index) => {
                  return (
                    <img src={image.jpg.large_image_url} alt="" key="index" />
                  );
                })}
              </div>
            </div>
            <div className="anime-page-trailer">
              <h2>Trailer</h2>
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
        </>
      )}
    </div>
  );
};

export default Anime;
