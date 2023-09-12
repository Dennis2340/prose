import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';
import BasicCard from '../Components/StoryCard';
import ResponsiveDrawer from "../Components/StoryAppBar"
import { Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux"
import { fetchStories, getAllStories, getStoryError, getStoryStatus } from '../appfeatures/stories/storySlice';
import LinearIndeterminate from '../Components/LoadingPage';
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
  
  content = orderedStory.map((story, index) => <BasicCard key={`${story._id}-${index}`} story= {story}/>)
    
   }
   else if (storyStatus === "failed"){
    content = <p>error maybe internet issue</p>
   }
    return (
  <>
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
            STORIES
          </Typography>
          </Box>
          <Box sx={{marginLeft: 5, marginRight: 1}}>
            {content}
          </Box>
        </Box>

    </div>
    
</>

    );
};

Stories.propTypes = {};

export { Stories };