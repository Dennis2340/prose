import React from 'react';
import { TextField, Button,Box, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { updateStoryQuery, deleteStoryQuery, fetchStoryQuery } from './storySlice';
import {  useContext } from 'react';
import { MyAdminContext } from '../../pages/Admin';
import { useMutation, useQueryClient, useQuery } from 'react-query';
import Swal from "sweetalert2";

const EditStory = ({id}) => {

    const { data: storys } = useQuery('stories', fetchStoryQuery, {
        initialData: {
          storys: [],
        },
      });
    
      const story =  storys.story.find((story) => story._id === id);
 
      const queryClient = useQueryClient()
      const Toast = Swal.mixin({
        toast: true,
        position: 'center',
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
        
      })

    const [active, setActive] = useContext(MyAdminContext) 
  
    const updateStoryMutation = useMutation(
        async (updatedStory) => {
          try {
            // Use your existing function to update the poem
            const response = await updateStoryQuery(updatedStory);
    
            // Assuming your API returns the updated poem
            return response.data;
          } catch (error) {
            throw new Error(error.message);
          }
        },
        {
          onMutate: (newData) => {
            // Optimistically update the poem in the cache
            queryClient.setQueryData(['stories', id], (oldData) => {
              return {
                ...oldData,
                ...newData,
              };
            });
          },
          onError: (error) => {
            Toast.fire({
              icon: 'error',
              title: 'Error',
              text: error.message,
            });
            console.error('Error updating story:', error);
          },
          onSuccess: (data) => {
            Toast.fire({
              icon: 'success',
              title: 'Story Updated Successfully',
              text: "Story updated successfully",
            });
          },
          onSettled: () => {
            // Refetch the storys after the mutation is settled
            queryClient.invalidateQueries('stories');
          },
        }
      );

      const deleteStoryMutation = useMutation(
        () => deleteStoryQuery(id),
        {
          onError: (error) => {
            Toast.fire({
              icon: 'error',
              title: 'Error',
              text: error.message,
            });
            console.error('Error deleting story:', error);
          },
          onSuccess: () => {
            Toast.fire({
              icon: 'success',
              title: 'Story deleted successfully',
            });
          },
          onSettled: () => {
            // Redirect or perform any other actions after deletion
            setActive('Stories');
          },
        }
      );

    const handleDelete = async(id) =>{
        await deleteStoryMutation.mutateAsync(id)
       setActive("Stories")
    }

    const formik = useFormik({
        initialValues: {
        _id : id,
        storyTitle: story?.storyTitle,
        storyGenre: story?.storyGenre,
        storyDetailed: story?.storyDetailed,
        storyAuthor: story?.storyAuthor
        },
        onSubmit: async(values) => {
            if(values){
            try{
                
                await updateStoryMutation.mutateAsync(values)
                setActive("Stories")
              
            }catch(error){
                console.log(error.message)
            }
        
            
        }
    }
    })

    return (
    <Box sx={{maxWidth: "708.667px",marginLeft: {xs: 0, lg: -5}}}>
         <Box sx={{textAlign: "center", marginLeft: {xs: 0, lg: -5}}}>
            <Typography variant="h4" component="h3">
                Edit Story
            </Typography>
        </Box>

        <Box
          sx={{
            display: {xs:"block", sm: "block"},
            marginTop: 5,
          }}
        >
            <div>
                <TextField
                 label="Title"
                 variant="outlined"
                fullWidth={true}
                name='storyTitle'
                value={formik.values.storyTitle}
                onChange={formik.handleChange}
                />
            </div>

            <div style={{marginTop: 40, marginButtom: "none"}}>
                <TextField
                 label="Genre"
                 variant="outlined"
                 fullWidth={true}
                 name='storyGenre'
                 value={formik.values.storyGenre}
                 onChange={formik.handleChange}
                />
            </div>

            <div style={{marginTop: 40, marginButtom: "none"}}>
                <TextField
                 label="Detailed"
                 variant="outlined"
                 fullWidth={true}
                 rows={4}
                 multiline
                 name='storyDetailed'
                 value={formik.values.storyDetailed}
                 onChange={formik.handleChange}
                />
            </div>

            <div style={{marginTop: 40, marginButtom: "none"}}>
                <TextField
                 label="Author"
                 variant="outlined"
                 fullWidth={true}
                 name='storyAuthor'
                 value={formik.values.storyAuthor}
                 onChange={formik.handleChange}
                />
            </div>

            <Box sx={{marginTop : 4}}>
                <Button
                 variant="contained"
                 fullWidth={true}
                 onClick={formik.handleSubmit}
                > 
                Update Story
                </Button>
                </Box>
                <Box sx={{marginTop : 2}}>
                <Button
                 variant="contained"
                 color='secondary'
                 fullWidth={true}
                 onClick={()=> handleDelete(formik.values._id)}
                > 
                Delete Story
                </Button>
            </Box>

        </Box>

    </Box>
    );
};

EditStory.propTypes = {};

export { EditStory };