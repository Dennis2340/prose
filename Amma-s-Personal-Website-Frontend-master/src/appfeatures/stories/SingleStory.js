import React, { useContext, useState } from 'react';
import { Box, Card, CardContent, Typography, Container, Grid,Button } from '@mui/material';
import { styled } from '@mui/system';
import { MyAdminContext } from '../../pages/Admin';
import { useQueryClient } from 'react-query';

const StyledCard = styled(Card)(
  ({ theme }) => ({
    width: '100%',
    height: '100%',
    textAlign: 'center',
    maxWidth: 500,
    margin: 'auto',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
    transition: '0.3s',
    '&:hover': {
      boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
    },
  })
);

const StyledCardContent = styled(CardContent)(
  ({ theme }) => ({
    padding: theme.spacing(2),
  })
);

const StyledButton = styled(Button)(
  ({ theme }) => ({
    marginTop: theme.spacing(3),
  })
);


const SingleStory = ({id}) => {
  const [idState, setIdState] = useState("")

  const queryClient = useQueryClient()
  const storys = queryClient.getQueryData("stories")
 
  const [active, setActive] = useContext(MyAdminContext)
  const allStories = storys.story
  
  const realId = idState ? idState : id

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
                <Typography variant="h5" color="text.secondary">
                  {story.storyTitle}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {story.storyGenre}
                </Typography>
                <Typography sx={{ marginTop: 2 }} variant="body2">
                  {story.storyDetailed}
                </Typography>
                <Typography sx={{ marginTop: 1, marginBottom: 2 }} variant="body2">
                  {story.storyAuthor ? `by ${story.storyAuthor}` : 'unknown author'}
                </Typography>
                <StyledButton
                  onClick={() => setActive("EditStory")}
                  variant="outlined"
                  color="primary"
                  >
                  Edit Story
                </StyledButton>
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
                    <Typography variant="h6" color="text.secondary">
                      {otherStory.storyTitle}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {otherStory.storyGenre}
                    </Typography>
                    <Typography variant="body2">
                      {otherStory.storyDetailed?.substring(0, 40) + '...'}
                    </Typography>
                    <Typography variant="body2">
                      {otherStory.storyAuthor ? `by ${otherStory.storyAuthor}` : 'unknown author'}
                    </Typography>
                    <StyledButton
                      onClick={() => handleClick(otherStory._id)}
                      variant="outlined"
                      color="primary"
                    >
                      View
                    </StyledButton>
                  </StyledCardContent>
                </StyledCard>
              </Grid>
              ))}
            </Grid>
      </Container>
    </div>
    );
};

SingleStory.propTypes = {};

export { SingleStory };