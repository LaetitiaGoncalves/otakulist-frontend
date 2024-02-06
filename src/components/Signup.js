import { useState } from "react";
import axios from "axios";
import luffy from "../images/luffy.png";
import closeRound from "../images/closeRound.svg";

const Signup = ({ isOpen, onClose }) => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }
    const formData = new FormData();
    formData.append("avatar", avatar);
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    try {
      if (email && username && password && avatar) {
        const response = await axios.post(
          "http://localhost:3001/signup",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response.data) {
          onClose();
        }
      } else {
        setErrorMessage("Please fill in all fields.");
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setErrorMessage("This email already exists.");
      } else {
        setErrorMessage("An error occurred. Please try again later.");
      }
    }
  };

  return isOpen ? (
    <div className="modal-background">
      <div className="modal-content">
        <div className="modal-form">
          <h2>Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              placeholder="Saisissez votre username"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
            />
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
            <label htmlFor="confirmPassword">Confirm password</label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Confirm password..."
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {password === confirmPassword ? (
              ""
            ) : (
              <p
                style={{
                  fontSize: "12px",
                  color: "#FF4655",
                  padding: "5px 0px 10px 0px",
                }}
              >
                Passwords did not match
              </p>
            )}
            <div className="addPhoto">
              {avatar ? (
                <>
                  <label>
                    <input
                      type="file"
                      style={{ display: "none" }}
                      onChange={(event) => {
                        setAvatar(event.target.files[0]);
                        setPreview(URL.createObjectURL(event.target.files[0]));
                      }}
                    />
                    Choose your Avatar
                  </label>

                  <img src={preview} alt="" style={{ width: "50px" }} />
                </>
              ) : (
                <p>No file selected</p>
              )}
            </div>
            <button type="submit">Créer un compte</button>
          </form>
          <p>
            Vous avez déjà un compte? <span>Se connecter</span>
          </p>
        </div>
        <div className="modal-picture">
          <img src={closeRound} alt="Close" onClick={onClose} />
          <img src={luffy} alt="Luffy" />
        </div>
        <p
          style={{
            fontSize: "12px",
            color: "#FF4655",
            padding: "5px 0px 10px 0px",
          }}
        >
          {errorMessage}
        </p>
      </div>
    </div>
  ) : null;
};

export default Signup;
