import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const CreateNewUserForm = () => {
  const [firstName, setFirstName] = useState('');
  const queryClient = useQueryClient();

  const createUser = async (newUser) => {
    const response = await axios.post('/api/users', newUser);
    return response.data;
  }

  const mutataion = useMutation({
    mutationFn: createUser,
    onSuccess: (data) => {
      console.log('User created:', data);
      queryClient.setQueryData(['user'], data);
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!firstName) {
      return;
    }
    mutataion.mutate({ firstName });
  };

  return (
    <div>
      <h1 className="welcome-title">Welcome to LexiTap!</h1>
      <h3>In order to use this app you need to create a temporary account.</h3>
      <form className="create-account-form" onSubmit={handleSubmit}>
        <label>
          First Name:
          <input type="text" placeholder="John" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        </label>
        <button disabled={mutataion.isLoading}>{mutataion.isLoading ? 'Loading...' : 'Create Account'}</button>
      </form>
    </div>
  )
}

export default CreateNewUserForm;