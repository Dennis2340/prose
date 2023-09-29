import React, {useContext} from 'react';
import { TextField, Button,Box, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { updateArticleQuery, deleteArticleQuery, fetchArticleQuery } from './articleSlice';
import { MyAdminContext } from '../../pages/Admin';
import { useMutation, useQueryClient, useQuery } from 'react-query';
import Swal from "sweetalert2";

const EditArticle = ({id}) => {

    const { data: articles, isLoading, isError, error } = useQuery('articles', fetchArticleQuery, {
        initialData: {
          articles: [],
        },
      });
      const article =  articles.article.find((article) => article._id === id);
      const queryClient = useQueryClient()
      const Toast = Swal.mixin({
        toast: true,
        position: 'center',
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
        
      })

      const [active, setActive] = useContext(MyAdminContext)   
   
      const updateArticleMutation = useMutation(
        async (updatedArticle) => {
          try {
            // Use your existing function to update the poem
            const response = await updateArticleQuery(updatedArticle);
    
            // Assuming your API returns the updated poem
            return response.data;
          } catch (error) {
            throw new Error(error.message);
          }
        },
        {
          onMutate: (newData) => {
            // Optimistically update the poem in the cache
            queryClient.setQueryData(['articles', id], (oldData) => {
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
            console.error('Error updating article:', error);
          },
          onSuccess: () => {
            Toast.fire({
              icon: 'success',
              title: 'Article Updated Successfully',
              text: "article updated successfully",
            });
          },
          onSettled: () => {
            // Refetch the articles after the mutation is settled
            queryClient.invalidateQueries('articles');
          },
        }
      );

      const deleteArticleMutation = useMutation(
        () => deleteArticleQuery(id),
        {
          onError: (error) => {
            Toast.fire({
              icon: 'error',
              title: 'Error',
              text: error.message,
            });
            console.error('Error deleting article:', error);
          },
          onSuccess: () => {
            Toast.fire({
              icon: 'success',
              title: 'Article deleted Successfully',
            });
          },
          onSettled: () => {
            // Redirect or perform any other actions after deletion
            setActive('Articles');
          },
        }
      );
    
    const handleDelete = async(id) =>{
       await deleteArticleMutation.mutateAsync(id)
       setActive("Articles")
    }

    const formik = useFormik({
        initialValues: {
        _id : id,
        articleTitle: article?.articleTitle,
        articleGenre: article?.articleGenre,
        articleDetails: article?.articleDetails,
        articleAuthor: article?.articleAuthor
        },
        onSubmit: async(values) => {
            if(values){
            try{
              await updateArticleMutation.mutateAsync(values);
              setActive("Articles")
              
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
                Update Article
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
                name='articleTitle'
                value={formik.values.articleTitle}
                onChange={formik.handleChange}
                />
            </div>

            <div style={{marginTop: 40, marginButtom: "none"}}>
                <TextField
                 label="Genre"
                 variant="outlined"
                 fullWidth={true}
                 name='articleGenre'
                 value={formik.values.articleGenre}
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
                 name='articleDetails'
                 value={formik.values.articleDetails}
                 onChange={formik.handleChange}
                />
            </div>

            <div style={{marginTop: 40, marginButtom: "none"}}>
                <TextField
                 label="Author"
                 variant="outlined"
                 fullWidth={true}
                 name='articleAuthor'
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
                Update Article
                </Button>
                </Box>
                <Box sx={{marginTop : 2}}>
                <Button
                 variant="contained"
                 color='secondary'
                 fullWidth={true}
                 onClick={() => handleDelete(formik.values._id)}
                > 
                Delete Article
                </Button>
            </Box>
            
        </Box>

    </Box>
    )
    ;
};

EditArticle.propTypes = {};

export { EditArticle };