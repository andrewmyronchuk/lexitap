import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const Practice = () => {
  const queryClient = useQueryClient();
  const { data } = useQuery({ queryKey: ['user'] });
  const [randomWordPair, setRandomWordPair] = useState({});
  const [userAnswer, setUserAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);

  const pickRandomWordPair = () => {
    const availableWords = data.words.filter((word) => {
      return word.sourceToTargetProgress < 100 || word.targetToSourceProgress < 100;
    });

    if (availableWords.length === 0) {
      return null;
    }

    const randomIndex = Math.floor(Math.random() * availableWords.length);
    const wordPair = availableWords[randomIndex];

    let sourceToTarget;
    if (wordPair.sourceToTargetProgress < 100 && wordPair.targetToSourceProgress < 100) {
      sourceToTarget = Math.random() < 0.5;
    } else if (wordPair.sourceToTargetProgress < 100) {
      sourceToTarget = true;
    } else {
      sourceToTarget = false;
    }
    return { wordPair, sourceToTarget };
  }

  useEffect(() => {
    const randomWordPair = pickRandomWordPair();
    setRandomWordPair(randomWordPair);
  }, []);

  const handleNextClick = () => {
    setIsCorrect(null);
    setUserAnswer('');
    const randomWordPair = pickRandomWordPair();
    setRandomWordPair(randomWordPair);
  }

  const updateProgressMutation = useMutation({
    mutationFn: async ({ wordId, direction }) => {
      const response = await axios.patch(`/api/words/${wordId}/progress`, { direction });
      return response.data;
    },
    onSuccess: (updatedWord) => {
      queryClient.setQueryData(['user'], (oldData) => {
        const updatedWords = oldData.words.map((word) => {
          if (word._id === updatedWord._id) {
            return updatedWord;
          }
          return word;
        });
        return { ...oldData, words: updatedWords };
      });
    }
  });

  const handleCheckClick = () => {
    const correctAnswer = randomWordPair.sourceToTarget ? randomWordPair.wordPair.translation : randomWordPair.wordPair.word;
    if (userAnswer === correctAnswer) {
      setIsCorrect(true);
      updateProgressMutation.mutate({
        wordId: randomWordPair.wordPair._id,
        direction: randomWordPair.sourceToTarget ? 'sourceToTarget' : 'targetToSource'
      })
    } else {
      setIsCorrect(false);
    }
  };

  return (
    <div className="practice-container">
      <h3>Practice</h3>
      {
        randomWordPair === null && (
          <p>You have learned all words!</p>
        )
      }
      {
        randomWordPair?.wordPair && (
          <p className="practice-word">{randomWordPair.sourceToTarget ? randomWordPair.wordPair.word : randomWordPair.wordPair.translation}</p>
        )
      }
      <label>
        <input type="text" placeholder="Enter translation" value={userAnswer} onChange={(e) => setUserAnswer(e.target.value)} className={`practice-label ${isCorrect === true ? 'input-correct' : isCorrect === false ? 'input-incorrect' : ''} `} />
      </label>
      {
        isCorrect === true && <p className="msg-correct">Correct!</p>
      }
      {
        isCorrect === false && (
          <>
          <p className="msg-incorrect">Incorrect</p>
          <p className="correct-answer">Correct answer is: <span className="practice-word-correct">{randomWordPair.sourceToTarget ? randomWordPair.wordPair.translation : randomWordPair.wordPair.word}</span></p>
          </>
        )
      }
      <div className="practice-btns">
        <button onClick={handleCheckClick} className="btn-check">Check</button>
        <button onClick={handleNextClick}>Next</button>
      </div>
    </div>
  )
};

export default Practice;