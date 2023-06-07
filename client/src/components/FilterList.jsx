import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FilterList = ({ token, setSongs }) => {
  const filters = ['Thinkin bout death'];

  const handleFilterClick = (filter) => {
    axios.post('/classes/spotify/filters', {
      token,
      filterName: filter,
    })
      .then((response) => {
        setSongs(response.data);
      })
      .catch((err) => {
        console.error('Error loading songs', err);
      });
  };

  return (
    <div className='filter-list'>
      {filters.map((filter, index) => (
        <button key={index} onClick={() => handleFilterClick(filter)}>
          {filter}
        </button>
      ))}
    </div>
  );
};

export default FilterList;
