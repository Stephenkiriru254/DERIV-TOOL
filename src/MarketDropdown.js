import React, { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const MarketDropdown = ({ onChange }) => {
  const [market, setMarket] = useState('');

  const handleChange = (event) => {
    setMarket(event.target.value);
    onChange(event.target.value);
  };

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
      <InputLabel id="market-select-label" sx={{ color: 'white' }}>Market</InputLabel>
      <Select
        labelId="market-select-label"
        id="market-select"
        value={market}
        label="Market"
        onChange={handleChange}
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
        <MenuItem value="Derived_Synthetics">Derived Synthetics</MenuItem>
        
      </Select>
    </FormControl>
  );
};

export default MarketDropdown;
