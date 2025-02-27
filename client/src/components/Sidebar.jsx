import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import Modal from './Modal.jsx';
import AddExcerptForm from './AddExcerptForm.jsx';
import ExcerptsTitlesList from './ExcerptsTitlesList.jsx';

const Sidebar = ({ selectedExcerpt, setSelectedExcerpt }) => {
  const { data } = useQuery({ queryKey: ['user'] });
  const [showAddNewExcerptForm, setShowAddNewExcerptForm] = useState(false);

  return (
    <aside className="sidebar">
      {
        showAddNewExcerptForm && (
          <Modal closeModalHandler={() => setShowAddNewExcerptForm(false)}>
            <AddExcerptForm />
          </Modal>
        )
      }
      <p className="sidebar-title">Book Excerpts</p>
      {
        data.excerpts.length > 0 && (
          <ExcerptsTitlesList excerpts={data.excerpts} selectedExcerpt={selectedExcerpt} setSelectedExcerpt={setSelectedExcerpt} />
        )
      }
      <button className="btn-add-excerpt" onClick={() => setShowAddNewExcerptForm(true)}>Add Excerpt</button>
    </aside>
  );
};

export default Sidebar;