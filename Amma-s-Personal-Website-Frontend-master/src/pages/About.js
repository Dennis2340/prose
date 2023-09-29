import React, { useEffect } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import BasicCard from '../Components/AboutCard';
import { useSelector, useDispatch } from "react-redux"
import { fetchUser, getUserStatus,getUserInfo } from '../appfeatures/about/aboutSlice';
import LinearIndeterminate from '../Components/LoadingPage';

const About = props => {

  const dispatch = useDispatch()

  const userList = useSelector(getUserInfo)

  const userStatus = useSelector(getUserStatus)

   useEffect(() => {
    if(userStatus === "idle"){
     
      dispatch(fetchUser())
      
    }
   }, [userStatus,dispatch,userList])
  
   let content;
   if(userStatus === "loading"){
    return (
      <Box sx={{ marginTop: 25,}}>
        <LinearIndeterminate/>
      </Box>
      
    )
   }  else if(userStatus === "succeeded"){
    const orderedUser = userList?.slice().sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    })
    content = orderedUser?.map((user, index) => (
      <Grid item key={`${user._id}-${index}`} xs={12} sm={6} md={6}>
        <BasicCard user={user}/>
      </Grid>
      ))
    
  }else if (userStatus === "failed"){
    content = (
    <Box>
         <p><span style={{color: "red"}}>Error!!</span> poor internet connection, <b>please</b> fix your network and try again!!</p>
    </Box>)
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
         <Box sx={{ marginTop: 3, marginBottom: 7, textAlign: "center"}}>
          <Typography  variant='h4' component="h1">
            Users 
          </Typography>
          {/*
            userList?.length === 0 ? (<Box sx={{marginTop: 5}}> <Typography variant='h5'>owner details not added yet!!!</Typography></Box>) : null
         */}
          </Box>
            <Grid container spacing={3}>
             {content}
             </Grid> 
      </Box>
    </Box>
    );
};

About.propTypes = {};

export { About };