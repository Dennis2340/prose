import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Grid, Link } from '@mui/material';
import BasicCard from '../../Components/ArticleCard';
import { Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux"
import { fetchArticles, getAllArticles, getArticleError, getArticleStatus } from '../../appfeatures/articles/articleSlice';
import LinearIndeterminate from '../../Components/LoadingPage';
import ArticleCard from '../../Components/ArticleCard';
const Articles = props => {


  const dispatch = useDispatch()

  const articleList = useSelector(getAllArticles)
  console.log(articleList)
  const error = useSelector(getArticleError)
 
  const articleStatus = useSelector(getArticleStatus)
  
  useEffect(() => {
    if(articleStatus === "idle"){
      dispatch(fetchArticles())
      
    }
   }, [articleStatus, dispatch])

   useEffect(() => {
    if (articleStatus === "succeeded") {
      const orderedArticle = articleList.slice().sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      })
      console.log(orderedArticle)
    }
  }, [articleList, articleStatus])
  
   let content;
   if(articleStatus === "loading"){
    return (
      <Box sx={{ marginTop: 25,}}>
        <LinearIndeterminate/>
      </Box>
    )
   }
   else if(articleStatus === "succeeded"){
    const orderedArticle = articleList.slice().sort((a,b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
   })
   console.log(orderedArticle)
  
   content = orderedArticle.map((article, index) =>(
    <Grid item key={`${article._id}-${index}`} xs={12} sm={6} md={6}>
      <ArticleCard article={article} />
    </Grid>
    ))
    }
    else if (articleStatus === "failed"){
     content = <p>error maybe internet issue</p>
    }
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