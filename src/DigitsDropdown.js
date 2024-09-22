import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const DigitsDropdown = ({ onChange }) => {
  const digits = [
    { value: 'rise_fall', label: 'Rise/Fall' },
    { value: 'over_under', label: 'Over/Under' },
    { value: 'even_odd', label: 'Even/Odd' },
    { value: 'matches_differs', label: 'Matches/Differs' },
  ];

  const MenuProps = {
    PaperProps: {
      style: {
        backgroundColor: '#424242',
        maxHeight: 300,
      },
    },
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="digits-select-label" sx={{ color: 'white' }}>Digits</InputLabel>
      <Select
        labelId="digits-select-label"
        id="digits-select"
        label="Digits"
        onChange={(e) => onChange(e.target.value)}
        MenuProps={MenuProps}
        sx={{
          color: 'white',
          '.MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(255, 255, 255, 0.23)',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(255, 255, 255, 0.23)',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'white',
          },
        }}
      >
        {digits.map((digit) => (
          <MenuItem key={digit.value} value={digit.value}>
            {digit.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default DigitsDropdown;
