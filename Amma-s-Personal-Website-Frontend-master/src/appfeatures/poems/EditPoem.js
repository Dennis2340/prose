import React from 'react';
import PropTypes from 'prop-types';
import { TextField, Button,Box, Typography } from '@mui/material';
import DenseAppBar from '../../Components/BasicBar';
import { useFormik } from 'formik';
import { selectPoemById,updatePoem, deletePoem } from './poemSlice';
import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux"
import { useState } from 'react'
import { useNavigate  } from 'react-router-dom';
import { useParams } from 'react-router-dom';
const EditPoem = props => {
    const { id } = useParams()
    const navigate = useNavigate()
    
    const poem = useSelector(state => selectPoemById(state,id))
        
    const dispatch = useDispatch()
    const [addRequestStatus, setAddRequestStatus] = useState("idle")
    
    const handleDelete = async() =>{
       await dispatch(deletePoem(poem))
       navigate("/poems")
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
              setAddRequestStatus("pending")
              await dispatch(updatePoem(values))  
              navigate("/poems")
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
         <Box sx={{textAlign: "center", marginTop: 5}}>
            <Typography variant="h4" component="h3">
                Edit Poem
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
                Update Poem
                </Button>
                </Box>
                <Box sx={{marginTop : 2}}>
                <Button
                 variant="contained"
                 color='secondary'
                 fullWidth={true}
                 onClick={handleDelete}
                > 
                Delete Poem
                </Button>
            </Box>
            
        </Box>

    </div>
    )
    ;
}


EditPoem.propTypes = {};

export { EditPoem };