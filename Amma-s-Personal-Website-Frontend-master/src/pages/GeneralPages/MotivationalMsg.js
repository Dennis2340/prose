import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Grid, Link } from '@mui/material';
import BasicCard from '../../Components/MotMsgCard'
import { Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux"
import { fetchMotMsg, getMotMsgError, getMotMsgStatus,getAllMotMsg } from '../../appfeatures/motivationalmsg/motmsgSlice';
import LinearIndeterminate from '../../Components/LoadingPage';
import MotMsgCard from '../../Components/MotMsgCard';
const MotivationalMsg = props => {

  const dispatch = useDispatch()

  const motmsgList = useSelector(getAllMotMsg)
  console.log(motmsgList)
  const error = useSelector(getMotMsgError)
  const motmsgStatus = useSelector(getMotMsgStatus)

  useEffect(() => {
    if(motmsgStatus === "idle"){
      dispatch(fetchMotMsg())
      
    }
   }, [motmsgStatus, dispatch])

   useEffect(() => {
    if (motmsgStatus === "succeeded") {
      const orderedMotMsg = motmsgList.slice().sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      })
      console.log(orderedMotMsg)
    }
  }, [motmsgList, motmsgStatus])


   let content;
   if(motmsgStatus === "loading"){
    return (
      <Box sx={{ marginTop: 25,}}>
        <LinearIndeterminate/>
      </Box>
    )
   }

   else if(motmsgStatus === "succeeded"){
    const orderedMotMsg = motmsgList.slice().sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

   content = orderedMotMsg.map((motmsg, index) => (
    <Grid item key={`${motmsg._id}-${index}`} xs={12} sm={6} md={6}>
      <MotMsgCard motmsg={motmsg} />
    </Grid>
    ))
   
  }
  else if (motmsgStatus === "failed"){
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
            Motivational Messages
          </Typography>
          </Box>
          <Grid container spacing={2}>
            {content}
          </Grid>
        
      
    </Box>
    );
};

MotivationalMsg.propTypes = {};

export { MotivationalMsg };