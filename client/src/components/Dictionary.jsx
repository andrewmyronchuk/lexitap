import React from 'react';
import { useQuery } from '@tanstack/react-query';

const Dictionary = ({ setShowDictionary, setShowPractice }) => {
  const { data } = useQuery({ queryKey: ['user'] });

  const handlePracticeClick = () => {
    setShowDictionary(false);
    setShowPractice(true);
  };

  return (
    <div className="dictionary-nav">
      <div className="dictionary">
          <h3>Dictionary</h3>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Word</th>
              <th>Translation</th>
              <th>Excerpt</th>
              <th>Progress</th>
            </tr>
          </thead>
          <tbody>
            {
              data.words.map((word, i) => {
                const wordProgress = (word.sourceToTargetProgress + word.targetToSourceProgress) / 2;
                return (
                  <tr key={word._id}>
                    <td>{i + 1}</td>
                    <td>{word.word}</td>
                    <td>{word.translation}</td>
                    <td>{data.excerpts.find((excerpt) => excerpt._id === word.excerptId).title}</td>
                    <td className={wordProgress < 50 ? 'progress-red' : wordProgress < 100 ? 'progress-yellow' : 'progress-green'}>{wordProgress}%</td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
      <button className="btn-practice" onClick={handlePracticeClick}>Practice words</button>
    </div>
  );
}

export default Dictionary;