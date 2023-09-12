import React from 'react';
import PropTypes from 'prop-types';
import { TextField, Button,Box, Typography } from '@mui/material';
import DenseAppBar from '../../Components/BasicBar';
import { useFormik } from 'formik';
import { selectMotMsgById,updateMotMsg, deleteMotMsg } from './motmsgSlice';
import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux"
import { useState } from 'react'
import { useParams } from 'react-router-dom';
import { useNavigate  } from 'react-router-dom';

const EditMotMsg = props => {

    const { id } = useParams()
    const navigate = useNavigate()
    
    const motmsg = useSelector(state => selectMotMsgById(state,id))
        
    const dispatch = useDispatch()
    const [addRequestStatus, setAddRequestStatus] = useState("idle")
    
    const handleDelete = async() =>{
       await dispatch(deleteMotMsg(motmsg))
       navigate("/motmsg")
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
              setAddRequestStatus("pending")
              await dispatch(updateMotMsg(values))  
              navigate("/motmsg")
              window.location.reload()
              
            }catch(error){
                console.log(error.message)
            }
        
            
        }
    }
    })

    return (

    <div>
         <Box sx={{textAlign: "center", marginTop: 5}}>
            <Typography variant="h4" component="h3">
                Update Motivational Message
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
                 onClick={handleDelete}
                > 
                Delete Motivational Msg
                </Button>
            </Box>
            
        </Box>
    </div>
    );
};

EditMotMsg.propTypes = {};

export { EditMotMsg };