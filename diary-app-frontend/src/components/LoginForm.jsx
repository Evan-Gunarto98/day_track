import React, { useState } from 'react';
import { TextField, Button, Container, Grid } from '@mui/material';
import { styled } from '@mui/system';



const LoginForm = () => {
 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Perform login logic here, e.g., make an API call with axios
    console.log('Logging in with email:', email, 'and password:', password);
  };

  return (
    <Container maxWidth="sm" style={{
      height:'100vh',
      display:'flex',
      justifyContent:'center',alignItems:'center'
    ,flexDirection:'column',
    
    }}>
      
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <Grid container spacing={2} direction="column">
          <Grid item>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
          <Grid item>
            <Button type="submit" variant="contained" color="primary">
              Login
            </Button>
          </Grid>
        </Grid>
      </form>

    </Container>
  );
};


export default LoginForm;