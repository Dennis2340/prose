import React, { useEffect } from 'react';
import { Box, Typography, Grid,} from '@mui/material';
import { useSelector, useDispatch } from "react-redux"
import { fetchStoryQuery,getAllStories, getStoryStatus } from '../appfeatures/stories/storySlice';
import LinearIndeterminate from '../Components/LoadingPage';
import StoryCard from '../Components/StoryCard';
import { useQuery, useQueryClient } from 'react-query';

const Stories = ({storyId}) => {

  const queryClient = useQueryClient()
  const { data: stories, isLoading, isError, error, isSuccess } = useQuery('stories', fetchStoryQuery); // Replace 'fetchStories' with your fetch function

   let content;
   if(isLoading){
    return (
      <Box sx={{ marginTop: 25,}}>
      <LinearIndeterminate/>
    </Box>
    )
   }
   else if(isSuccess){
    
   const orderedStory = stories.story.slice().sort((a,b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  })
   
  content = orderedStory.map((story, index) => (
    <Grid item key={`${story._id}-${index}`} xs={12} sm={6} md={6}>
      <StoryCard story={story} storyId={storyId}/>
    </Grid>
    ))
    
   }
   else if (isError) {
    content = <p>{error}</p>
   }

   queryClient.setQueryData("stories", stories)
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