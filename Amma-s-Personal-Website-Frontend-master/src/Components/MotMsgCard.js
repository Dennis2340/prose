import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { NavLink } from 'react-router-dom';

const bull = (
    <Box
      component="span"
      sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
      •
    </Box>
  );

  export default function BasicCard({motmsg}) {
    return (
      <Card sx={{ minWidth: 275, marginBottom: 5, width: {xs : "50%", sm: "100%"} }}>
        <CardContent>
          <Typography  variant='h5' color="text.secondary" >
             {motmsg.motMessageTitle}
          </Typography>
          <Typography sx={{marginTop: 2}} variant="body2">
            {motmsg.motMessageDetails?.substring(0,40) + "..."}
          </Typography>
          <Typography sx={{ marginTop: 1}} variant="body2">
            {
              motmsg.motMessageAuthor ? `by ${motmsg.motMessageAuthor}` : "unknown author"
            }
            
          </Typography>
          <NavLink to = {`/singlemotmsg/${motmsg._id}`}>view</NavLink>
        </CardContent>
        
      </Card>
    );
  }