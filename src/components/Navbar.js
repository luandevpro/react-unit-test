import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { auth, googleAuthProvider } from '../lib/firebase';

export default function Navbar({ currentUser }) {
  const handleLogin = () => {
    auth.signInWithPopup(googleAuthProvider);
  };
  const handleLogout = () => {
    auth.signOut().then(() => {
      window.location.reload();
    });
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="/">
        Firestore
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarText"
        aria-controls="navbarText"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarText">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link className="nav-link" to="/">
              Home <span className="sr-only">(current)</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/post/new">
              New Post
            </Link>
          </li>
        </ul>
        {currentUser ? (
          <span className="navbar-text">
            <span className="navbar-text">{currentUser.displayName}</span>
            <span className="navbar-text ml-5" onClick={handleLogout}>
              Logout
            </span>
          </span>
        ) : (
          <span className="navbar-text" onClick={handleLogin}>
            Login
          </span>
        )}
      </div>
    </nav>
  );
}

Navbar.propTypes = {
   currentUser: PropTypes.object, // eslint-disable-line
};
