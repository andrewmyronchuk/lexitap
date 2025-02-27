import React from 'react';

const ExcerptsTitlesListItem = ({ excerpt, selectedExcerpt, setSelectedExcerpt }) => {
  return (
    <li className={selectedExcerpt && selectedExcerpt._id === excerpt._id ? 'sidebar-li-selected' : ''}>
      <button className="btn-link" onClick={() => setSelectedExcerpt(excerpt)}>
        {excerpt.title}
      </button>
    </li>
  );
};

export default ExcerptsTitlesListItem;