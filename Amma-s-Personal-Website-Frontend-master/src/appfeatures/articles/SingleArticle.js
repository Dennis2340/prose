import React from 'react';
import PropTypes from 'prop-types';
import DenseAppBar from '../../Components/BasicBar';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { useParams, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectArticleById } from './articleSlice';
const SingleArticle = props => {

    const { id } = useParams()
    
    const article = useSelector(state => selectArticleById(state, id))

    if(!article){
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
                {article.articleTitle}
           </Typography>
           <Typography sx={{marginTop: 2}} variant="body2">
              {article.articleDetailed}
           </Typography>
           <Typography sx={{ marginTop: 1, marginBottom: 2}} variant="body2">
               {
               article.articleAuthor ? `by ${article.articleAuthor}` : "unknown author"
              }
        </Typography>
        <NavLink to = {`/editarticle/${article._id}`}>Edit article</NavLink>
            </CardContent>
        </Card>
        </Box>
    </div>
    )
    ;
};

SingleArticle.propTypes = {};

export { SingleArticle };