import React, { useContext, useState, } from 'react';
import { Box, Card, CardContent, Typography, Container, Grid,Button } from '@mui/material';
import { styled } from '@mui/system';
import { MyContext } from '../../Layout';
import { useQueryClient } from 'react-query';

const StyledCard = styled(Card)(
    ({ theme }) => ({
      width: '100%',
      height: '100%',
      textAlign: 'center',
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
      '& .poem-title': {
        fontSize: '1.5rem',
        color: 'primary.main',
      },
      '& .poem-author': {
        fontSize: '1rem',
        fontStyle: 'italic',
        color: 'text.secondary',
      },
      '& .poem-details': {
        maxHeight: '200px', // Limit the max height of the poem details
        overflow: 'hidden',
        position: 'relative',
      },
      '& .poem-details-expand': {
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

  const SinglePoemGen = ({id}) => {
    const [idState, setIdState] = useState("")

    
    const queryClient = useQueryClient()
 

    const poems = queryClient.getQueryData('poemCache');
    console.log(poems)
    const [active, setActive] = useContext(MyContext)
    const allPoems = poems.poems
  
    const realId = idState ? idState : id
    const poem =  poems.poems.find((poem) => poem._id === realId);
 
  
    const handleClick = (id) => {
        setActive("SinglePoem")
        setIdState(id)
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        })
    }
      if (!poem) {
        return (
          <section>
            <h2>Post not found</h2>
          </section>
        );
    }

    return (
        <div>
          <Container sx={{ marginLeft: {lg: -10}}}>
            <StyledCard variant="outlined">
              <StyledCardContent>
                <Typography variant="h5" color="text.secondary" className='poem-title'>
                  {poem.poemTitle}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {poem.poemGenre}
                </Typography>
                <Typography sx={{ marginTop: 2 }} variant="body2" className='poem-details'>
                  {poem.poemDetails}
                </Typography>
                <Typography sx={{ marginTop: 1, marginBottom: 2 }} variant="body2" className='poem-author'>
                  {poem.poemAuthor ? `by ${poem.poemAuthor}` : 'unknown author'}
                </Typography>
              </StyledCardContent>
            </StyledCard>
            <Box>
            <Typography variant="h6" gutterBottom sx={{ marginTop: 5, marginBottom: 3,textAlign: "center"}}>
              Other Poems
            </Typography>
            </Box>
          <Grid container spacing={3}>
              {allPoems.map((otherPoem) => (
              <Grid key={otherPoem._id} item xs={12} md={6} sx={{ marginTop: 0, }}>
                <StyledCard
                  variant="outlined"
                  sx={{ marginBottom: 2 ,}}
                >
                  <StyledCardContent>
                    <Typography variant="h6" color="text.secondary" className='poem-title'>
                      {otherPoem.poemTitle}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {otherPoem.poemGenre}
                    </Typography>
                    <Typography variant="body2" className='poem-details'>
                    {otherPoem.poemDetails?.substring(0, 200) + '...'}
                    </Typography>
                    <Typography variant="body2" className='poem-author'>
                      {otherPoem.poemAuthor ? `by ${otherPoem.poemAuthor}` : 'unknown author'}
                    </Typography>
                    <StyledButton
                      onClick={() => handleClick(otherPoem._id)}
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

export { SinglePoemGen };