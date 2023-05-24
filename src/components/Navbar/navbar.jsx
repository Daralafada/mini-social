import React from 'react'
import {Link} from 'react-router-dom';
import { isLogAtom, currentUserNameAtom } from "../../atom/atom";
import { useAtomValue } from 'jotai';

export const Navbar = () => {
  const isLog = useAtomValue(isLogAtom);
  const currentUserName = useAtomValue(currentUserNameAtom);

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Accueil</Link>
        </li>
        {isLog ? (
          <>
            <li>
              <Link to="/profile">Editer le profil</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/register">S'inscrire</Link>
            </li>
            <li>
              <Link to="/login">Connexion</Link>
            </li>
          </>
        )}
      </ul>
      {isLog ? (
        <>
          <div>
            <p>Hello {currentUserName}</p>
          </div>
          <div>
            <Link to="/logout">Deconnexion</Link>
          </div>
        </>
      ) : null}
    </nav>
  );
};
