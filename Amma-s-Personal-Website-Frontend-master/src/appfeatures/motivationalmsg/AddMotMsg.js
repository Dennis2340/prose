import React, { useContext } from 'react';
import { TextField, Button,Box, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { addNewMotMsgQuery } from './motmsgSlice';
import { MyAdminContext } from '../../pages/Admin';
import { useMutation, useQueryClient } from 'react-query';
import Swal from "sweetalert2";

const AddMotMsg = props => {

    // const { data: motmsgs, isLoading, isError, error } = useQuery('motmsgs', fetchMotMsgQuery, {
    //     initialData: {
    //       motmsgs: [],
    //     },
    //   });

    const Toast = Swal.mixin({
        toast: true,
        position: 'center',
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
        
      })

    const queryClient = useQueryClient()
    const addNewMotMsgMutation = useMutation(addNewMotMsgQuery, {
        onMutate: async (newMotMsgData) => {
          // Optimistically add the new poem to the cache
          queryClient.setQueryData('motmsgs', (oldData) => {
            return {
              ...oldData,
              motmsgs: [
                ...oldData.motMessages,
                {
                  _id: 'temp-id', // Generate a temporary ID for the optimistic update
                  ...newMotMsgData,
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
          console.error('Error adding new Motivaional message:', error);
        },
        onSuccess: (data, variables, context) => {
            // Assuming your backend returns a success status code (e.g., 200)
              // Display a success toast
              Toast.fire({
                icon: 'success',
                title: 'Added Successfully',
                text: data.message,
              });
            
          },
        onSettled: () => {
          // Refetch the poems after the mutation is settled
          queryClient.invalidateQueries('motmsgs');
        },
      });
      
    const [active, setActive] = useContext(MyAdminContext)
    const formik = useFormik({
        initialValues: {
            motMessageTitle: "",
            motMessageGenre: "",
            motMessageDetails: "",
            motMessageAuthor: ""
        },
        onSubmit: async(values) => {
            if(values){
                try{
                    await addNewMotMsgMutation.mutateAsync(values); // Use the mutation function
                    formik.resetForm(); // Reset the form
                  setActive("Motivational_Msg")
                  
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
                Add New Motivational Message
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
                name='motMessageTitle'
                value={formik.values.motMessageTitle}
                onChange={formik.handleChange}
                />
            </div>

            <div style={{marginTop: 40, marginButtom: "none"}}>
                <TextField
                 label="Genre"
                 variant="outlined"
                 fullWidth={true}
                 name='motMessageGenre'
                 value={formik.values.motMessageGenre}
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
                 name='motMessageDetails'
                 value={formik.values.motMessageDetails}
                onChange={formik.handleChange}
                />
            </div>

            <div style={{marginTop: 40, marginButtom: "none"}}>
                <TextField
                 label="Author"
                 variant="outlined"
                 fullWidth={true}
                 name='motMessageAuthor'
                 value={formik.values.articleAuthor}
                onChange={formik.handleChange}
                />
            </div>

            
            <Box sx={{marginTop : 4}}>
                <Button
                 variant="contained"
                 fullWidth={true}
                 onClick={formik.handleSubmit}
                > 
                Add MotMsg
                </Button>
            </Box>
        </Box>

    </div>
    );
};

AddMotMsg.propTypes = {};

export { AddMotMsg };