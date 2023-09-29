import React, { useContext } from 'react';
import { TextField, Button,Box, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { addNewStoryQuery } from './storySlice';
import { MyAdminContext } from '../../pages/Admin';
import { useMutation, useQueryClient, } from 'react-query';
import Swal from "sweetalert2";

const AddStory = props => {


    const Toast = Swal.mixin({
        toast: true,
        position: 'center',
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
        
      })

    const queryClient = useQueryClient()
    const addNewStoryMutation = useMutation(addNewStoryQuery, {
        onMutate: async (newStoryData) => {
          // Optimistically add the new poem to the cache
          queryClient.setQueryData('stories', (oldData) => {
            return {
              ...oldData,
              story: [
                ...oldData.story,
                {
                  _id: 'temp-id', // Generate a temporary ID for the optimistic update
                  ...newStoryData,
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
          console.error('Error adding new Story:', error);
        },
        onSuccess: (data, variables, context) => {
            // Assuming your backend returns a success status code (e.g., 200)
              // Display a success toast
              Toast.fire({
                icon: 'success',
                title: 'Story Added Successfully',
                text: data.message,
              });
            
          },
        onSettled: () => {
          // Refetch the poems after the mutation is settled
          queryClient.invalidateQueries('poems');
        },
      });
    
    const [active, setActive] = useContext(MyAdminContext)
    
    const formik = useFormik({
        initialValues: {
        storyTitle: "",
        storyGenre: "",
        storyDetailed: "",
        storyAuthor: ""
        },
        onSubmit: async(values) => {
            if(values){
            try{
                
                await addNewStoryMutation.mutateAsync(values); // Use the mutation function
                formik.resetForm(); // Reset the form
               setActive("Stories")
                
              
            }catch(error){
                console.log(error.message)
            }
        
            
        }
    }
    })
    
    return (
    <div style={{maxWidth: "708.667px"}}>
       
         <Box sx={{textAlign: "center",}}>
            <Typography variant="h4" component="h3">
                Add New Story
            </Typography>
        </Box>

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
                Add Story
                </Button>
            </Box>
            

        </Box>

    </div>
    );
};

AddStory.propTypes = {};

export { AddStory };