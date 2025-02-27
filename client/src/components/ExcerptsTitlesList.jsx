import React from 'react';

import ExcerptsTitlesListItem from './ExcerptsTitlesListItem.jsx';

const ExcerptsTitlesList = ({ excerpts, selectedExcerpt, setSelectedExcerpt }) => {
  return (
    <ul>
    {
      excerpts.map((excerpt) => (
        <ExcerptsTitlesListItem key={excerpt._id} excerpt={excerpt} selectedExcerpt={selectedExcerpt} setSelectedExcerpt={setSelectedExcerpt} />
      ))
    }
  </ul>
  )
};

export default ExcerptsTitlesList;