import React from 'react';

const SelectList = (props) => props.countries.map((country) => <h1>{country}</h1>)

export default SelectList