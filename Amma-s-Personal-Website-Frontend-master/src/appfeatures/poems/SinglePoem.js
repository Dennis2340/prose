import React from 'react';
import PropTypes from 'prop-types';
import DenseAppBar from '../../Components/BasicBar';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { useParams, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectPoemById } from './poemSlice';

const SinglePoem = props => {

    const { id } = useParams()
    
    const poem = useSelector(state => selectPoemById(state, id))

    if(!poem){
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
                {poem.poemTitle}
           </Typography>
           <Typography sx={{marginTop: 2}} variant="body2">
              {poem.poemDetails}
           </Typography>
           <Typography sx={{ marginTop: 1, marginBottom: 2}} variant="body2">
               {
               poem.poemAuthor ? `by ${poem.poemAuthor}` : "unknown author"
              }
        </Typography>
        <NavLink to = {`/editpoem/${poem._id}`}>Edit poem</NavLink>
            </CardContent>
        </Card>
     </Box>
    </div>
    )
    ;
};

SinglePoem.propTypes = {};

export { SinglePoem };