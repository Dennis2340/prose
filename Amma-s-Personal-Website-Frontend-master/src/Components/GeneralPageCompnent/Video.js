import React, {useState, useContext} from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { styled } from '@mui/system';
import { PlayArrow } from '@mui/icons-material';
import { MyContext } from '../../Layout';


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

const VideoComp = ({video, videoId}) => {

  const [active, setActive] = useContext(MyContext)
  
  if (!video || !video.videoUrl) {
    return null; // Return early or show an error message if the video or videoUrl is undefined
  }
  const url = video.videoUrl
  const filename = url.split("/")
  const mainUrl = filename[filename.length - 1]

 

  const handleClick = (id) => {
    setActive("SingleVideo")
    videoId(id)
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }
  console.log(mainUrl)
    return (
    <div>
      <StyledCard sx={{ marginTop: 4, }}>
      <StyledCardContent>
        <Typography style={{marginBottom: 2}} variant='h5' color="text.secondary" >
          {video.title}
        </Typography>
        <Box sx={{
          width: '100%',
          height: '100%',
          marginTop: 1,
        }}>
        <video controls>
        <source src={mainUrl} type="video/mp4" />
        Your browser does not support the video tag.
          </video> 
        </Box>
        <Typography sx={{ marginTop: 1}} variant="body2">
              {video.description}
        </Typography>
        <StyledButton
          onClick={()=> handleClick(video._id)}
          variant="outlined"
          color="primary"
        >
          <PlayArrow/> View
        </StyledButton>
      </StyledCardContent>
      
    </StyledCard>
    </div>
    );
};


VideoComp.propTypes = {};

export { VideoComp };