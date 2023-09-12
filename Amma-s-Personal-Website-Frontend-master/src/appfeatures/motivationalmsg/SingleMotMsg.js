import React from 'react';
import PropTypes from 'prop-types';
import DenseAppBar from '../../Components/BasicBar';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { useParams, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectMotMsgById } from './motmsgSlice';
const SingleMotMsg = props => {

    const { id } = useParams()
    
    const motmsg = useSelector(state => selectMotMsgById(state, id))

    if(!motmsg){
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
                {motmsg.motMessageTitle}
           </Typography>
           <Typography sx={{marginTop: 2}} variant="body2">
              {motmsg.motMessageDetails}
           </Typography>
           <Typography sx={{ marginTop: 1, marginBottom: 2}} variant="body2">
               {
               motmsg.motMessageAuthor ? `by ${motmsg.motMessageAuthor}` : "unknown author"
              }
        </Typography>
        <NavLink to = {`/editmotmsg/${motmsg._id}`}>Edit Message</NavLink>
            </CardContent>
        </Card>
        </Box>
    </div>
    );
};

SingleMotMsg.propTypes = {};

export { SingleMotMsg };