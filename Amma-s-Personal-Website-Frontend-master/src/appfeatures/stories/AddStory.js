import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { TextField, Button,Box, Typography } from '@mui/material';
import DenseAppBar from '../../Components/BasicBar';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux"
import { useState } from 'react';
import { addNewStory, fetchStories } from './storySlice';
import { useNavigate } from 'react-router-dom';
import LinearProgress from '@mui/material/LinearProgress';
import { MyAdminContext } from '../../pages/Admin';
const AddStory = props => {

    const navigate = useNavigate()
    
    const [active, setActive] = useContext(MyAdminContext)
    const dispatch = useDispatch()
    const [addRequestStatus, setAddRequestStatus] = useState("idle")

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
               
              setAddRequestStatus("pending")
              await dispatch(addNewStory(values))  
              await dispatch(fetchStories())
              values.storyAuthor = ""
              values.storyDetailed = ""
               values.storyTitle = ""
               values.storyGenre = ""
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
            {
            addRequestStatus === "pending" ? <Box sx={{marginTop: 4}}>
              
              <LinearProgress/>
              
              </Box> : null
          }

        </Box>

    </div>
    );
};

AddStory.propTypes = {};

export { AddStory };