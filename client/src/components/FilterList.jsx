import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FilterList = ({ token, setSongs }) => {
  const filters = ['Thinkin bout death', 'Chewing on a piece of straw', 'Lost your fair maiden',];

  const handleFilterClick = (filter) => {
    axios.post('/classes/spotify/filter', {
      token,
      filterName: filter,
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        console.log(response.data);
        setSongs(response.data);
      })
      .catch((err) => {
        console.error('Error loading songs', err);
      });
  };

  return (
    <div className='filter-list-container'>
      <div className='filter-list'>
        {filters.map((filter, index) => (
          <button className='filter-button' key={index} onClick={() => handleFilterClick(filter)}>
            {filter}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterList;
