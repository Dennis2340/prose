import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';
import BasicCard from '../Components/MotMsgCard'
import ResponsiveDrawer from "../Components/MotMsgAppBar"
import { Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux"
import { fetchMotMsg, getMotMsgError, getMotMsgStatus,getAllMotMsg } from '../appfeatures/motivationalmsg/motmsgSlice';
import LinearIndeterminate from '../Components/LoadingPage';
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

   content = orderedMotMsg.map((motmsg, index) => <BasicCard key={`${motmsg._id}-${index}`} motmsg = {motmsg}/>)
  }
  else if (motmsgStatus === "failed"){
   content = <p>error maybe internet issue</p>
  }
    return (
    <div>
     
      <Box
      sx={{
        marginLeft: {xs: 1,sm: 36},
        marginTop: -3,
        width: {xs : "100%", sm: "85%", md: "85%",lg: "95%"}
      }}
      >
      <Box sx={{marginLeft: {xs: 14, sm:45}, marginBottom: 5}}>
          <Typography  variant='h4' component="h1">
            Motivational Messages
          </Typography>
          </Box>
          <Box sx={{marginLeft: 5, marginRight: 1}}>
            {content}
          </Box>
        </Box>
      
    </div>
    );
};

MotivationalMsg.propTypes = {};

export { MotivationalMsg };