// Update your Poem component
import React, { useState } from 'react';
import { Box, Typography, Grid, InputBase, IconButton, Button, Stack, Pagination } from '@mui/material';
import PoemCard from '../../Components/GeneralPageCompnent/Card';
import { useQuery,useQueryClient, useInfiniteQuery } from 'react-query';
import { Search, Clear } from '@mui/icons-material';
import SkeletonCard from '../../Components/SkeletonCard';
import  { fetchPoemsQuery } from '../../appfeatures/poems/poemSlice';

const Poem = ({ poemId }) => {
  const queryClient = useQueryClient();

  const { data: poems, isLoading, isError, error, isSuccess } = useQuery('poems', fetchPoemsQuery); // Replace 'fetchStories' with your fetch function

  const [searchTerm, setSearchTerm] = useState('');

  
  const filteredPoems = isSuccess 
  ?      poems?.poems?.filter(
          (poem) =>
            poem.poemTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
            poem.poemGenre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            poem.poemAuthor.toLowerCase().includes(searchTerm.toLowerCase()) ||
            poem.poemDetails.toLowerCase().includes(searchTerm.toLowerCase())
        )
    : [];

  let content;
  if (isLoading) {
    content = Array.from({ length: 8 }).map((_, index) => (
      <Grid item key={index} xs={12} sm={6} md={6}>
        <SkeletonCard />
      </Grid>
    ));
  } else if (isSuccess) {
    content =
      filteredPoems.length > 0 ? (
        filteredPoems.map((poem, index) => (
          <Grid item key={`${poem._id}-${index}`} xs={12} sm={6} md={6}>
            <PoemCard poemId={poemId} poem={poem} />
          </Grid>
        ))
      ) : (
        <Typography sx={{ marginTop: 10 }} variant="h3" color="textSecondary">
          No poems found.
        </Typography>
      );
  }
  else if(isError){
    content = <Typography variant='h5'>{error}</Typography>
  }

  
  queryClient.setQueryData('poemCache', poems);

  
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: 'auto',
        alignItems: 'center',
        marginLeft: { lg: -20 },
      }}
    >
      <Box sx={{ width: 'auto' }}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h4" component="h1">
            POEMS
          </Typography>
        </Box>
        {/* Add search field */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 2,
            marginBottom: 2,
            maxWidth: { lg: '70%' },
            marginLeft: { lg: 15 },
          }}
        >
          <InputBase
            placeholder="Search for poems..."
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
          {searchTerm ? (
            <IconButton
              onClick={() => setSearchTerm('')}
              sx={{ padding: 0, marginLeft: -6 }} // Add some styling to the clear button
            >
              <Clear />
            </IconButton>
          ) : (
            <Search sx={{ padding: 0, marginLeft: -6 }} />
          )}
        </Box>
        <Grid container spacing={3}>
          {content}
        </Grid>
        {/* <Box sx={{ textAlign: 'center', zIndex: 1,marginTop: 7,}}>
            <Stack spacing={2}>
              <Pagination
                count={data.pages.totalPages} // Assuming totalPages is available in your data structure
                page={data.pages.page}
                onChange={handlePageChange}
                color="primary"
              />
              {isFetchingNextPage && <Typography variant="body2">Loading more...</Typography>}
            </Stack> 
        </Box>
          */}
       
      </Box>
    </Box>
  );
};

Poem.propTypes = {};

export { Poem };
