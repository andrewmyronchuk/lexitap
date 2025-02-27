import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import Navbar from './Navbar.jsx';
import Sidebar from './Sidebar.jsx';
import MainScreen from './MainScreen.jsx';
import Dictionary from './Dictionary.jsx';
import Practice from './Practice.jsx';

const AppLayout = () => {
  const { data } = useQuery({ queryKey: ['user'] });
  const [selectedExcerpt, setSelectedExcerpt] = useState(null);
  const [showDictionary, setShowDictionary] = useState(false);
  const [showPractice, setShowPractice] = useState(false);

  useEffect(() => {
    console.log(data.excerpts);
    if (data.excerpts.length > 0) {
      setSelectedExcerpt(data.excerpts[0]);
    }
  }, [data?.excerpts]);

  return (
    <>
      <Navbar setShowDictionary={setShowDictionary} setShowPractice={setShowPractice} />
      <section className="main">
        {
          showDictionary ? (
            <Dictionary setShowPractice={setShowPractice} setShowDictionary={setShowDictionary} />
          ) : showPractice ? (
              <Practice />
          ) : (
            <>
              <Sidebar selectedExcerpt={selectedExcerpt} setSelectedExcerpt={setSelectedExcerpt} />
              <MainScreen selectedExcerpt={selectedExcerpt} />
            </>
          )
        }
      </section>
    </>
  )
}

export default AppLayout;