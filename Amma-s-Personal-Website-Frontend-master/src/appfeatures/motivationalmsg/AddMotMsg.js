import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { TextField, Button,Box, Typography } from '@mui/material';
import DenseAppBar from '../../Components/BasicBar';
import { useFormik } from 'formik';
import { addNewMotMsg, fetchMotMsg } from './motmsgSlice';
import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux"
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LinearProgress from '@mui/material/LinearProgress';
import { MyAdminContext } from '../../pages/Admin';
const AddMotMsg = props => {

    const dispatch = useDispatch()
    const [addRequestStatus, setAddRequestStatus] = useState("idle")
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
                  setAddRequestStatus("pending")
                 await dispatch(addNewMotMsg(values))  
                 await dispatch(fetchMotMsg())
                  values.motMessageAuthor = ""
                  values.motMessageDetails = ""
                  values.motMessageTitle = ""
                  values.motMessageGenre = ""
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
                 value={formik.values.articleDetails}
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
            {
            addRequestStatus === "pending" ? <Box sx={{marginTop: 4}}>
              
              <LinearProgress/>
              
              </Box> : null
          }

        </Box>

    </div>
    );
};

AddMotMsg.propTypes = {};

export { AddMotMsg };