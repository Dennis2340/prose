import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import DenseAppBar from '../../Components/BasicBar';
import { Box, Card, CardContent, Typography, Container, Grid } from '@mui/material';
import { useParams, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPoems, selectPoemById, getAllPoems } from './poemSlice';

const SinglePoem = (props) => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const poem = useSelector((state) => selectPoemById(state, id));
  const allPoems = useSelector(getAllPoems);

  useEffect(() => {
    // Fetch all poems when the component mounts
    dispatch(fetchPoems());
  }, [dispatch]);

  if (!poem) {
    return (
      <section>
        <h2>Post not found</h2>
      </section>
    );
  }

  return (
    <div>
      <DenseAppBar />
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <Card variant="outlined" sx={{ marginTop: 12 }}>
              <CardContent>
                <Typography variant="h5" color="text.secondary">
                  {poem.poemTitle}
                </Typography>
                <Typography sx={{ marginTop: 2 }} variant="body2">
                  {poem.poemDetails}
                </Typography>
                <Typography sx={{ marginTop: 1, marginBottom: 2 }} variant="body2">
                  {poem.poemAuthor ? `by ${poem.poemAuthor}` : 'unknown author'}
                </Typography>
                <NavLink to={`/editpoem/${poem._id}`}>Edit poem</NavLink>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4} sx={{ marginTop: 10 }}>
            <Typography variant="h6" gutterBottom>
              Other Poems
            </Typography>
            <div
              style={{
                overflowX: 'auto',
                whiteSpace: 'nowrap',
                width: '100%',
                maxWidth: '100%', // Ensure horizontal overflow
              }}
            >
              {allPoems.map((otherPoem) => (
                <Card
                  key={otherPoem._id}
                  variant="outlined"
                  sx={{ marginBottom: 2 }}
                >
                  <CardContent>
                    <Typography variant="h6" color="text.secondary">
                      {otherPoem.poemTitle}
                    </Typography>
                    <Typography variant="body2">
                      {otherPoem.poemDetails?.substring(0, 40) + '...'}
                    </Typography>
                    <Typography variant="body2">
                      {otherPoem.poemAuthor ? `by ${otherPoem.poemAuthor}` : 'unknown author'}
                    </Typography>
                    <NavLink to={`/singlepoem/${otherPoem._id}`}>View poem</NavLink>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

SinglePoem.propTypes = {};

export { SinglePoem };
