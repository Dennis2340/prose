import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import  { VideoComp } from '../../Components/GeneralPageCompnent/Video';
import { fetchVideosQuery, } from '../../appfeatures/videos/videoSlice';
import { useQuery, useQueryClient } from 'react-query';
import SkeletonCard from '../../Components/SkeletonCard';
const Video = ({videoId}) => {

  const queryClient = useQueryClient()
  const { data: videos, isLoading, isError, error, isSuccess } = useQuery('videos', fetchVideosQuery); // Replace 'fetchStories' with your fetch function

  console.log(videos)

   let content;
   if(isLoading){
    content = Array.from({ length: 8 }).map((_, index) => (
      <Grid item key={index} xs={12} sm={6} md={6}>
        <SkeletonCard />
      </Grid>
    ));
   }
   else if(isSuccess){
   const orderedVideo = videos.videos.slice().sort((a,b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  })

  content = orderedVideo.map((video, index) => (
    <Grid item key={`${video._id}-${index}`} xs={12} sm={6} md={6}>
       <VideoComp video={video} videoId={videoId}/>
    </Grid>
  ))
}

else if (isError){
  content = <p>{error}</p>
 }
 queryClient.setQueryData("videoCache", videos)
    return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: {lg: -20,},
    }}>
       
         <Box sx={{
          textAlign: 'center'
        }}>
          <Typography  variant='h4' component="h1">
            VIDEOS
          </Typography>
          </Box>
          <Grid container spacing={2}>
           {content}
          </Grid> 
    </Box>
    );
};

Video.propTypes = {};

export { Video };