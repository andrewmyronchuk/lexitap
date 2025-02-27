import React, { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { XMarkIcon } from '@heroicons/react/24/outline'

const languages = [{code: 'ES', name: 'Spanish'}, {code: 'PT-BR', name: 'Portuguese (Brazilian)'}, {code: 'RU', name: 'Russian'}, {code: 'UK', name: 'Ukrainian'}, {code: 'ZH-HANS', name: 'Chinese (simplified)'}, {code: 'ZH-HANT', name: 'Chenese (Traditional)'}];

const MainScreen = ({ selectedExcerpt }) => {
  const [selectedWord, setSelectedWord] = useState(null);
  const [dialogPosition, setDialogPosition] = useState({ x: 0, y: 0 });
  const [translation, setTranslation] = useState('');
  const [isLoadingtranslation, setIsLoadingTranslation] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [targetLang, setTargetLang] = useState('PT-BR');

  const queryClient = useQueryClient();
  const currentUser = queryClient.getQueryData(['user']);
  const userId = currentUser._id;

  const fetchTranslation = async (word) => {
    try {
      setIsLoadingTranslation(true);
      const response = await axios.post('/api/translations', {
        text: word,
        targetLang: targetLang
      });

      setTranslation(response.data.translations[0].text);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoadingTranslation(false);
    }
  }

  const handleWordClick = (word, index, e) => {
    setSuccessMsg('');
    setIsLoadingTranslation(false);
    const rect = e.target.getBoundingClientRect();
    setDialogPosition({ x: rect.x + rect.width, y: rect.y });
    setSelectedWord({ word, index });
    fetchTranslation(word);
  };

  const handleCloseDialogClick = () => {
    setSelectedWord(null);
    setDialogPosition({ x: 0, y: 0 });
    setTranslation('');
    setIsLoadingTranslation(false);
    setSuccessMsg('');
  };

  const addToDictionary = async (word) => {
    try {
      const response = await axios.patch(`/api/users/${userId}/dictionary`, word);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const mutataion = useMutation({
      mutationFn: addToDictionary,
      onSuccess: (data) => {
        console.log('User updated:', data);
        setSuccessMsg('The word has been added to your dictionary.');
        queryClient.setQueryData(['user'], data);
      }
  });

  const handleAddToDictionary = () => {
    const newWord = {
      word: selectedWord.word,
      translation,
      excerptId: selectedExcerpt._id
    };
    mutataion.mutate(newWord);
  };

  if (selectedExcerpt === null) {
    return (
      <p className="notification">Please, add your first excerpt.</p>
    )
  }

  const text = selectedExcerpt.content;
  const wordRegex = /\b[a-zA-Z]+(?:-[a-zA-Z]+)*\b/g;

  let lastIndex = 0;
  const parts = [];

  text.replace(wordRegex, (word, index) => {
    parts.push(text.slice(lastIndex, index));

    parts.push(<span key={index} className={`selected-word ${selectedWord?.index === index ? 'highlighted' : ''}`} onClick={(e) => handleWordClick(word, index, e)}>{word}</span>);

    lastIndex = index + word.length;
  });
  parts.push(text.slice(lastIndex));

  return (
    <div className="reader-container">
      <div className="select-target-lang-container">
        <p>Translate into:</p>
        <select className="select-target-lang" value={targetLang} onChange={(e) => setTargetLang(e.target.value)}>
          {
            languages.map((lang) => (
              <option key={lang.code} value={lang.code}>{lang.name}</option>
            ))
          }
        </select>
      </div>

      <h3 className="reader-title">{selectedExcerpt.title}</h3>
      <p className="reader-content">
        {parts}
      </p>
      {
        selectedWord && (
          <div className="word-dialog" style={{ top: `${dialogPosition.y - 39}px`, left: `${dialogPosition.x}px` }}>
            {
              successMsg ? (
                <p className="success-msg-dialog">{successMsg}</p>
              ) : (
                <>
                  <p className="dialog-translation">{isLoadingtranslation ? 'Loading...' : translation}</p>
                  <button className="btn-add-to-dictionary" disabled={isLoadingtranslation} onClick={handleAddToDictionary}>Add to dictionary</button>
                </>
              )
            }
            <div className="btn-close-dialog-wrapper">
              <button className="btn-close-dialog" onClick={handleCloseDialogClick}>
                <XMarkIcon className="size-6 text-blue-500" />
              </button>
            </div>
          </div>
        )
      }
    </div>
  )
};

export default MainScreen;