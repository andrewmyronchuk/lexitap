import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const AddExcerptForm = () => {
  const [bookTitle, setBookTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const queryClient = useQueryClient();

  const currentUser = queryClient.getQueryData(['user']);
  const userId = currentUser._id;

  const addExcerpt = async (newExcerpt) => {
    console.log(newExcerpt, userId);
    const response = await axios.patch(`/api/users/${userId}/excerpts`, newExcerpt);
    return response.data;
  }

  const mutataion = useMutation({
      mutationFn: addExcerpt,
      onSuccess: (data) => {
        console.log('User updated:', data);
        setSuccessMsg('Excerpt added successfully. You can now close this form or add another excerpt.');
        queryClient.setQueryData(['user'], data);
      }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!bookTitle || !excerpt) {
      return;
    }
    mutataion.mutate({ title: bookTitle, content: excerpt });
    setBookTitle('');
    setExcerpt('');
    setSuccessMsg('');
  };

  return (
    <div className="modal-form-container">
      <form className="modal-form" onSubmit={handleSubmit}>
        {
          successMsg && <p className="success-msg">{successMsg}</p>
        }
        <h2>Add Excerpt</h2>
        <label className="modal-form-label">
          Book Title:
          <input type="text" placeholder="The Wonderful Wizard of Oz" value={bookTitle} onChange={(e) => setBookTitle(e.target.value)} />
        </label>
        <label>
          Excerpt:
          <textarea placeholder="Dorothy lived in the midst of the great Kansas prairies..." value={excerpt} onChange={(e) => setExcerpt(e.target.value)} />
        </label>
        <button>Add Excerpt</button>
      </form>
    </div>
  )
};

export default AddExcerptForm;
