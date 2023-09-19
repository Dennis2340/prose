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
    marginTop: theme.spacing(2),
  })
);

const ArticleCard = ({article}) => {
  return (
    <StyledCard sx={{ marginTop: 4,}}>
      <StyledCardContent>
        <Typography variant="h5" color="textSecondary">
          {article.articleTitle}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {article.articleGenre}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {article.articleDetails?.substring(0, 40) + '...'}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {article.articleAuthor ? `by ${article.articleAuthor}` : 'Unknown Author'}
        </Typography>
        <StyledButton
          component={Link}
          to={`/singlearticle/${article._id}`}
          variant="outlined"
          color="primary"
        >
          View
        </StyledButton>
      </StyledCardContent>
    </StyledCard>
  );
};

export default ArticleCard;
