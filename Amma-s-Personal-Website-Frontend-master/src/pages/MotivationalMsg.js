import React from 'react';
import { Box, Typography, Grid, } from '@mui/material';
import { fetchMotMsgQuery,  } from '../appfeatures/motivationalmsg/motmsgSlice';
import LinearIndeterminate from '../Components/LoadingPage';
import MotMsgCard from '../Components/MotMsgCard';
import { useQuery, useQueryClient } from 'react-query';

const MotivationalMsg = ({motmsgId}) => {

  const queryClient = useQueryClient()
  const { data: motmsgs, isLoading, isError, error, isSuccess } = useQuery('motmsgs', fetchMotMsgQuery); // Replace 'fetchStories' with your fetch function

   let content;
   if(isLoading){
    return (
      <Box sx={{ marginTop: 25,}}>
        <LinearIndeterminate/>
      </Box>
    )
   }

   else if(isSuccess){
    const orderedMotMsg = motmsgs.motMessages.slice().sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

   content = orderedMotMsg.map((motmsg, index) => (
    <Grid item key={`${motmsg._id}-${index}`} xs={12} sm={6} md={6}>
      <MotMsgCard motmsg={motmsg} motmsgId={motmsgId}/>
    </Grid>
    ))
   
  }
  else if (isError){
   content = <p>{error}</p>
  }
  queryClient.setQueryData("motmsgs", motmsgs)
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