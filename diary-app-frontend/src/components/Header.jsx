import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { styled } from '@mui/system';
import {Link} from 'react-router-dom';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: '#202020', // Dark background color
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  flexGrow: 1,
  fontWeight: 'bold',
  letterSpacing: '2px',
  // fontFamily: 'inherit',
 color:'white'
}));

const Header = () => {
  return (
    <StyledAppBar position="dynamic">
      <Toolbar>
        <StyledTypography variant="h6" component="h1">
          <Link to='/' style={{ textDecoration: 'none', color: 'inherit'}}>
            DayTrack
          </Link>
          
        </StyledTypography>
        <div style={{ marginLeft: 'auto' }}>
          <Link to="/register" style={{ textDecoration: 'none', color: 'inherit', marginRight:'10px' }}>
            {/* Gallery     */}
          </Link>
          <Link to="/login" style={{ textDecoration: 'none', color: 'inherit', marginRight: '10px' }}>
            {/* Login */}
          </Link>
          <Link to="/register" style={{ textDecoration: 'none', color: 'inherit' }}>
            {/* Register */}
          </Link>
        
          {/* Add other links here to navigate to other pages */}
        </div>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Header;
