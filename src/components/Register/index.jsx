import React, { useState } from "react";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
import { useAtom, useSetAtom } from 'jotai';
import { isLogAtom, currentUserNameAtom, currentUserMailAtom, currentUserIdAtom } from '../../Atom/atom';

export default function Register() {
  const [formData, setFormData] = useState({});

  const [isLog, setIsLog] = useAtom(isLogAtom);
  const setCurrentUserName = useSetAtom(currentUserNameAtom);
  const setCurrentUserMail = useSetAtom(currentUserMailAtom);
  const setCurrentUserId = useSetAtom(currentUserIdAtom);

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:1337/api/auth/local/register", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
    .then((response) => response.json())
    .then((data) => {
      if (data.jwt) {
        Cookies.set('token', data.jwt);
        setIsLog(true);
      }
      
      fetch("http://localhost:1337/api/users/me", {
        method: "get",
        headers: {
          'Authorization': `Bearer ${data.jwt}`,
        }
      })
      .then((response) => response.json())
      .then((response) => {
        setCurrentUserName(response.username);
        setCurrentUserMail(response.email);
        setCurrentUserId(response.id);
      })
    })
  };

  return (
    <>
      {isLog ? (
        <Navigate to="/" replace />
      ) : (
        <div className="register-form">
          <div className="fields">
            <form onSubmit={handleSubmit}>
              <div className="email">
                <input
                  type="email"
                  name="email"
                  placeholder="Adresse Mail"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="password">
                <input
                  type="password"
                  name="password"
                  placeholder="Mot de Passe"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="username">
                <input
                  type="text"
                  name="username"
                  placeholder="Pseudo"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                />
              </div>                   
              <button className="register-button" type="submit">S'inscrire</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
