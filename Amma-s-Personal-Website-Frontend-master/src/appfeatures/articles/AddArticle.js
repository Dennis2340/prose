import React, { useContext } from 'react';
import { TextField, Button,Box, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { addNewArticle, addNewArticleQuery, fetchArticles } from './articleSlice';
import { useDispatch } from "react-redux"
import { useState } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import { MyAdminContext } from '../../pages/Admin';
import { useMutation, useQueryClient, } from 'react-query';
import Swal from "sweetalert2";

const AddArticle = props => {

    const Toast = Swal.mixin({
        toast: true,
        position: 'center',
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
        
      })

    const queryClient = useQueryClient()
    const addNewArticleMutation = useMutation(addNewArticleQuery, {
        onMutate: async (newArticleData) => {
            // Optimistically add the new poem to the cache
            queryClient.setQueryData('articles', (oldData) => {
              return {
                ...oldData,
                article: [
                  ...oldData.article,
                  {
                    _id: 'temp-id', // Generate a temporary ID for the optimistic update
                    ...newArticleData,
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
            console.error('Error adding new article:', error);
          },
          onSuccess: (data, variables, context) => {
              // Assuming your backend returns a success status code (e.g., 200)
                // Display a success toast
                Toast.fire({
                  icon: 'success',
                  title: 'Article Added Successfully',
                  text: data.message,
                });
              
            },
          onSettled: () => {
            // Refetch the poems after the mutation is settled
            queryClient.invalidateQueries('articles');
          },
    })

    const [active, setActive] = useContext(MyAdminContext)
    const formik = useFormik({
        initialValues: {
            articleTitle: "",
            articleGenre: "",
            articleDetails: "",
            articleAuthor: ""
        },
        onSubmit: async(values) => {
            if(values){
                try{
                  await addNewArticleMutation.mutateAsync(values)
                  setActive("Articles")
                  
                }catch(error){
                    console.log(error.message)
                }
            
                
            }
        }
    })

    return (
    <div style={{maxWidth: "708.667px"}}>
        <Box sx={{textAlign: "center", }}>
            <Typography variant="h4" component="h3">
                Add New Article
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
                Add Article
                </Button>
            </Box>            
        </Box>
    </div>
    )
    ;
};

AddArticle.propTypes = {};

export { AddArticle };