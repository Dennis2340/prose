import React from 'react';
import { TextField, Button,Box, Typography } from '@mui/material';
import { useFormik } from 'formik';
import {updateMotMsgQuery, deleteMotMsgQuery, fetchMotMsgQuery } from './motmsgSlice';
import { useContext } from 'react'
import { MyAdminContext } from '../../pages/Admin';
import { useMutation, useQueryClient, useQuery } from 'react-query';
import Swal from "sweetalert2";

const EditMotMsg = ({id}) => {

    const { data: motmsgs,  } = useQuery('motmsgs', fetchMotMsgQuery, {
        initialData: {
          motmsgs: [],
        },
      });
      const motmsg =  motmsgs.motMessages.find((motmsg) => motmsg._id === id);
      const queryClient = useQueryClient()
      const Toast = Swal.mixin({
        toast: true,
        position: 'center',
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
        
      })

    const [active, setActive] = useContext(MyAdminContext)
   
    const updateMotMsgMutation = useMutation(
        async (updatedMotMsg) => {
          try {
            // Use your existing function to update the poem
            const response = await updateMotMsgQuery(updatedMotMsg);
    
            // Assuming your API returns the updated poem
            return response.data;
          } catch (error) {
            throw new Error(error.message);
          }
        },
        {
          onMutate: (newData) => {
            // Optimistically update the poem in the cache
            queryClient.setQueryData(['motmsgs', id], (oldData) => {
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
            console.error('Error updating motMessage:', error);
          },
          onSuccess: (data) => {
            Toast.fire({
              icon: 'success',
              title: 'MotMessage Updated Successfully',
              text: "motmessage updated successfully",
            });
          },
          onSettled: () => {
            // Refetch the poems after the mutation is settled
            queryClient.invalidateQueries('motmessages');
          },
        }
      );

      const deleteMotMsgMutation = useMutation(
        () => deleteMotMsgQuery(id),
        {
          onError: (error) => {
            Toast.fire({
              icon: 'error',
              title: 'Error',
              text: error.message,
            });
            console.error('Error deleting motmsg:', error);
          },
          onSuccess: () => {
            Toast.fire({
              icon: 'success',
              title: 'Motivational msg deleted Successfully',
            });
          },
          onSettled: () => {
            // Redirect or perform any other actions after deletion
            setActive('Motivational_Msg');
          },
        }
      );
    
   
    const handleDelete = async(id) =>{
       await deleteMotMsgMutation.mutateAsync(id)
       setActive("Motivational_Msg")
    }

    const formik = useFormik({
        initialValues: {
        _id : id,
        motMessageTitle: motmsg?.motMessageTitle,
        motMessageGenre: motmsg?.motMessageGenre,
        motMessageDetails: motmsg?.motMessageDetails,
        motMessageAuthor: motmsg?.motMessageAuthor
        },
        onSubmit: async(values) => {
            if(values){
            try{
              await updateMotMsgMutation.mutateAsync(values);
              setActive("SingleMotMsg")
              
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
                Update Motivational Message
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
                 value={formik.values.motMessageAuthor}
                 onChange={formik.handleChange}
                />
            </div>

            <Box sx={{marginTop : 4}}>
                <Button
                 variant="contained"
                 fullWidth={true}
                 onClick={formik.handleSubmit}
                > 
                Update Motivational Msg
                </Button>
                </Box>
                <Box sx={{marginTop : 2}}>
                <Button
                 variant="contained"
                 color='secondary'
                 fullWidth={true}
                 onClick={() => handleDelete(formik.values._id)}
                > 
                Delete Motivational Msg
                </Button>
            </Box>
            
        </Box>
    </Box>
    );
};

EditMotMsg.propTypes = {};

export { EditMotMsg };