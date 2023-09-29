import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import DenseAppBar from '../../Components/BasicBar';
import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { deleteVideo, fetchVideos, selectVideoById, getAllVideos } from './videoSlice';
import LinearProgress from '@mui/material/LinearProgress';
import axios from 'axios';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { Container, styled } from '@mui/system';
import { MyAdminContext } from '../../pages/Admin';
import Grid from '@mui/system/Unstable_Grid/Grid';
import { Video } from '../../pages/Video';

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

const SingleVideo = ({id}) => {

  const [idState, setIdState] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [active, setActive] = useContext(MyAdminContext)
  
  const [videoUrl, setVideoUrl] = useState('');
  const isAuthenticated = useSelector(state => state.user.isAuthenticated)

  const [deleteLoad, setDeleteLoad] = useState(false)

  console.log(isAuthenticated)

  const realId = idState ? idState : id
  const video = useSelector(state => selectVideoById(state, realId))

  const allVideos = useSelector(getAllVideos);

  useEffect(() => {
    const fetchVideoUrl = async () => {
      try {
        await dispatch(fetchVideos())
        const response = await axios.get(`http://localhost:3600/getSingleVideo/${realId}`, {
          responseType: 'blob', // Set the response type to 'blob' to handle binary data
        });
        // Create a URL object from the received blob data
        const videoBlob = new Blob([response.data], { type: 'video/mp4' });
        const videoUrl = URL.createObjectURL(videoBlob);
        console.log(videoUrl)
        setVideoUrl(videoUrl);
      } catch (error) {
        console.error('Error fetching video URL:', error);
      }
    };

     fetchVideoUrl();
  }, [realId, dispatch]);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

const paddingTopValue = isSmallScreen ? '150%' : '56.46%';

const handleDelete = async() => {
    setDeleteLoad(true)
    await dispatch(deleteVideo(video))
    await dispatch(fetchVideos())
    setDeleteLoad(false)
}

  return (
    <div>
      <Container sx={{ marginLeft: {lg: -10}}}>
           <Typography sx={{ marginBottom: 4, marginLeft: {xs:4, sm: 40} }} variant="h5" color="text.secondary">
              {video?.title}
              </Typography>
              <Box>
                {
                  deleteLoad ? (
                    <div>
                      <Box sx={{marginLeft: 4, marginBottom: 5, marginTop: 10, }}>
                      </Box>
                      <Box sx={{marginLeft: {xs:10, sm: 30}}}><p>Deleting...</p></Box>
                      <Box sx={{marginLeft: {xs: 10, sm: 30}, marginBottom: {xs: 3, }, width: {xs : 150, sm: 300}}}>
                        <LinearProgress/>
                        </Box>
                      </div>
                  ) : null
                }
              </Box>
            <StyledCard >
            <StyledCardContent>
                <Box sx={{marginBottom: {xs: 2, sm: 2}, marginLeft: {xs:8, sm: 38} }}>
                <StyledButton
                variant='outlined'
                size='small'
                onClick={handleDelete}
                
                  >
                    delete
                  </StyledButton>
              </Box>  
            <Box style={{ position: 'relative', paddingTop: paddingTopValue, marginBottom: 2 ,}}>
              {videoUrl ? (
                <video 
                controls
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                >
                  <source src={videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <div
                
                >
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
            <Typography variant="h6" gutterBottom sx={{ marginTop: 10, marginBottom: 3,textAlign: "center"}}>
              Other Videos
            </Typography>
            </Box>
            <Grid container spacing={2}>
                { allVideos.map((otherVideo) => (
                  <Grid item xs={12} md={6} sx={{ marginTop: 0, }}>
                    <Video key={otherVideo._id}/>
                  </Grid>
                ))}
            </Grid>
      </Container>
    </div>
  );
};

SingleVideo.propTypes = {};

export { SingleVideo };
