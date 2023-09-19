import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Grid, Link } from '@mui/material';
import BasicCard from '../../Components/StoryCard';
import { Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux"
import { fetchStories, getAllStories, getStoryError, getStoryStatus } from '../../appfeatures/stories/storySlice';
import LinearIndeterminate from '../../Components/LoadingPage';
import StoryCard from '../../Components/StoryCard';
const Stories = props => {

  const dispatch = useDispatch()

  const storyList = useSelector(getAllStories)
  console.log(storyList)
  const error = useSelector(getStoryError)
 
  const storyStatus = useSelector(getStoryStatus)
  
   useEffect(() => {
    if(storyStatus === "idle"){
      dispatch(fetchStories())
      
    }
   }, [storyStatus, dispatch])

   useEffect(() => {
    if (storyStatus === "succeeded") {
      const orderedStories = storyList.slice().sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      })
      console.log(orderedStories)
    }
  }, [storyList, storyStatus])
  
   let content;
   if(storyStatus === "loading"){
    return (
      <Box sx={{ marginTop: 25,}}>
      <LinearIndeterminate/>
    </Box>
    )
   }
   else if(storyStatus === "succeeded"){
    
   const orderedStory = storyList.slice().sort((a,b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  })
  console.log(orderedStory)
  
  content = orderedStory.map((story, index) => (
    <Grid item key={`${story._id}-${index}`} xs={12} sm={6} md={6}>
      <StoryCard story={story} />
    </Grid>
    ))
    
   }
   else if (storyStatus === "failed"){
    content = <p>error maybe internet issue</p>
   }
    return (
  <>
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
            STORIES
          </Typography>
          </Box>
          <Grid container spacing={3}>
            {content}
          </Grid>
        </Box>

    </Box>
    
</>

    );
};

Stories.propTypes = {};

export { Stories };