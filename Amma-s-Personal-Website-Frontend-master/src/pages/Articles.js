import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';
import BasicCard from '../Components/ArticleCard';
import ResponsiveDrawer from "../Components/ArticleAppBar"
import { Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux"
import { fetchArticles, getAllArticles, getArticleError, getArticleStatus } from '../appfeatures/articles/articleSlice';
import LinearIndeterminate from '../Components/LoadingPage';
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
  
   content = orderedArticle.map((article, index) => <BasicCard key={`${article._id}-${index}`} article= {article}/>)
     
    }
    else if (articleStatus === "failed"){
     content = <p>error maybe internet issue</p>
    }
    return (
    <div>
       <ResponsiveDrawer/>
       <Box
       sx={{
        marginLeft: {xs: 1,sm: 32},
        marginTop: -3,
        width: "75%"
      }}
       >
       <Box sx={{marginLeft: {xs: 14, sm:45}, marginBottom: 5}}>
          <Typography  variant='h4' component="h1">
            ARTICLES
          </Typography>
          </Box>
          <Box sx={{marginLeft: 5, marginRight: 1}}>
            {content}
          </Box>
        </Box>
      
      
    </div>
    )
    ;
};

Articles.propTypes = {};

export { Articles };