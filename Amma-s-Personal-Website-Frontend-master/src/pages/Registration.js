import React, {useContext} from 'react';
import { Box, Typography } from '@mui/material';
import { TextField } from '@mui/material';
import {Button} from '@mui/material';
import { addNewUser } from '../appfeatures/about/aboutSlice';
import { useFormik } from 'formik';
import { useDispatch } from "react-redux"
import { MyContext } from '../Layout';
import Swal from "sweetalert2";

const Registration = (props) => {

  const [active, setActive] = useContext(MyContext)
   
    const dispatch = useDispatch()
    
    const Toast = Swal.mixin({
      toast: true,
      position: 'center',
      timer: 3000,
      timerProgressBar: true,
      showConfirmButton: false,
      
    })

    
    const formik = useFormik({
        initialValues: {
          userName: "",
          userOccupation: "",
          userEmail: "",
          userGender: "",
          userDateOfBirth: "",
          userPhoneNumber: "",
          userPassword: "",
        },
        onSubmit: async(values) => {
           try {
            await dispatch(addNewUser(values))
            setActive("Login")
            Toast.fire({
              icon: 'success',
              title: 'SignUp Completed',
              
            });
           } catch (error) {
            console.log(error)
           }
        }
    })

    // const handleFileChange = (event) => {
    //     formik.setFieldValue('picture', event.currentTarget.files[0]);
    //   };
    
    return (
    <Box sx={{ maxWidth: "708.667px",marginLeft: {lg: -10}}}>
        <Box sx={{ textAlign: "center"}}>
            <Typography variant='h4' component="h3">
                Registration
            </Typography>
        </Box>
        <Box
        sx={{
            display: {xs:"block", sm: "block"},
             marginTop: 5,
             }}>  
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
              id="outlined-basic"
              label="Occupation"
              variant="outlined"
              fullWidth
              name="userOccupation"
              value={formik.values.userOccupation}
              onChange={formik.handleChange}
            />
          </div>
          <div style={{ marginTop: 40, height: 50 }}>
            <TextField
              id="outlined-basic"
              label="Gender"
              variant="outlined"
              fullWidth
              name="userGender"
              value={formik.values.userGender}
              onChange={formik.handleChange}
            />
          </div>
          <div style={{ marginTop: 40, height: 50 }}>
            <TextField
              id="outlined-basic"
              label="Date of Birth"
              variant="outlined"
              fullWidth
              name="userDateOfBirth"
              value={formik.values.userDateOfBirth}
              onChange={formik.handleChange}
            />
          </div>
            <Box
            sx={{                
                marginTop: 5,
                height: 50,                
            }}>
                <Button 
                variant="contained"
                fullWidth
                onClick={formik.handleSubmit}
                >
                    SignUp
                </Button>
            </Box>
        </Box>
    </Box>
    );
};

Registration.propTypes = {};

export { Registration };