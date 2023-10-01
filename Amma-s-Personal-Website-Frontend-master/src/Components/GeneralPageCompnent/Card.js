import React, { useContext } from 'react';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';
import { styled } from '@mui/system';
import { MyContext } from '../../Layout';

const StyledCard = styled(Card)(
  ({ theme }) => ({
    width: '100%',
    height: '100%',
    textAlign: 'center',
    minWidth: "auto",
    margin: 'auto',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
    transition: '0.3s',
    '&:hover': {
      boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
    },
    background: '#f9f9f9',
    border: '1px solid #ccc',
  })
);

const StyledCardContent = styled(CardContent)(
  ({ theme }) => ({
    padding: theme.spacing(2),
    '& .poem-title': {
      fontSize: '1.5rem',
      color: 'primary.main',
    },
    '& .poem-author': {
      fontSize: '1rem',
      fontStyle: 'italic',
      color: 'text.secondary',
    },
    '& .poem-details': {
      maxHeight: '200px', // Limit the max height of the poem details
      overflow: 'hidden',
      position: 'relative',
    },
    '& .poem-details-expand': {
      position: 'absolute',
      bottom: '0',
      right: '0',
      background: 'linear-gradient(transparent, #f9f9f9)', // Create a gradient fade effect
      padding: '8px',
    },
  })
);

const StyledButton = styled(Button)(
  ({ theme }) => ({
    marginTop: theme.spacing(3),
  })
);

const PoemCard = ({ poem, poemId }) => {
  const [active, setActive] = useContext(MyContext);

  const handleClick = (id) => {
    setActive('SinglePoem');
    poemId(id);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <StyledCard sx={{ marginTop: 4, marginBottom: 0}}>
      <StyledCardContent>
        <Typography variant="h5" className="poem-title">
          {poem.poemTitle}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {poem.poemGenre}
        </Typography>
        <Typography variant="body2" className="poem-details">
          {poem.poemDetails.substring(0, 200)} {/* Limit the poem details to 200 characters */}
          {poem.poemDetails.length > 200 && (
            <span className="poem-details-expand">...</span>
          )}
        </Typography>
        <Typography variant="body2" color="textSecondary" className='poem-author'>
          {poem.poemAuthor ? `by ${poem.poemAuthor}` : 'Unknown Author'}
        </Typography>
        <Box textAlign="center">
          <StyledButton
            onClick={() => handleClick(poem._id)}
            variant="outlined"
            color="primary"
          >
            Read More
          </StyledButton>
        </Box>
      </StyledCardContent>
    </StyledCard>
  );
};

export default PoemCard;
