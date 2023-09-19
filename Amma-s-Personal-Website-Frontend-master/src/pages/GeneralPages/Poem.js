import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Grid } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux"
import { fetchPoems, getPoemError, getPoemStatus,getAllPoems } from '../../appfeatures/poems/poemSlice';
import LinearIndeterminate from '../../Components/LoadingPage';
import PoemCard from '../../Components/GeneralPageCompnent/Card';

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
    
   content = orderedPoem.map((poem, index) => (
    <Grid item key={`${poem._id}-${index}`} xs={12} sm={6} md={6}>
      <PoemCard poem={poem} />
    </Grid>
    ))
  }
   
   else if (poemStatus === "failed"){
    content = <p>error maybe internet issue</p>
   }
    return (
  
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: { lg: -20 },
    }}>
        <Box>
          <Box sx={{
          textAlign: 'center'
        }}>
          <Typography  variant='h4' component="h1">
            POEMS
          </Typography>
          </Box>
          <Grid container spacing={3}>
            {content}
          </Grid>
        </Box>

    </Box>
    );
};

Poem.propTypes = {};

export { Poem };