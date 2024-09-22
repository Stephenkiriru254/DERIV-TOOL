import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const CandleIntervalDropdown = ({ value, onChange }) => {
  const intervals = [
    { value: '60', label: '1 minute' },
    { value: '120', label: '2 minutes' },
    { value: '300', label: '5 minutes' },
    { value: '600', label: '10 minutes' },
    { value: '900', label: '15 minutes' },
    { value: '1800', label: '30 minutes' },
    { value: '3600', label: '1 hour' },
    { value: '7200', label: '2 hours' },
    { value: '14400', label: '4 hours' },
    { value: '28800', label: '8 hours' },
    { value: '86400', label: '1 day' }
  ];

  return (
    <FormControl fullWidth>
      <InputLabel id="candle-interval-label">Candle Interval</InputLabel>
      <Select
        labelId="candle-interval-label"
        id="candle-interval-select"
        value={value}
        label="Candle Interval"
        onChange={onChange}
      >
        {intervals.map((interval) => (
          <MenuItem key={interval.value} value={interval.value}>
            {interval.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CandleIntervalDropdown;
