import React, {useState} from 'react';
import { Box, Typography, Grid, InputBase, IconButton } from '@mui/material';
import { fetchPoemsQuery,  } from '../appfeatures/poems/poemSlice';
import LinearIndeterminate from '../Components/LoadingPage';
import PoemCard from '../Components/Card';
import { useQuery, useQueryClient, useInfiniteQuery } from 'react-query';
import Search from '@mui/icons-material/Search';

const Poem = ({poemId}) => {

  const queryClient = useQueryClient()
  const { data: poems, isLoading, isError, error, isSuccess } = useQuery('poems', fetchPoemsQuery); // Replace 'fetchStories' with your fetch function


  const [searchTerm, setSearchTerm] = useState('');

  // Filter poems based on search term
  const filteredPoems = isSuccess
  ? poems.poems.filter((poem) =>
        poem.poemTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        poem.poemGenre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        poem.poemAuthor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        poem.poemDetails.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

   let content;
   if(isLoading){
    return (
      <Box sx={{ marginTop: 25,}}>
        <LinearIndeterminate/>
      </Box>
      
    )
   }
   else if(isSuccess){
    content =
      filteredPoems.length > 0 ? (
        filteredPoems.map((poem, index) => (
          <Grid item key={`${poem._id}-${index}`} xs={12} sm={6} md={6}>
            <PoemCard poemId={poemId} poem={poem} />
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

   queryClient.setQueryData('poemCache', poems);
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
          {/* Add search field */}
          <Box sx={{ display: 'flex',justifyContent: "center",  alignItems: 'center', marginTop: 2, marginBottom: 10, maxWidth: {lg: "70%"}, marginLeft: {lg: 15} }}>
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
            <IconButton
              onClick={() => setSearchTerm('')}
              sx={{ padding: 0, marginLeft: -6}} // Add some styling to the clear button
            >
              <Search />
            </IconButton>
          </Box>
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