import React from 'react';
import { Container, Typography, Box, Link, Grid } from '@mui/material';

const Footer = () => {
  return (
    <footer>
      <Container>
        <Box mt={5} mb={2} sx={{ backgroundColor: 'primary.main', color: 'white', }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Box ml={9}>
              <Typography variant="h6" color="textPrimary">
                Quick Links
              </Typography>
              <Link color="inherit" href="/poems">
                Poems
              </Link>
              <br />
              <Link color="inherit" href="/motmsg">
                Motivational Speeches
              </Link>
              <br />
              <Link color="inherit" href="/articles">
                Articles
              </Link>
              <br />
              <Link color="inherit" href="/stories">
                Stories
              </Link>
              <br />
              <Link color="inherit" href="/videos">
                Videos
              </Link>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="h6" color="textPrimary">
                Contact Us
              </Typography>
              <Link color="inherit" href="/contact">
                Contact Information
              </Link>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="h6" color="textPrimary">
                About Us
              </Typography>
              <Link color="inherit" href="/about">
                Our Story
              </Link>
              <br />
              <Link color="inherit" href="/team">
                Our Team
              </Link>
            </Grid>
          </Grid>
        </Box>
        <Box  sx={{ backgroundColor: 'primary.main',marginTop: -2, color: 'white', textAlign: 'center' }}>
          <Typography variant="body2" color="textSecondary">
            &copy; {new Date().getFullYear()} Your App Name. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </footer>
  );
};

export default Footer;