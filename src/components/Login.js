import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import luffy from "../images/luffy.png";
import closeRound from "../images/closeRound.svg";
import upload from "../images/upload.svg";

const Login = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/login", {
        email: email,
        password: password,
      });
      console.log("Réponse du serveur :", response.data); // Ajout de cette ligne pour déboguer
      if (response.data.token && response.data._id) {
        localStorage.setItem("userId", response.data._id);
        localStorage.setItem("userToken", response.data.token);
        setShowSuccessMessage(true);
        setTimeout(() => {
          onClose();
        }, 5000);
        navigate("/");
      } else {
        alert("Une erreur est survenue, veuillez réessayer.");
      }
    } catch (error) {
      console.log(error);
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 400)
      ) {
        setErrorMessage("Email or password invalid");
      } else {
        setErrorMessage("An error occurred. Please try again.");
      }
    }
  };

  return isOpen ? (
    <div className="modal-background">
      <div className="modal-content">
        {showSuccessMessage ? (
          <div className="modal-success-message">
            <h2>Hello!</h2>
            <p>Connexion réussie, retour sur la page d'accueil.</p>
          </div>
        ) : (
          <div className="modal-form">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
              <label htmlFor="email">Email</label>
              <input
                type="text"
                name="email"
                placeholder="Saisissez votre email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit">Se connecter</button>
            </form>

            <p>
              Pas encore de compte? <a href="">Créer un compte</a>
            </p>
            <p
              style={{
                fontSize: "12px",
                color: "#FF4655",
                padding: "5px 0px 10px 0px",
                marginBottom: "10%",
              }}
            >
              {errorMessage}
            </p>
          </div>
        )}
        <div className="modal-picture">
          <img src={closeRound} alt="Close" onClick={onClose} />
          <img src={luffy} alt="Luffy" />
        </div>
      </div>
    </div>
  ) : null;
};

export default Login;
