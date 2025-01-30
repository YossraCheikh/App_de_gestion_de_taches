import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleLoginSubmit = (e) => {
    e.preventDefault();

    if (email && password) {
      navigate("/page1");
    } else {
      alert("Veuillez remplir tous les champs correctement.");
    }
  };

  return (
    <div className="login-container">
      <header className="head">
        <img src="1.png" alt="logo" />
        <h1>Organizer</h1>
      </header>

      <form onSubmit={handleLoginSubmit}>  
        <label id="h1" htmlFor="connection">CONNECTION</label>

        <div className="input-container">
          <i className="fa fa-envelope"></i>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="input-container">
          <i className="fa fa-lock"></i>
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>


      <div>
        <button type="submit">Se connecter</button>
      </div>
        <div>
          <a href="/signUp" >Vous n'avez pas de compte? Signez-vous</a>
        </div>
      </form>

      <style>
      {`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: Times New Roman;
          background-color: #f8f0f8;
          color: #4a4a4a;
        }

        .login-container {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background: linear-gradient(135deg, #f9c5d1, #f1b2db);
          padding: 20px;
        }

        .head {
          text-align: center;
          margin-bottom: 40px;
          border: none;
          background: none;
          box-shadow: none;

        }

        .head img {
          width: 100px;
          margin-bottom: 10px;
        }

        .head h1 {
          font-size: 50px;
          letter-spacing: 2px;
          font-weight: bold;
        }

        form {
          display: flex;
          flex-direction: column;
          gap: 20px;
          width: 100%;
          max-width: 320px;
          background-color: #ffffff;
          border-radius: 10px;
          padding: 30px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }

        label {
          font-size: 25px;
          font-weight: 600;
          color: #ff66b2;
          margin-bottom: 10px;
          text-align: center;
        }

        .input-container {
          position: relative;
          width: 100%;

        }

        .input-container input {
          width: 100%;
          padding: 12px 15px;
          font-size: 16px;
          border-radius: 8px;
          border: 2px solid #ff66b2;
          outline: none;
          margin-top: 5px;
          font-family: Times New Roman;

        }

        .input-container input:focus {
          border-color: #ff3385;
        }

        .input-container i {
          position: absolute;
          top: 20px;
          left: 230px;
          color: #ff66b2;
          font-size: 18px;
        }

        button {
          padding: 12px;
          font-size: 16px;
          background-color: #ff66b2;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-weight: bold;
          transition: background-color 0.3s ease;
          font-family: Times New Roman;
          margin-left:70px;

        }

        button:hover {
          background-color: #ff3385;
        }

        a {
          font-size: 14px;
          text-align: center;
          color: #ff66b2;
          text-decoration: none;
          transition: color 0.3s ease;
        }

        a:hover {
          color: #ff3385;
        }

        footer {
          position: absolute;
          bottom: 20px;
          width: 100%;
          text-align: center;
          font-size: 14px;
          color: #999;
        }

        footer a {
          color: #ff66b2;
          text-decoration: none;
        }

        footer a:hover {
          color: #ff3385;
        }
      `}
      </style>

    </div>
  );
}
