import React, { useContext } from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/system';
import { MyContext } from '../../Layout';

const StyledCard = styled(Card)(
  ({ theme }) => ({
    width: '100%',
    height: '100%',
    textAlign: 'center',
    maxWidth: 500,
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
    '& article-title': {
      fontSize: '1.5rem',
      color: 'primary.main',
    },
    '& article-author': {
      fontSize: '1rem',
      fontStyle: 'italic',
      color: 'text.secondary',
    },
    '& article-details': {
      maxHeight: '200px', // Limit the max height of the poem details
      overflow: 'hidden',
      position: 'relative',
    },
    '& article-details-expand': {
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
    marginTop: theme.spacing(2),
  })
);

const ArticleCard = ({article, articleId}) => {

    const [active, setActive] = useContext(MyContext)
  
    const handleClick = (id) => {
      setActive("SingleArticle")
      articleId(id)
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      })
    }
  
  
    return (
      <StyledCard sx={{ marginTop: 4,}}>
        <StyledCardContent>
          <Typography variant="h5" color="textSecondary" className='article-title'>
            {article.articleTitle}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {article.articleGenre}
          </Typography>
          <Typography variant="body2" color="textSecondary" className='article-details'>
            {article.articleDetails.substring(0, 200)} {/* Limit the article details to 200 characters */}
            {article.articleDetails.length > 200 && (
              <span className="article-details-expand">...</span>
            )}
          </Typography>
          <Typography variant="body2" color="textSecondary" className='article-author'>
            {article.articleAuthor ? `by ${article.articleAuthor}` : 'Unknown Author'}
          </Typography>
          <StyledButton
            onClick={()=> handleClick(article._id)}
            variant="outlined"
            color="primary"
          >
            Read More
          </StyledButton>
        </StyledCardContent>
      </StyledCard>
    );
  };
  
  export default ArticleCard;