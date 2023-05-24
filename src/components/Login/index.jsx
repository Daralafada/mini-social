import React, { useState } from "react";
import { useAtomValue, useSetAtom } from 'jotai';
import { isLogAtom, currentUserNameAtom, currentUserMailAtom, currentUserIdAtom } from '../../Atom/atom';
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

export default function Login() {
  const isLog = useAtomValue(isLogAtom);
  const setIsLog = useSetAtom(isLogAtom);
  const setCurrentUserName = useSetAtom(currentUserNameAtom);
  const setCurrentUserMail = useSetAtom(currentUserMailAtom);
  const setCurrentUserId = useSetAtom(currentUserIdAtom);

  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:1337/api/auth/local", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.jwt ?? false) {
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
          });
      });
  };

  return (
    <>
      {isLog ? (
        <Navigate to="/" replace />
      ) : (
        <div className="register-form">
          <div className="fields">
            <form action="" onSubmit={handleSubmit}>
              <div className="email">
                <input
                  type="text"
                  name="identifier"
                  placeholder="identifiant"
                  value={formData.identifier}
                  onChange={handleChange}
                />
              </div>
              <div className="password">
                <input
                  type="password"
                  name="password"
                  placeholder="mot de passe"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <button className="signin-button" type="submit">Se Connecter</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
