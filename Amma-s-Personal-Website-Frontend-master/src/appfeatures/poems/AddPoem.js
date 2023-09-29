import React, { useContext } from 'react';
import { TextField, Button,Box, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { addNewPoemQuery, fetchPoemsQuery} from './poemSlice';
import { MyAdminContext } from '../../pages/Admin';
import { useMutation, useQueryClient, useQuery } from 'react-query';
import Swal from "sweetalert2";

const AddPoem = props => {

    // eslint-disable-next-line no-unused-vars
    const { data: poems, isLoading, isError, error } = useQuery('poems', fetchPoemsQuery, {
        initialData: {
          poems: [],
        },
      });

    const Toast = Swal.mixin({
        toast: true,
        position: 'center',
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
        
      })

    const queryClient = useQueryClient()
    const addNewPoemMutation = useMutation(addNewPoemQuery, {
        onMutate: async (newPoemData) => {
          // Optimistically add the new poem to the cache
          queryClient.setQueryData('poems', (oldData) => {
            return {
              ...oldData,
              poems: [
                ...oldData.poems,
                {
                  _id: 'temp-id', // Generate a temporary ID for the optimistic update
                  ...newPoemData,
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
          console.error('Error adding new poem:', error);
        },
        onSuccess: (data, variables, context) => {
            // Assuming your backend returns a success status code (e.g., 200)
              // Display a success toast
              Toast.fire({
                icon: 'success',
                title: 'Poem Added Successfully',
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
        poemTitle: "",
        poemGenre: "",
        poemDetails: "",
        poemAuthor: ""
        },
        onSubmit: async(values) => {
            if(values){
            try{
              
                await addNewPoemMutation.mutateAsync(values); // Use the mutation function
                formik.resetForm(); // Reset the form
                setActive('Poems');
            }catch(error){
                console.log(error.message)
            }
        
            
        }
    }
    })
    
    return (
    <div style={{maxWidth: "708.667px"}}>
         <Box sx={{textAlign: "center", display: "flex", justifyContent: "center", alignItmes: "center",}}>
            <Typography variant="h4" component="h3">
                Add New Poem
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
                name='poemTitle'
                value={formik.values.poemTitle}
                onChange={formik.handleChange}
                />
            </div>

            <div style={{marginTop: 40, marginButtom: "none"}}>
                <TextField
                 label="Genre"
                 variant="outlined"
                 fullWidth={true}
                 name='poemGenre'
                 value={formik.values.poemGenre}
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
                 name='poemDetails'
                 value={formik.values.poemDetails}
                 onChange={formik.handleChange}
                />
            </div>

            <div style={{marginTop: 40, marginButtom: "none"}}>
                <TextField
                 label="Author"
                 variant="outlined"
                 fullWidth={true}
                 name='poemAuthor'
                 value={formik.values.poemAuthor}
                 onChange={formik.handleChange}
                />
            </div>

              <Box sx={{marginTop : 4}}>
                <Button
                 variant="contained"
                 fullWidth={true}
                 onClick={formik.handleSubmit}
                > 
                Add Poem
                </Button>
            </Box>    
        </Box>

    </div>
    );
};

AddPoem.propTypes = {};

export { AddPoem };