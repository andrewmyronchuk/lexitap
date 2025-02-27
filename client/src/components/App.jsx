import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import AppLayout from './AppLayout.jsx';
import CreateNewUserForm from './CreateNewUserForm.jsx';
import Loader from './Loader.jsx';

const fetchUser = async () => {
  const response = await axios.get('/api/users');
  return response.data;
};

const App = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['user'],
    queryFn: fetchUser,
    retry: false
  });

  if (isLoading) {
    return <Loader />;
  }

  if (error && error?.response?.status !== 401) {
    console.error(error);
  }

  return (
    <div className="app-container">
      {
        data ? <AppLayout /> : <CreateNewUserForm />
      }
    </div>
  );
}

export default App;