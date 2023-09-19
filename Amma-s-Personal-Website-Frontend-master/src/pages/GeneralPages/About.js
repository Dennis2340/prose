import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';
import BasicCard from '../../Components/AboutCard';
import ResponsiveDrawer from "../../Components/UserAppBar"
import { Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux"
import { fetchUser, getUserError, getUserStatus,getUserInfo } from '../../appfeatures/about/aboutSlice';
import LinearIndeterminate from '../../Components/LoadingPage';

const About = props => {

  const dispatch = useDispatch()

  const userList = useSelector(getUserInfo)
  console.log(userList)
  const error = useSelector(getUserError)
  const userStatus = useSelector(getUserStatus)

   useEffect(() => {
    if(userStatus === "idle"){
      console.log("Fetching user...");
      dispatch(fetchUser())
      
    }else if (userStatus === "succeeded") {
      console.log("users fetched successfully!");
      console.log("user list:", userList);
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
    content = orderedUser?.map((user, index) => <BasicCard key={`${user._id}-${index}`} user = {user}/>)
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
         <Box>
          <Typography  variant='h6' component="h1">
            ABOUT THE OWNER OF THE WEBSITE
          </Typography>
          {/*
            userList?.length === 0 ? (<Box sx={{marginTop: 5}}> <Typography variant='h5'>owner details not added yet!!!</Typography></Box>) : null
         */}
          </Box>
            <Box sx={{marginLeft: 5, marginRight: 1}}>
             {content}
             </Box> 
      </Box>
    </Box>
    );
};

About.propTypes = {};

export { About };