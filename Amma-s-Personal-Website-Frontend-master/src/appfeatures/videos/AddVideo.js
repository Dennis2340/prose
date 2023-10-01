import React, { useContext, } from 'react';
import { TextField, Button, Box, Typography, Input } from '@mui/material';
import { useFormik } from 'formik';
import { addNewVideoQuery, } from './videoSlice';
import { MyAdminContext } from '../../pages/Admin';
import { useMutation, useQueryClient, } from 'react-query';
import Swal from "sweetalert2";

const AddVideo = () => {

  const Toast = Swal.mixin({
    toast: true,
    position: 'center',
    timer: 3000,
    timerProgressBar: true,
    showConfirmButton: false,
    
  })

  const queryClient = useQueryClient()
  const addNewVideoMutation = useMutation(addNewVideoQuery, {
    onMutate: async (newVideoData) => {
      // Optimistically add the new poem to the cache
      queryClient.setQueryData('videos', (oldData) => {
        console.log(oldData)
        return {
          ...oldData,
          data: [
            ...(oldData?.videos || []),
            {
              _id: 'temp-id', // Generate a temporary ID for the optimistic update
              ...newVideoData,
            },
          ],
        };
      });
    },
    onError: (error) => {
        Toast.fire({
            icon: 'error',
            title: 'Error',
            text: error.message,
        })
      console.error('Error adding new Video:', error);
    },
    onSuccess: (data, variables, context) => {
        // Assuming your backend returns a success status code (e.g., 200)
          // Display a success toast
          Toast.fire({
            icon: 'success',
            title: 'Video Added Successfully',
            text: data.message,
          });
        
      },
    onSettled: () => {
      // Refetch the poems after the mutation is settled
      queryClient.invalidateQueries('videos');
    },
  });


  const [active, setActive] = useContext(MyAdminContext)
  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      video: null, // Store the file object here
    },
    onSubmit: async(values) => {
      try {
        await addNewVideoMutation.mutateAsync(values); // Use the mutation function
        formik.resetForm(); // Reset the form
        setActive("Videos")
      } catch (error) {
        console.log(error.message);
      }
    },
  });

  const handleFileChange = (event) => {
    formik.setFieldValue('video', event.currentTarget.files[0]);
  };

  return (
    <div style={{maxWidth: "708.667px"}}>
     
      <Box sx={{textAlign: "center", }}>
        <Typography variant="h4" component="h3">
          Add New Video
        </Typography>
        <Box
          sx={{
            display: {xs:"block", sm: "block"},
            marginTop: 5,
            marginLeft: "auto",
            marginRight: "auto"
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
        </Box>
      </Box>
    </div>
  );
};

AddVideo.propTypes = {};

export { AddVideo };
