import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { NavLink } from 'react-router-dom';

const VideoComp = ({video}) => {

  if (!video || !video.videoUrl) {
    return null; // Return early or show an error message if the video or videoUrl is undefined
  }
  const url = video.videoUrl
  const filename = url.split("/")
  const mainUrl = filename[filename.length - 1]
  console.log(mainUrl)
    return (
    <div>
      <Card sx={{ minWidth: 275, marginBottom: 5, width: {xs : "50%", sm: "100%"} }}>
      <CardContent>
        <Typography style={{marginBottom: 2}} variant='h5' color="text.secondary" >
          {video.title}
          
        </Typography>
        <Box>
        <video controls>
        <source src={mainUrl} type="video/mp4" />
        Your browser does not support the video tag.
          </video> 
        </Box>
        <Typography sx={{ marginTop: 1}} variant="body2">
              {video.description}
        </Typography>
        <NavLink to = {`/singlevideo/${video._id}`}>view</NavLink>
      </CardContent>
      
    </Card>
    </div>
    );
};


VideoComp.propTypes = {};

export { VideoComp };