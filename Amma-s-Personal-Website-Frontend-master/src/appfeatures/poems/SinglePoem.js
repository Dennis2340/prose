import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import DenseAppBar from '../../Components/BasicBar';
import { Box, Card, CardContent, Typography, Container, Grid,Button } from '@mui/material';
import { useParams, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPoems, selectPoemById, getAllPoems } from './poemSlice';
import { styled } from '@mui/system';
import { MyAdminContext } from '../../pages/Admin';

const StyledCard = styled(Card)(
  ({ theme }) => ({
    width: '100%',
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

const SinglePoem = ({id}) => {
  const [idState, setIdState] = useState("")

  const dispatch = useDispatch();
  const [active, setActive] = useContext(MyAdminContext)
  const allPoems = useSelector(getAllPoems);

  const realId = idState ? idState : id
  const poem = useSelector((state) => selectPoemById(state, realId));
  useEffect(() => {
    // Fetch all poems when the component mounts
    dispatch(fetchPoems());
  }, [dispatch]);

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
                <Typography variant="h5" color="text.secondary">
                  {poem.poemTitle}
                </Typography>
                <Typography sx={{ marginTop: 2 }} variant="body2">
                  {poem.poemDetails}
                </Typography>
                <Typography sx={{ marginTop: 1, marginBottom: 2 }} variant="body2">
                  {poem.poemAuthor ? `by ${poem.poemAuthor}` : 'unknown author'}
                </Typography>
                <StyledButton
                  onClick={() => setActive("EditPoem")}
                  variant="outlined"
                  color="primary"
                  >
                  Edit Poem
                </StyledButton>
              </StyledCardContent>
            </StyledCard>
            <Box>
            <Typography variant="h6" gutterBottom sx={{ marginTop: 10, marginBottom: 3,textAlign: "center"}}>
              Other Poems
            </Typography>
            </Box>
          <Grid container spacing={2}>
              {allPoems.map((otherPoem) => (
              <Grid item xs={12} md={6} sx={{ marginTop: 0, }}>
                <StyledCard
                  key={otherPoem._id}
                  variant="outlined"
                  sx={{ marginBottom: 2 ,}}
                >
                  <StyledCardContent>
                    <Typography variant="h6" color="text.secondary">
                      {otherPoem.poemTitle}
                    </Typography>
                    <Typography variant="body2">
                      {otherPoem.poemDetails?.substring(0, 40) + '...'}
                    </Typography>
                    <Typography variant="body2">
                      {otherPoem.poemAuthor ? `by ${otherPoem.poemAuthor}` : 'unknown author'}
                    </Typography>
                    <StyledButton
                      onClick={() => handleClick(otherPoem._id)}
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

SinglePoem.propTypes = {};

export { SinglePoem };
