import React, { useContext, useState } from 'react';
import { Box, Card, CardContent, Typography, Container, Grid,Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { styled } from '@mui/system';
import { MyContext } from '../../Layout';
import {  useQueryClient } from 'react-query';

const StyledCard = styled(Card)(
  ({ theme }) => ({
    width: '100%',
    height: "100%",
    textAlign: 'center',
    maxWidth: 500,
    minWidth: "auto",
    margin: 'auto',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
    transition: '0.3s',
    '&:hover': {
      boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
    },
    background: '#f9f9f9',
    border: '1px solid #ccc',
  })
);

const StyledCardContent = styled(CardContent)(
  ({ theme }) => ({
    padding: theme.spacing(2),
    '& .story-title': {
      fontSize: '1.5rem',
      color: 'primary.main',
    },
    '& .story-author': {
      fontSize: '1rem',
      fontStyle: 'italic',
      color: 'text.secondary',
    },
    '& .story-details': {
      maxHeight: '200px', // Limit the max height of the story details
      overflow: 'hidden',
      position: 'relative',
    },
    '& .story-details-expand': {
      position: 'absolute',
      bottom: '0',
      right: '0',
      background: 'linear-gradient(transparent, #f9f9f9)', // Create a gradient fade effect
      padding: '8px',
    },
  })
);

const StyledButton = styled(Button)(
  ({ theme }) => ({
    marginTop: theme.spacing(3),
  })
);

const SingleStoryGen = ({id}) => {

  const queryClient = useQueryClient()
   
    const [idState, setIdState] = useState("")

    const storys = queryClient.getQueryData("storyCache")
    
    const dispatch = useDispatch();
    const [active, setActive] = useContext(MyContext)
    const allStories = storys.story
  
    const realId =  idState?  idState : id
  
    const story =  storys.story.find((story) => story._id === realId);

    const handleClick = (id) => {
      setActive("SingleStory")
      setIdState(id)
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      })
    }
  
    if(!story){
        return (
        <section>
            <h2>Post not found</h2>
        </section>
        )
    }

    return (
        <div>
         <Container sx={{ marginLeft: {lg: -10}}}>
            <StyledCard variant="outlined">
              <StyledCardContent>
                <Typography variant="h5" color="text.secondary" className='story-title'>
                  {story.storyTitle}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {story.storyGenre}
                </Typography>
                <Typography sx={{ marginTop: 2 }} variant="body2" className='story-details'>
                  {story.storyDetailed}
                </Typography>
                <Typography sx={{ marginTop: 1, marginBottom: 2 }} variant="body2" className='story-author'>
                  {story.storyAuthor ? `by ${story.storyAuthor}` : 'unknown author'}
                </Typography>
              </StyledCardContent>
            </StyledCard>
            <Box>
            <Typography variant="h6" gutterBottom sx={{ marginTop: 10, marginBottom: 3,textAlign: "center"}}>
              Other Stories
            </Typography>
            </Box>
          <Grid container spacing={5}>
              {allStories.map((otherStory) => (
              <Grid key={otherStory._id} item xs={12} md={6} sx={{ marginTop: 0, }}>
                <StyledCard
                  variant="outlined"
                  sx={{ marginBottom: 2 ,}}
                >
                  <StyledCardContent>
                    <Typography variant="h6" color="text.secondary" className='story-title'>
                      {otherStory.storyTitle}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {otherStory.storyGenre}
                    </Typography>
                    <Typography variant="body2" className='story-title'>
                      {otherStory.storyDetailed?.substring(0, 200) + '...'}
                    </Typography>
                    <Typography variant="body2" className='story-author'>
                      {otherStory.storyAuthor ? `by ${otherStory.storyAuthor}` : 'unknown author'}
                    </Typography>
                    <StyledButton
                      onClick={() => handleClick(otherStory._id)}
                      variant="outlined"
                      color="primary"
                    >
                      Read More
                    </StyledButton>
                  </StyledCardContent>
                </StyledCard>
              </Grid>
              ))}
            </Grid>
      </Container>
    </div>
    )
}

SingleStoryGen.propTypes = {};

export { SingleStoryGen };
