import React from 'react';
import PropTypes from 'prop-types';
import { Card,Box, CardContent, Typography, CardMedia, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const BasicCard = ({ title, description, imageUrl, link }) => {
  return (
    <Card sx={{ height: '100%' }}>
      <CardMedia component="img" image={imageUrl} alt={title} height="140" />
      <CardContent>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <Box sx={{marginLeft: {xs: 9}, marginBottom: {xs: 2}}}>
      <Button size='small' component={Link} to={link} variant="contained">
        Learn More
      </Button>
      </Box>
    </Card>
  );
};

BasicCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default BasicCard;
