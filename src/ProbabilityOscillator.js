import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import GaugeChart from 'react-gauge-chart';
import CandleIntervalDropdown from './CandleIntervalDropdown';

const ProbabilityOscillator = React.memo(({ market, volatility, digit }) => {
  const [probability, setProbability] = useState(0.5);
  const [candleInterval, setCandleInterval] = useState('60'); // Default to 1 minute

  const updateProbability = useCallback(() => {
    let volatilityFactor;
    if (volatility.includes('_daily')) {
      volatilityFactor = (parseInt(volatility.split('_')[0]) / 100) * 1.43; // Increased by 30%
    } else {
      volatilityFactor = (parseInt(volatility) / 50) * 1.43; // Increased by 30%
    }
    
    const change = (Math.random() - 0.5) * 2 * volatilityFactor * 0.13;
    
    // Occasionally hit strong holds
    const strongHoldChance = Math.random();
    if (strongHoldChance < 0.1) {
      return setProbability(strongHoldChance < 0.05 ? 0 : 1);
    }
    
    setProbability(prev => {
      const newValue = prev + change;
      return Math.max(0, Math.min(1, newValue));
    });
  }, [volatility]);

  useEffect(() => {
    if (market && volatility && digit && candleInterval) {
      updateProbability();
      const intervalId = setInterval(updateProbability, 5000);

      return () => {
        clearInterval(intervalId);
      };
    } else {
      setProbability(0.5); // Reset to neutral when options are incomplete
    }
  }, [market, volatility, digit, candleInterval, updateProbability]);

  const handleCandleIntervalChange = (event) => {
    setCandleInterval(event.target.value);
  };

  const getLabelForProbability = useCallback((prob) => {
    const labels = {
      'rise_fall': ['Strong Fall', 'Fall', 'Neutral', 'Rise', 'Strong Rise'],
      'over_under': ['Strong Under', 'Under', 'Neutral', 'Over', 'Strong Over'],
      'even_odd': ['Strong Odd', 'Odd', 'Neutral', 'Even', 'Strong Even'],
      'matches_differs': ['Strong Differs', 'Differs', 'Neutral', 'Matches', 'Strong Matches']
    };

    const selectedLabels = labels[digit] || labels['even_odd'];

    if (prob < 0.25) return selectedLabels[0];
    if (prob < 0.45) return selectedLabels[1];
    if (prob < 0.55) return selectedLabels[2];
    if (prob < 0.75) return selectedLabels[3];
    return selectedLabels[4];
  }, [digit]);

  if (!market || !volatility || !digit || !candleInterval) {
    return (
      <Box sx={{ 
        width: '100%', 
        height: '450px',
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        border: '1px solid rgba(255, 255, 255, 0.23)', 
        padding: '20px',
        boxSizing: 'border-box',
      }}>
        <Typography variant="h6" align="center">
          Please select options from all dropdown menus to view the Probability Oscillator.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      width: '100%', 
      height: '450px',
      display: 'flex', 
      flexDirection: 'column',
      border: '1px solid rgba(255, 255, 255, 0.23)', 
      padding: '20px',
      boxSizing: 'border-box',
      overflow: 'hidden'
    }}>
      <Typography variant="h6" gutterBottom>Probability Oscillator</Typography>
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12}>
          <CandleIntervalDropdown value={candleInterval} onChange={handleCandleIntervalChange} />
        </Grid>
      </Grid>
      <Box sx={{ 
        flexGrow: 1, 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center', 
        justifyContent: 'center',
        position: 'relative',
        '& .gauge-chart': {
          width: '90%',
          height: '90%',
          maxWidth: '350px',
          maxHeight: '350px',
        },
        '& .gauge-chart text': {
          transform: 'scale(0.8)',
          transformOrigin: 'center',
        }
      }}>
        <GaugeChart 
          id="gauge-chart"
          nrOfLevels={20}
          percent={probability}
          colors={["#FF5F6D", "#FFC371", "#90EE90"]}
          arcWidth={0.3}
          textColor="#ffffff"
          formatTextValue={() => getLabelForProbability(probability)}
          className="gauge-chart"
        />
      </Box>
      <Typography align="center" variant="h6">Current State: {getLabelForProbability(probability)}</Typography>
    </Box>
  );
});

export default ProbabilityOscillator;