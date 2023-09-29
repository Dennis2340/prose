import React, { useState } from 'react';
import { Box, Typography, Grid, InputBase, IconButton } from '@mui/material';
import { fetchStoryQuery, } from '../../appfeatures/stories/storySlice';
import StoryCard from '../../Components/GeneralPageCompnent/StoryCard';
import { useQuery, useQueryClient } from 'react-query';
import { Clear ,Search} from '@mui/icons-material';
import SkeletonCard from '../../Components/SkeletonCard';

const Stories = ({storyId}) => {

  const queryClient = useQueryClient()
  const { data: storys, isLoading, isError, error, isSuccess } = useQuery('stories', fetchStoryQuery); // Replace 'fetchStories' with your fetch function

  const [searchTerm, setSearchTerm] = useState('');

  const filteredPoems = isSuccess
  ? storys.story.filter((story) =>
      story.storyTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      story.storyGenre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      story.storyAuthor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      story.storyDetailed.toLowerCase().includes(searchTerm.toLowerCase())
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
      filteredPoems.map((story, index) => (
        <Grid item key={`${story._id}-${index}`} xs={12} sm={6} md={6}>
          <StoryCard storyId={storyId} story={story} />
        </Grid>
      ))
    ) : (
      <Typography variant="h3" color="textSecondary">
        No poems found.
      </Typography>
    );
    
   }
   else if (isError){
    content = <p>{error}</p>
   }

   queryClient.setQueryData("storyCache", storys)
    return (
  <>
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: {lg: -20,},
    }}>
       
        <Box>
          <Box sx={{
          textAlign: 'center'
        }}>
          <Typography  variant='h4' component="h1">
            STORIES
          </Typography>
          </Box>
          {/* Add search field */}
          <Box sx={{ display: 'flex',justifyContent: "center",  alignItems: 'center', marginTop: 2, marginBottom: 2, maxWidth: {lg: "70%"}, marginLeft: {lg: 15} }}>
            <InputBase
              placeholder="Search for stories..."
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
          <Grid container spacing={3}>
            {content}
          </Grid>
        </Box>

    </Box>
    
</>

    );
};

Stories.propTypes = {};

export { Stories };