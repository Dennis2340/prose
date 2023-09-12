import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TextField, Button, Box, Typography, Input } from '@mui/material';
import DenseAppBar from '../../Components/BasicBar';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { addNewVideo } from './videoSlice';
import { useNavigate } from 'react-router-dom';
import LinearProgress from '@mui/material/LinearProgress'
const AddVideo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [addRequestStatus, setAddRequestStatus] = useState('idle');

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      video: null, // Store the file object here
    },
    onSubmit: async(values) => {
      try {
        setAddRequestStatus('pending');
        await dispatch(addNewVideo(values));
        navigate('/video');
        window.location.reload()
        
      } catch (error) {
        console.log(error.message);
      }
    },
  });

  const handleFileChange = (event) => {
    formik.setFieldValue('video', event.currentTarget.files[0]);
  };

  return (
    <div>
      <DenseAppBar />
      <Box sx={{ textAlign: 'center', marginTop: 12 }}>
        <Typography variant="h4" component="h3">
          Add New Video
        </Typography>
        <Box
          sx={{
            width: { xs: '75%', sm: '50%' },
            display: { xs: 'block', sm: 'block' },
            marginTop: 5,
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          <div>
            <TextField
              label="Title"
              variant="outlined"
              fullWidth={true}
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
            />
          </div>
          <div style={{ marginTop: 40, marginButtom: 'none' }}>
            <Input
              type="file"
              onChange={handleFileChange}
              fullWidth
              inputProps={{
                accept: 'video/*',
                'aria-label': 'Upload video',
              }}
            />
          </div>
          <div style={{ marginTop: 40, marginButtom: 'none' }}>
            <TextField
              label="Description"
              variant="outlined"
              rows={4}
              multiline
              fullWidth={true}
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
            />
          </div>
          <Box sx={{ marginTop: 4 }}>
            <Button
              variant="contained"
              fullWidth={true}
              onClick={formik.handleSubmit}
            >
              Add Video
            </Button>
          </Box>
          {
            addRequestStatus === "pending" ? <Box sx={{marginTop: 4}}>
              
              <LinearProgress/>
              
              </Box> : null
          }
        </Box>
      </Box>
    </div>
  );
};

AddVideo.propTypes = {};

export { AddVideo };
