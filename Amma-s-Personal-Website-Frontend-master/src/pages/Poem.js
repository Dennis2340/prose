import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';
import BasicCard from '../Components/Card';
import ResponsiveDrawer from "../Components/PoemAppBar"
import { Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux"
import { fetchPoems, getPoemError, getPoemStatus,getAllPoems } from '../appfeatures/poems/poemSlice';
import LinearIndeterminate from '../Components/LoadingPage';

const Poem = props => {

  const dispatch = useDispatch()

  const poemList = useSelector(getAllPoems)
  console.log(poemList)
  const error = useSelector(getPoemError)
  const poemStatus = useSelector(getPoemStatus)

   useEffect(() => {
    if(poemStatus === "idle"){
      console.log("Fetching poems...");
      dispatch(fetchPoems())
      
    }else if (poemStatus === "succeeded") {
      console.log("Poems fetched successfully!");
      console.log("Poem list:", poemList);
    }
   }, [poemStatus,dispatch,poemList])

   useEffect(() => {
    if (poemStatus === "succeeded") {
      const orderedPoems = poemList.slice().sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      })
      console.log(orderedPoems)
    }
  }, [poemList, poemStatus])
  
   let content;
   if(poemStatus === "loading"){
    return (
      <Box sx={{ marginTop: 25,}}>
        <LinearIndeterminate/>
      </Box>
      
    )
   }
   else if(poemStatus === "succeeded"){
    const orderedPoem = poemList.slice().sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    
   content = orderedPoem.map((poem, index) => <BasicCard key={`${poem._id}-${index}`} poem = {poem}/>)
   }
   else if (poemStatus === "failed"){
    content = <p>error maybe internet issue</p>
   }
    return (
  <>
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
            POEMS
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

Poem.propTypes = {};

export { Poem };