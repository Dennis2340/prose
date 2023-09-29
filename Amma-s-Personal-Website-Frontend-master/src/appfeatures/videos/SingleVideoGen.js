import React, { useEffect, useState, useContext } from 'react';
import { Box, Button, Card, CardContent, Typography, Skeleton } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { deleteVideo, fetchVideosQuery, selectVideoById, getAllVideos } from './videoSlice';
import LinearProgress from '@mui/material/LinearProgress';
import axios from 'axios';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { Container, styled } from '@mui/system';
import { MyContext } from '../../Layout';
import Grid from '@mui/system/Unstable_Grid/Grid';
import { VideoComp } from '../../Components/GeneralPageCompnent/Video';
import { PlayArrow } from '@mui/icons-material';
import { useQuery, useQueryClient } from 'react-query';
import ReactPlayer from 'react-player';

const StyledCard = styled(Card)(
  ({ theme }) => ({
    width: '100%',
    textAlign: 'center',
    maxWidth: 500,
    height: '50vh',
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

const SingleVideo = ({id}) => {

    const { data: videos, isLoading, isError, error, isSuccess } = useQuery('videos', fetchVideosQuery); // Replace 'fetchStories' with your fetch function

  const [idState, setIdState] = useState("")
  const dispatch = useDispatch()
   
  const [active, setActive] = useContext(MyContext)
  
  const [videoUrl, setVideoUrl] = useState('');
  const [isLoad,setIsLoad] = useState(false)
  const realId = idState ? idState : id
  const video =  videos.videos.find((video) => video._id === realId);

  
  const allVideos = videos.videos

  useEffect(() => {
    const fetchVideoUrl = async () => {
      try {
        setIsLoad(true)
        const response = await axios.get(`http://localhost:3600/video/getSingleVideo/${realId}`, {
          responseType: 'blob', // Set the response type to 'blob' to handle binary data
        });
        // Create a URL object from the received blob data
        const videoBlob = new Blob([response.data], { type: 'video/mp4' });
        const videoUrl = URL.createObjectURL(videoBlob);
        console.log(videoUrl)
        setVideoUrl(videoUrl);
        setIsLoad(false)
      } catch (error) {
        console.error('Error fetching video URL:', error);
      }
    };

     fetchVideoUrl();
  }, [realId, dispatch, id]);

 
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

const paddingTopValue = isSmallScreen ? '150%' : '56.46%';

const handleClick = async(id) => {
    console.log(id)
    setActive("SingleVideo")
    setIdState(id)
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })

  
    // try {
    //     const response = await axios.get(`http://localhost:3600/video/getSingleVideo/${id}`, {
    //       responseType: 'blob', // Set the response type to 'blob' to handle binary data
    //     });
    //     const videoBlob = new Blob([response.data], { type: 'video/mp4' });
    //     const videoUrl = URL.createObjectURL(videoBlob);
    //     console.log(videoUrl)
    //     setVideoUrl(videoUrl);
    // } catch (error) {
    //   console.error('Error fetching video URL:', error);
    // }
  }

  return (
    <div>
       {
        isLoad ? (
             <StyledCard>
            <CardContent>
              <Typography variant="h5" sx={{marginLeft: 10}}>
                <Skeleton animation="wave" height={24} width="80%" />
              </Typography>
              <Skeleton animation="wave" variant="rectangular" height={140} />
              <Typography  sx={{marginLeft: 15}}>
                <Skeleton animation="wave" variant='rectangular' height={32} width="40%" />
              </Typography>
            </CardContent>
          </StyledCard>
        ) : (
            <Container sx={{ marginLeft: {lg: -10}}}>
           <Typography sx={{ marginBottom: 4, }} variant="h5" color="text.secondary">
              {video?.title}
              </Typography>
              
                <StyledCard >
                <StyledCardContent> 
                <Box >
                    {videoUrl ? (
                        <ReactPlayer
                        url={videoUrl}
                        controls
                        width="100%"
                        height="100%"
                        playing // Auto play the video
                        muted // Mute the video (optional)
                      />
                    ) : (
                        <div>
                        <Box sx={{marginLeft: 4, marginBottom: 2, marginTop: -35}}>
                            <Typography>
                            Loading video...
                            </Typography>
                        </Box>
                                    
                        <Box sx={{marginLeft: {xs: 2, sm: 1}}}>
                            <LinearProgress/>
                        </Box>
                        </div>
                    )}
                </Box>
                <Typography sx={{ marginTop: 5 }} variant="body2">
                {video?.description}
                </Typography>
                </StyledCardContent>
             </StyledCard>
                 <Box>
                {/* <Typography variant="h6" gutterBottom sx={{ marginTop: 10, marginBottom: 3,textAlign: "center"}}>
                Other Videos
                </Typography> */}
                </Box>
                
                
        </Container>
        )
       }
    </div>
  );
};

SingleVideo.propTypes = {};

export { SingleVideo };
