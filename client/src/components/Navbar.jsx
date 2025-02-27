import React from 'react';
import { useQuery } from '@tanstack/react-query';

const Navbar = ({setShowDictionary, setShowPractice}) => {
  const { data } = useQuery({ queryKey: ['user'] });

  return (
    <nav className="navbar">
      <div>
        <h1>LexiTap</h1>
      </div>
      <ul className="nav-links">
        <li>
          <button className="btn-link" onClick={() => {setShowDictionary(false); setShowPractice(false)}}>My book excerpts <span className="bg-stat">({data.excerpts.length})</span></button>
        </li>
        <li>
          <button className="btn-link" onClick={() => setShowDictionary(true)}>My dictionary <span className="bg-stat">({data.words.length})</span></button>
        </li>
      </ul>
      {
        data && <p className="welcome">Welcome, <span className="name">{data.firstName}</span></p>
      }
    </nav>
  );
};

export default Navbar;
