import React, {useState, useEffect,useContext} from 'react';
import { Box, Card, CardContent, Typography, Button, Container, Grid } from '@mui/material';
import { useDispatch } from 'react-redux';
import { fetchArticles, } from './articleSlice';
import { styled } from '@mui/system';
import { MyContext } from '../../Layout';
import {useQueryClient } from 'react-query';

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
    '& .article-title': {
      fontSize: '1.5rem',
      color: 'primary.main',
    },
    '& .article-author': {
      fontSize: '1rem',
      fontStyle: 'italic',
      color: 'text.secondary',
    },
    '& .article-details': {
      maxHeight: '200px', // Limit the max height of the article details
      overflow: 'hidden',
      position: 'relative',
    },
    '& .article-details-expand': {
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


const SingleArticleGen = ({id}) => {

    const queryClient = useQueryClient()

    const dispatch = useDispatch()
    const [idState, setIdState] = useState("")
   const articles = queryClient.getQueryData("articleCache")
    
    const [active, setActive] = useContext(MyContext)
    const realId = idState ? idState : id
  
    const article =  articles.article.find((article) => article._id === realId);
 
    const allArticles = articles.article
  
      
      
      useEffect(() => {
        // Fetch all articles when the component mounts
        dispatch(fetchArticles());
      }, [dispatch]);
    
      const handleClick = (id) => {
        setActive("SingleArticle")
        setIdState(id)
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        })
      }
      if(!article){
          return (
            <section>
              <h2>Post not found</h2>
            </section>
          )
        }
      return (
        <div>
           <Container sx={{ marginLeft: {lg: -10}}}>
              <StyledCard variant="outlined">
                <StyledCardContent>
                  <Typography variant="h5" color="text.secondary" className='article-title'>
                    {article.articleTitle}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {article.articleGenre}
                  </Typography>
                  <Typography sx={{ marginTop: 2 }} variant="body2" className='article-details'>
                    {article.articleDetails}
                  </Typography>
                  <Typography sx={{ marginTop: 1, marginBottom: 2 }} variant="body2" className='article-author'>
                    {article.articleAuthor ? `by ${article.articleAuthor}` : 'unknown author'}
                  </Typography>
                </StyledCardContent>
              </StyledCard>
              <Box>
              <Typography variant="h6" gutterBottom sx={{ marginTop: 10, marginBottom: 3,textAlign: "center"}}>
                Other Articles
              </Typography>
              </Box>
            <Grid container spacing={3}>
                {allArticles.map((otherArticle) => (
                <Grid key={otherArticle._id} item xs={12} md={6} sx={{ marginTop: 0, }}>
                  <StyledCard 
                    variant="outlined"
                    sx={{ marginBottom: 2 ,}}
                  >
                    <StyledCardContent>
                      <Typography variant="h6" color="text.secondary" className='article-title'>
                        {otherArticle.articleTitle}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {otherArticle.articleGenre}
                      </Typography>
                      <Typography variant="body2" className='article-details'>
                        {otherArticle.articleDetails?.substring(0, 200) + '...'}
                      </Typography>
                      <Typography variant="body2" className='article-author'>
                        {otherArticle.articleAuthor ? `by ${otherArticle.articleAuthor}` : 'unknown author'}
                      </Typography>
                      <StyledButton
                        onClick={() => handleClick(otherArticle._id)}
                        variant="outlined"
                        color="primary"
                      >
                        Read More
                      </StyledButton>
                    </StyledCardContent>
                  </StyledCard>
                </Grid>
                ))}
              </Grid>
        </Container>
      </div>
      )
      ;
  };
  
  SingleArticleGen.propTypes = {};
  
  export { SingleArticleGen };