import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { fetchArticleQuery,  } from '../appfeatures/articles/articleSlice';
import LinearIndeterminate from '../Components/LoadingPage';
import ArticleCard from '../Components/ArticleCard';
import { useQuery, useQueryClient } from 'react-query';

const Articles = ({articleId}) => {

  const queryClient = useQueryClient()
  const { data: articles, isLoading, isError, error, isSuccess } = useQuery('articles', fetchArticleQuery); // Replace 'fetchStories' with your fetch function

   let content;
   if(isLoading) {
    return (
      <Box sx={{ marginTop: 25,}}>
        <LinearIndeterminate/>
      </Box>
    )
   }
   else if(isSuccess){
    const orderedArticle = articles.article.slice().sort((a,b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
   })
  
  
   content = orderedArticle.map((article, index) =>(
    <Grid item key={`${article._id}-${index}`} xs={12} sm={6} md={6}>
      <ArticleCard article={article} articleId={articleId}/>
    </Grid>
    ))
    }
    else if (isError){
     content = <p>{error}</p>
    }

    queryClient.setQueryData("articles", articles)
    return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: {lg: -20,},
    }}>
       <Box>
       <Box sx={{
          textAlign: 'center'
        }}>
          <Typography  variant='h4' component="h1">
            ARTICLES
          </Typography>
          </Box>
          <Grid container spacing={3}>
            {content}
          </Grid>
        </Box>
      
      
    </Box>
    )
    ;
};

Articles.propTypes = {};

export { Articles };