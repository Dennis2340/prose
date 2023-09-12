import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';
import { TextField } from '@mui/material';
import DenseAppBar from '../Components/BasicBar';
import {Button} from '@mui/material';
import { Password } from '@mui/icons-material';
import { addNewUser } from '../appfeatures/about/aboutSlice';
import { useFormik } from 'formik';
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from 'react-router-dom';
import LinearProgress from '@mui/material/LinearProgress';
const Registration = (props) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [loading, setLoading] = useState(false)

    const formik = useFormik({
        initialValues: {
            userName: "",
            userEmail: "",
            userPassword: "",
            userPhoneNumber: "",
            userDescription: "",
            picture: null
        },
        onSubmit: async(values) => {
           try {
            console.log(values)
            setLoading(true)
            await dispatch(addNewUser(values))
            setLoading(false);
            navigate('/login');
            window.location.reload()

           } catch (error) {
            console.log(error)
           }
        }
    })

    const handleFileChange = (event) => {
        formik.setFieldValue('picture', event.currentTarget.files[0]);
      };
    
    return (

    <div>
        <Box>
            <DenseAppBar/>
        </Box>

        <Box
        sx={{textAlign: "center", marginTop: 12}}
        >
            <Typography variant='h4' component="h3">
                Registration
            </Typography>
        </Box>

        <Box
        sx={{
            display: {xs:"block", sm: "block"},
             marginTop: 5,
             marginLeft: "auto",
             marginRight: "auto",
             width: {xs: "75%", sm: "50%"}
                
        }}
        
        >  
           <div style={{ marginTop: 40, height: 50 }}>
  <TextField
    id="outlined-basic"
    label="FullName"
    variant="outlined"
    fullWidth
    name="userName"
    value={formik.values.userName}
    onChange={formik.handleChange}
  />
     </div>
      <div style={{ marginTop: 40, height: 50 }}>
  <TextField
    id="outlined-basic"
    label="Email"
    variant="outlined"
    fullWidth
    name="userEmail"
    value={formik.values.userEmail}
    onChange={formik.handleChange}
  />
</div>
<div style={{ marginTop: 40, height: 50 }}>
  <TextField
    id="outlined-basic"
    label="Password"
    type="password"
    autoComplete="current-password"
    fullWidth
    name="userPassword"
    value={formik.values.userPassword}
    onChange={formik.handleChange}
  />
</div>
<div style={{ marginTop: 40, height: 50 }}>
  <TextField
    id="outlined-basic"
    label="PhoneNumber"
    variant="outlined"
    fullWidth
    name="userPhoneNumber"
    value={formik.values.userPhoneNumber}
    onChange={formik.handleChange}
  />
</div>
<div style={{ marginTop: 40, height: 50 }}>
  <TextField
    type="file"
    label="Choose an Image"
    onChange={handleFileChange}
    name='picture'
    InputLabelProps={{
      shrink: true,
    }}
    inputProps={{
      accept: 'image/*',
      'aria-label': 'Upload video',
    }}
    fullWidth
  />
</div>
<div style={{ marginTop: 40, height: 50 }}>
  <TextField
    id="outlined-basic"
    label="About"
    multiline
    variant="outlined"
    fullWidth
    rows={5}
    name="userDescription"
    value={formik.values.userDescription}
    onChange={formik.handleChange}
  />
</div>

            <div
            style={{
                
                marginTop: 140,
                height: 50, 
                
            }}
            >
                <Button 
                variant="contained"
                fullWidth
                onClick={formik.handleSubmit}
                >
                    SignUp
                </Button>

            </div>
            {
            loading === true ? <Box sx={{marginTop: 4}}>
              
              <LinearProgress/>
              
              </Box> : null
          }
        </Box>
       
    </div>
    );
};

Registration.propTypes = {};

export { Registration };