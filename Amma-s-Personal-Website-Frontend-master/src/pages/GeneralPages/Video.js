import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Grid } from '@mui/material';
import  { VideoComp } from '../../Components/Video';
import { Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux"
import { fetchVideos, getVideoError, getVideoStatus,getAllVideos } from '../../appfeatures/videos/videoSlice';
import LinearIndeterminate from '../../Components/LoadingPage';
const Video = props => {


  const dispatch = useDispatch()

  const videoList = useSelector(getAllVideos)
  console.log(videoList)
  const error = useSelector(getVideoError)
  const videoStatus = useSelector(getVideoStatus)


  useEffect(() => {
    if(videoStatus === "idle"){
      dispatch(fetchVideos())
      
    }
   }, [videoStatus, dispatch])

   useEffect(() => {
    if (videoStatus === "succeeded") {
      const orderedVideos = videoList.slice().sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      })
      console.log(orderedVideos)
    }
  }, [videoList, videoStatus])
  
   let content;
   if(videoStatus === "loading"){
    return (
      <Box sx={{ marginTop: 25,}}>
        <LinearIndeterminate/>
      </Box>
    )
   }
   else if(videoStatus === "succeeded"){
   const orderedVideo = videoList.slice().sort((a,b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  })

  content = orderedVideo.map((video, index) => (
    <Grid item key={`${video._id}-${index}`} xs={12} sm={6} md={6}>
       <VideoComp video={video}/>
    </Grid>
  ))
}

else if (videoStatus === "failed"){
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