import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { TextField, Button,Box, Typography } from '@mui/material';
import DenseAppBar from '../../Components/BasicBar';
import { useFormik } from 'formik';
import { addNewArticle, fetchArticles } from './articleSlice';
import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux"
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LinearProgress from '@mui/material/LinearProgress';
import { MyAdminContext } from '../../pages/Admin';
const AddArticle = props => {

    const dispatch = useDispatch()
    const [addRequestStatus, setAddRequestStatus] = useState("idle")
    const [active,setActive] = useContext(MyAdminContext)
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
                  setAddRequestStatus("pending")
                  await dispatch(addNewArticle(values)) 
                  await dispatch(fetchArticles())
                  values.articleAuthor = ""
                  values.articleDetails = ""
                  values.articleTitle = ""
                  values.articleGenre = ""
                  setActive("Articles")
                  
                }catch(error){
                    console.log(error.message)
                }
            
                
            }
        }
    })

    // console.log("form values", formik.values)
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
            {
            addRequestStatus === "pending" ? <Box sx={{marginTop: 4}}>
              
              <LinearProgress/>
              
              </Box> : null
          }
            
        </Box>

    </div>
    )
    ;
};

AddArticle.propTypes = {};

export { AddArticle };