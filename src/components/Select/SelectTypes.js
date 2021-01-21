import React from 'react';

import Select from 'react-select';


const options = [
    { value: 1, label: 'Italian' },
    { value: 2, label: 'Korean' },
    { value: 3, label: 'Mediteraian' },
    { value: 4, label: 'American BBQ' },
  ]

const groupStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
};
const groupBadgeStyles = {
  backgroundColor: '#EBECF0',
  borderRadius: '2em',
  color: '#172B4D',
  display: 'inline-block',
  fontSize: 12,
  fontWeight: 'normal',
  lineHeight: '1',
  minWidth: 1,
  padding: '0.16666666666667em 0.5em',
  textAlign: 'center',
};

const formatGroupLabel = data => (
  <div style={groupStyles}>
    <span>{data.label}</span>
    <span style={groupBadgeStyles}>{data.options.length}</span>
  </div>
);

export default () => (
  <Select
    defaultValue={options[0]}
    options={options}
    formatGroupLabel={formatGroupLabel}
    name='restaurant_type'
  />
);