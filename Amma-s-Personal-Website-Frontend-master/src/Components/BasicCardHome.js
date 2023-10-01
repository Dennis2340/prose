import React from 'react';
import PropTypes from 'prop-types';
import { Card,Box, CardContent, Typography, CardMedia, Button } from '@mui/material';
import { styled } from '@mui/system';

const StyledCard = styled(Card)(
  ({ theme }) => ({
    width: '100%',
    height: '100%',
    maxWidth: 500,
    margin: 'auto',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
    transition: '0.3s',
    '&:hover': {
      boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.2)',
    },
  })
);

const StyledCardContent = styled(CardContent)(
  ({ theme }) => ({
    padding: theme.spacing(2),
  })
);

const StyledButton = styled(Button)(
  ({ theme }) => ({
    marginTop: theme.spacing(3),
  })
);

const BasicCard = ({ title, description, imageUrl, handleClick }) => {
  return (
    <StyledCard sx={{ height: '100%' }}>
       {imageUrl ? (<CardMedia component="img" image={imageUrl} alt={title} height="140" />) : null}
      <StyledCardContent>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </StyledCardContent>
      <Box sx={{display: "flex", justifyContent: "center", alignContent: "center", marginBottom: {xs: 2} }}>
      <StyledButton size='small' onClick={handleClick}>
        Learn More
      </StyledButton>
      </Box>
    </StyledCard>
  );
};

BasicCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default BasicCard;
