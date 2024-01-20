import logoFooter from "../images/logoFooter.svg";
import arrowtop from "../images/arrowtop.svg";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer>
      <img src={logoFooter} alt="" className="logo-footer" />
      <div>
        <p>Copyright © {currentYear}</p>
        <p>Laëtitia Gonçalves</p>
        <p>All rights reserved</p>
      </div>
      <div>
        <p className="footer-title">Genres</p>
        <p>
          <a href="/">Action</a>
        </p>
        <p>
          <a href="/">Aventure</a>
        </p>
        <p>
          <a href="/">Comédie</a>
        </p>
        <p>
          <a href="/">Horror</a>
        </p>
        <p>
          <a href="/">Mystère</a>
        </p>
        <p>
          <a href="/">Slice of life</a>
        </p>
      </div>
      <div>
        <p className="footer-title">Catégories</p>
        <p>
          <a href="/">Shonen</a>
        </p>
        <p>
          <a href="/">Shojo</a>
        </p>
        <p>
          <a href="/">Seinen</a>
        </p>
        <p>
          <a href="/">Kodomo</a>
        </p>
        <p>
          <a href="/">Seijin</a>
        </p>
      </div>
      <div className="apropos">
        <p className="footer-title">A propos</p>
        <p>
          Ce site utilise l’API Jikan. Il a été créé pour mon projet de fin
          d’année en développement web. Il est destiné à une utilisation
          personnelle.
        </p>
      </div>
      <div>
        <button onClick={scrollToTop}>
          <img src={arrowtop} alt="" />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
