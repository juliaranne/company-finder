import React from 'react';
import '../styles/select_list.scss';

const SelectList = ({ listValues, name, handleSelection }) => {
  return (
    <ul className="company-finder__list">
      {listValues.map((item) => <li onClick={() => handleSelection(name, item)} key={item}>{item}</li>)}
    </ul>
  )
}

export default SelectList