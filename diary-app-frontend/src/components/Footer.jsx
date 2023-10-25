import React from 'react';
import { Box, Typography, Link } from '@mui/material';
import { styled } from '@mui/system';

const StyledFooter = styled(Box)(({ theme }) => ({
  background: '#272829', // Dark background color
  color: '#FFF6E0', // Text color
  padding: theme.spacing(3),
  textAlign: 'center',

}));

const StyledLink = styled(Link)(({ theme }) => ({
  color: '#331D2C',
  textDecoration: 'none',
  background:'#272829',
  '&:hover': {
    textDecoration: 'underline',
    color:'red'
  },
}));

const Footer = () => {
  return (
    <StyledFooter component="footer">
      <Typography variant="body2">
        &copy; {new Date().getFullYear()} DayTrack. All rights reserved.
      </Typography>
      <Typography variant="body2">
       
        <StyledLink
          href="https://www.example.com"
          target="_blank"
          rel="noopener noreferrer"
        >
        
        </StyledLink>
      </Typography>
      <Typography>

      </Typography>
    </StyledFooter>
  );
};

export default Footer;
