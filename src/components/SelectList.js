import React from 'react';
import '../styles/select_list.scss';

const SelectList = ({ listValues, name, handleSelection, selectedItem }) => {
  return (
    <ul className="company-finder__list">
      {listValues.map((item) => <li className={`company-finder__list-item 
        ${selectedItem === item ? 'company-finder__list-item--selected' : ''}`} 
        onClick={() => handleSelection(name, item)} key={item}>{item}</li>
      )}
    </ul>
  )
}

export default SelectList