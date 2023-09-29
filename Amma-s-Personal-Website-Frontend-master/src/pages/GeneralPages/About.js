import React, { useEffect } from 'react';
import { Box, } from '@mui/material';
import { BasicCard } from '../../Components/GeneralPageCompnent/BasicCard';
import { useSelector, useDispatch } from "react-redux"
import { fetchUser, getUserStatus,getUserInfo } from '../../appfeatures/about/aboutSlice';
import LinearIndeterminate from '../../Components/LoadingPage';

const About = ({loginDetails}) => {

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
    content = orderedUser?.map((user, index) => <BasicCard key={`${user._id}-${index}`} user={loginDetails}/>)
  }else if (userStatus === "failed"){
    content = (
    <Box>
         <p><span style={{color: "red"}}>Error!!</span> poor internet connection, <b>please</b> fix your network and try again!!</p>
    </Box>)
   }

    return (
    <Box sx={{
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: {lg: -20,},
    }}> 
        <BasicCard user={loginDetails}/> 
    </Box>
    );
};

About.propTypes = {};

export { About };