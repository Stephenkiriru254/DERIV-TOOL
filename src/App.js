import React, { useState, useEffect, useCallback } from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Login from './Login';
import ProbabilityOscillator from './ProbabilityOscillator';
import MarketDropdown from './MarketDropdown';
import VolatilitiesDropdown from './VolatilitiesDropdown';
import DigitsDropdown from './DigitsDropdown';
import { Grid } from '@mui/material';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  const [user, setUser] = useState(null);
  const [market, setMarket] = useState('');
  const [digit, setDigit] = useState('');
  const [volatility, setVolatility] = useState('');

  useEffect(() => {
    // Check for existing session
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = (username) => {
    const userData = { username };
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = async () => {
    try {
      const deviceId = localStorage.getItem('deviceId');
      await fetch('http://localhost:3001/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: user.username, deviceId }),
      });
    } catch (error) {
      console.error('Logout failed', error);
    }
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('deviceId');
  };

  const handleMarketChange = useCallback((value) => setMarket(value), []);
  const handleDigitChange = useCallback((value) => setDigit(value), []);
  const handleVolatilityChange = useCallback((value) => setVolatility(value), []);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box sx={{ padding: '20px' }}>
        {user ? (
          <>
            <Typography variant="h4" component="h1" gutterBottom>
              Deriv Analysis Tool
            </Typography>
            <Button onClick={handleLogout} sx={{ mb: 2 }}>Logout</Button>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 2 }}>
                  <MarketDropdown onChange={handleMarketChange} />
                  <DigitsDropdown onChange={handleDigitChange} />
                  <VolatilitiesDropdown onChange={handleVolatilityChange} />
                </Box>
              </Grid>
              <Grid item xs={12} md={8}>
                <ProbabilityOscillator market={market} digit={digit} volatility={volatility} />
              </Grid>
            </Grid>
          </>
        ) : (
          <Login onLogin={handleLogin} />
        )}
      </Box>
    </ThemeProvider>
  );
}

export default App;
