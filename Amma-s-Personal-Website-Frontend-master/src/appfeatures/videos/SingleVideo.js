import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import DenseAppBar from '../../Components/BasicBar';
import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { deleteVideo, fetchVideos, selectVideoById } from './videoSlice';
import LinearProgress from '@mui/material/LinearProgress';
import axios from 'axios';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
const SingleVideo = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams();
  const [videoUrl, setVideoUrl] = useState('');
  const isAuthenticated = useSelector(state => state.user.isAuthenticated)

  const [deleteLoad, setDeleteLoad] = useState(false)

  console.log(isAuthenticated)

  const video = useSelector(state => selectVideoById(state, id))
  console.log(video)
  useEffect(() => {
    const fetchVideoUrl = async () => {
      try {
        dispatch(fetchVideos())
        const response = await axios.get(`http://localhost:3600/getSingleVideo/${id}`, {
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
  }, [id, dispatch]);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

const paddingTopValue = isSmallScreen ? '150%' : '56.46%';

const handleDelete = async() => {
    setDeleteLoad(true)
    await dispatch(deleteVideo(video))
    setDeleteLoad(false)
    navigate("/video")
     window.location.reload()
}

  return (
    <div>
      <DenseAppBar />
      <Box sx={{ marginTop: { xs: 11, sm: 15 }, marginLeft: {xs: 3,sm: 20}  }}>
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
            <Card sx={{ minWidth: 275, marginBottom: 5,height:{xs: 400, sm: "50%"}, width: { xs: '60%', sm: '70%' }}}>
            <CardContent>
             {
              isAuthenticated ? (
                <Box sx={{marginBottom: {xs: 2, sm: 2}, marginLeft: {xs:8, sm: 38} }}>
                <Button
                variant='outlined'
                size='small'
                onClick={handleDelete}
                
                  >
                    delete
                  </Button>
                  </Box>
              ) : null
             }
            
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
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

SingleVideo.propTypes = {};

export { SingleVideo };
