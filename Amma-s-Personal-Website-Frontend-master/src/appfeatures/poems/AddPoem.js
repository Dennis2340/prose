import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { TextField, Button,Box, Typography } from '@mui/material';
import DenseAppBar from '../../Components/BasicBar';
import { useFormik } from 'formik';
import { addNewPoem, fetchPoems} from './poemSlice';
import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux"
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LinearProgress from '@mui/material/LinearProgress';
import { MyAdminContext } from '../../pages/Admin';
const AddPoem = props => {

    const [active, setActive] = useContext(MyAdminContext)
    const navigate = useNavigate()

    const dispatch = useDispatch()
    const [addRequestStatus, setAddRequestStatus] = useState("idle")
    
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
              setAddRequestStatus("pending")
              await dispatch(addNewPoem(values)) 
              await dispatch(fetchPoems())
              values.poemAuthor = ""
              values.poemDetails = ""
              values.poemTitle = ""
              values.poemGenre = ""
              setActive("Poems")
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
            {
            addRequestStatus === "pending" ? <Box sx={{marginTop: 4}}>
              
              <LinearProgress/>
              
              </Box> : null
          }
            
        </Box>

    </div>
    );
};

AddPoem.propTypes = {};

export { AddPoem };