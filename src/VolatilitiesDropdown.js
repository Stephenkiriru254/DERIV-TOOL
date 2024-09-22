import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const VolatilitiesDropdown = ({ onChange }) => {
  const volatilities = [
    { value: '10', label: 'Volatility 10 (1s) Index' },
    { value: '10_daily', label: 'Volatility 10 Index' },
    { value: '25', label: 'Volatility 25 (1s) Index' },
    { value: '25_daily', label: 'Volatility 25 Index' },
    { value: '50', label: 'Volatility 50 (1s) Index' },
    { value: '50_daily', label: 'Volatility 50 Index' },
    { value: '75', label: 'Volatility 75 (1s) Index' },
    { value: '75_daily', label: 'Volatility 75 Index' },
    { value: '100', label: 'Volatility 100 (1s) Index' },
    { value: '100_daily', label: 'Volatility 100 Index' },
    { value: '150', label: 'Volatility 150 (1s) Index' },
    { value: '150_daily', label: 'Volatility 150 Index' },
    { value: '200', label: 'Volatility 200 (1s) Index' },
    { value: '200_daily', label: 'Volatility 200 Index' },
    { value: '250', label: 'Volatility 250 (1s) Index' },
    { value: '250_daily', label: 'Volatility 250 Index' },
  ];

  const MenuProps = {
    PaperProps: {
      style: {
        backgroundColor: '#424242',
        maxHeight: 300, // Limit the height of the dropdown
      },
    },
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="volatility-select-label" sx={{ color: 'white' }}>Volatility</InputLabel>
      <Select
        labelId="volatility-select-label"
        id="volatility-select"
        label="Volatility"
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
        {volatilities.map((vol) => (
          <MenuItem key={vol.value} value={vol.value}>
            {vol.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default VolatilitiesDropdown;
