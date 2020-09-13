import React from 'react';
import '../styles/select_list.scss';

const SelectList = ({ listValues }) => {
  return (
    <ul className="company-finder__list">
      {listValues.map((item) => <li key={item}>{item}</li>)}
    </ul>
  )
}

export default SelectList