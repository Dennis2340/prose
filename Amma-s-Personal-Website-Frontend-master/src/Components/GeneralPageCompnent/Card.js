import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/system';

const StyledCard = styled(Card)(
  ({ theme }) => ({
    width: '100%',
    height: '100%',
    textAlign: 'center',
    maxWidth: 500,
    margin: 'auto',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
    transition: '0.3s',
    '&:hover': {
      boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
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

const PoemCard = ({poem}) => {
  return (
    <StyledCard sx={{ marginTop: 4,}}>
      <StyledCardContent>
        <Typography variant="h5" color="textSecondary">
          {poem.poemTitle}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {poem.poemGenre}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {poem.poemDetails?.substring(0, 40) + '...'}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {poem.poemAuthor ? `by ${poem.poemAuthor}` : 'Unknown Author'}
        </Typography>
        <StyledButton
          component={Link}
          to={`/singlepoem/${poem._id}`}
          variant="outlined"
          color="primary"
        >
          View
        </StyledButton>
      </StyledCardContent>
    </StyledCard>
  );
};

export default PoemCard;
