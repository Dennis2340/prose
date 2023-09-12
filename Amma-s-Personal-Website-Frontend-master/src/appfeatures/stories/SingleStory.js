import React from 'react';
import PropTypes from 'prop-types';
import DenseAppBar from '../../Components/BasicBar';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { useParams, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectStoryById } from './storySlice';
const SingleStory = props => {

    const { id } = useParams()
    
    const story = useSelector(state => selectStoryById(state, id))

    if(!story){
        return (
          <section>
            <h2>Post not found</h2>
          </section>
        )
      }
    return (
    <div>
        <DenseAppBar/>
        <Box>
        <Card variant='outlined' sx={{ minWidth: 275, marginBottom: 5,marginTop: 15, marginLeft: 2, width: {xs : "50%", sm: "75%"} }}>
            <CardContent>
            <Typography  variant='h5' color="text.secondary" >
                {story.storyTitle}
           </Typography>
           <Typography sx={{marginTop: 2}} variant="body2">
              {story.storyDetailed}
           </Typography>
           <Typography sx={{ marginTop: 1, marginBottom: 2}} variant="body2">
               {
               story.storyAuthor ? `by ${story.storyAuthor}` : "unknown author"
              }
        </Typography>
        <NavLink to = {`/editstory/${story._id}`}>Edit story</NavLink>
            </CardContent>
        </Card>
        </Box>
    </div>
    );
};

SingleStory.propTypes = {};

export { SingleStory };