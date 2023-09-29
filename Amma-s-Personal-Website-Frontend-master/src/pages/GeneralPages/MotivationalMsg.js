import React, { useState } from 'react';
import { Box, Typography, Grid, InputBase, IconButton } from '@mui/material';
import { fetchMotMsgQuery, } from '../../appfeatures/motivationalmsg/motmsgSlice';
import MotMsgCard from '../../Components/GeneralPageCompnent/MotMsgCard';
import { useQuery, useQueryClient } from 'react-query';
import { Search, Clear} from '@mui/icons-material';
import SkeletonCard from '../../Components/SkeletonCard';
const MotivationalMsg = ({motmsgId}) => {

  const queryClient = useQueryClient()
  const { data: motmsg, isLoading, isError, error, isSuccess } = useQuery('motmsgs', fetchMotMsgQuery); // Replace 'fetchStories' with your fetch function

  const [searchTerm, setSearchTerm] = useState('');

  const filteredPoems = isSuccess
  ? motmsg.motMessages.filter((motmsg) =>
      motmsg.motMessageTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      motmsg.motMessageGenre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      motmsg.motMessageAuthor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      motmsg.motMessageDetails.toLowerCase().includes(searchTerm.toLowerCase())
    )
  : [];
   let content;
   if(isLoading){
    content = Array.from({ length: 8 }).map((_, index) => (
      <Grid item key={index} xs={12} sm={6} md={6}>
        <SkeletonCard />
      </Grid>
    ));
   }

   else if(isSuccess){
    content =
      filteredPoems.length > 0 ? (
        filteredPoems.map((motmsg, index) => (
          <Grid item key={`${motmsg._id}-${index}`} xs={12} sm={6} md={6}>
            <MotMsgCard motmsgId={motmsgId} motmsg={motmsg} />
          </Grid>
        ))
      ) : (
        <Typography sx={{marginLeft:7, textAlign: "center"}} variant="h3" color="textSecondary">
          No Motivational Message found.
        </Typography>
      );
   
  }
  else if (isError){
   content = <p>{error}</p>
  }

  queryClient.setQueryData("motmsgCache",motmsg)
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
          {/* Add search field */}
          <Box sx={{ display: 'flex',justifyContent: "center",  alignItems: 'center', marginTop: 4, marginBottom: 2, minWidth: {xs: "90%", lg: "60%"}, maxWidth: { lg: "70%"}, marginLeft: {lg: 12}}}>
            <InputBase
              placeholder="Search ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              fullWidth
              sx={{
                borderRadius: 1,
                backgroundColor: (theme) => theme.palette.common.main,
                pl: 2,
                pr: 1,
                boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.1)',
              }}
            />
            {
              searchTerm ? (
               <IconButton
                onClick={() => setSearchTerm('')}
                sx={{ padding: 0, marginLeft: -6}} // Add some styling to the clear button
                >
              <Clear />
            </IconButton>
              ) : (
                <Search sx={{ padding: 0, marginLeft: -6}}/>
              )
            }
          </Box>
          <Grid container spacing={2}>
            {content}
          </Grid>
        
      
    </Box>
    );
};

MotivationalMsg.propTypes = {};

export { MotivationalMsg };