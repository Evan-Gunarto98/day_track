import React from 'react';
import { Box, Typography, Link } from '@mui/material';
import { styled } from '@mui/system';

const StyledFooter = styled(Box)(({ theme }) => ({
  backgroundColor: '#202020', // Dark background color
  color: '#fff', // Text color
  padding: theme.spacing(3),
  textAlign: 'center',

}));

const StyledLink = styled(Link)(({ theme }) => ({
  color: '#fff',
  textDecoration: 'none',
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
