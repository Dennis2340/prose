import React, {useContext} from 'react';
import { TextField, Button,Box, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { fetchPoemsQuery, updatePoemQuery, deletePoemQuery } from './poemSlice';
import { MyAdminContext } from '../../pages/Admin';
import { useMutation, useQueryClient, useQuery } from 'react-query';
import Swal from "sweetalert2";

const EditPoem = ({id}) => {
    
    const { data: poems, isLoading, isError, error } = useQuery('poems', fetchPoemsQuery, {
        initialData: {
          poems: [],
        },
      });
      const poem =  poems.poems.find((poem1) => poem1._id === id);
      const queryClient = useQueryClient()
      const Toast = Swal.mixin({
        toast: true,
        position: 'center',
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
        
      })

    const [active, setActive] = useContext(MyAdminContext)
   
    const updatePoemMutation = useMutation(
        async (updatedPoem) => {
          try {
            // Use your existing function to update the poem
            const response = await updatePoemQuery(updatedPoem);
    
            // Assuming your API returns the updated poem
            return response.data;
          } catch (error) {
            throw new Error(error.message);
          }
        },
        {
          onMutate: (newData) => {
            // Optimistically update the poem in the cache
            queryClient.setQueryData(['poems', id], (oldData) => {
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
            console.error('Error updating poem:', error);
          },
          onSuccess: (data) => {
            Toast.fire({
              icon: 'success',
              title: 'Poem Updated Successfully',
              text: "poem updated successfully",
            });
          },
          onSettled: () => {
            // Refetch the poems after the mutation is settled
            queryClient.invalidateQueries('poems');
          },
        }
      );

      const deletePoemMutation = useMutation(
        () => deletePoemQuery(id),
        {
          onError: (error) => {
            Toast.fire({
              icon: 'error',
              title: 'Error',
              text: error.message,
            });
            console.error('Error deleting poem:', error);
          },
          onSuccess: () => {
            Toast.fire({
              icon: 'success',
              title: 'Poem deleted Successfully',
            });
          },
          onSettled: () => {
            // Redirect or perform any other actions after deletion
            setActive('Poems');
          },
        }
      );

    const handleDelete = async(id) =>{
        await deletePoemMutation.mutateAsync(id)
       setActive("Poems")
    }
    const formik = useFormik({
        initialValues: {
        _id : id,
        poemTitle: poem?.poemTitle,
        poemGenre: poem?.poemGenre,
        poemDetails: poem?.poemDetails,
        poemAuthor: poem?.poemAuthor
        },
        onSubmit: async(values) => {
            if(values){
            try{
              await updatePoemMutation.mutateAsync(values)
              setActive("Poems")
              
            }catch(error){
                console.log(error.message)
            }  
        }
        },
        
    })
    return (
    <Box sx={{maxWidth: "708.667px",marginLeft: {xs: 0, lg: -5}}}>
         <Box sx={{textAlign: "center", marginLeft: {xs: 0, lg: -5}}}>
            <Typography variant="h4" component="h3">
                Edit Poem
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
                 rows={5}
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
                Update Poem
                </Button>
                </Box>
                <Box sx={{marginTop : 2}}>
                <Button
                 variant="contained"
                 color='secondary'
                 fullWidth={true}
                 onClick={()=>handleDelete(formik.values._id)}
                > 
                Delete Poem
                </Button>
            </Box>
            
        </Box>

    </Box>
    )
    ;
}


EditPoem.propTypes = {};

export { EditPoem };