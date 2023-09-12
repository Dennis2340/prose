import React from 'react';
import PropTypes from 'prop-types';
import { TextField, Button,Box, Typography } from '@mui/material';
import DenseAppBar from '../../Components/BasicBar';
import { useFormik } from 'formik';
import { selectArticleById,updateArticle, deleteArticle } from './articleSlice';
import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux"
import { useState } from 'react'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const EditArticle = props => {

    const { id } = useParams()
    
    const navigate = useNavigate()
    const article = useSelector(state => selectArticleById(state,id))
        
    const dispatch = useDispatch()
    const [addRequestStatus, setAddRequestStatus] = useState("idle")
    
    const handleDelete = async() =>{
       await dispatch(deleteArticle(article))
       navigate("/articles")
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
              setAddRequestStatus("pending")
              await dispatch(updateArticle(values))  
              navigate("/articles")
             window.location.reload()
              
            }catch(error){
                console.log(error.message)
            }
        
            
        }
    }
    })


    return (
    <div>
        <DenseAppBar/>
        <Box sx={{textAlign: "center", marginTop: 12}}>
            <Typography variant="h4" component="h3">
                Update Article
            </Typography>
        </Box>
        <Box
        sx={{
            width: {xs: "75%", sm: "50%"},
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
                Update Article
                </Button>
                </Box>
                <Box sx={{marginTop : 2}}>
                <Button
                 variant="contained"
                 color='secondary'
                 fullWidth={true}
                 onClick={handleDelete}
                > 
                Delete Article
                </Button>
            </Box>
            
        </Box>

    </div>
    )
    ;
};

EditArticle.propTypes = {};

export { EditArticle };