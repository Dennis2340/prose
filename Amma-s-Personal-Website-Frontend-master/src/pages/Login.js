import React, {useContext} from 'react';
import { Box } from '@mui/material';
import { TextField, Typography, Button } from '@mui/material';
import { useFormik } from 'formik';
import { Login,} from '../appfeatures/about/aboutSlice';
import { useDispatch } from 'react-redux';
import { MyContext } from '../Layout';
import Swal from "sweetalert2";

const LoginPage = ({handleUserDetails}) => {
 
  const dispatch = useDispatch();

  const Toast = Swal.mixin({
    toast: true,
    position: 'center',
    timer: 3000,
    timerProgressBar: true,
    showConfirmButton: false,
    
  })
  
  const [active, setActive] = useContext(MyContext);
  const formik = useFormik({
    initialValues: {
      userEmail: '',
      userPassword: '',
    },
    onSubmit: async(values) => {
      try {
        const response = await dispatch(Login(values));
        console.log(response);
        handleUserDetails(response.payload);
        setActive("Home") 
        Toast.fire({
          icon: 'success',
          title: 'Login successful',
          
        });
      } catch (error) {
        console.log(error.message);
      }
    },
  });

  return (
    <Box sx={{ maxWidth: "708.667px",marginLeft: {lg: -10}}}>
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h4" component="h2">
          Login
        </Typography>
      </Box>
      <Box
        sx={{
          display: { xs: 'block', sm: 'block' },
          marginTop: 5,
        }}
      >
        <div style={{ marginTop: 40, height: 50 }}>
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            name="userEmail"
            fullWidth
            value={formik.values.userEmail}
            onChange={formik.handleChange}
          />
        </div>
        <div style={{ marginTop: 40, height: 50 }}>
          <TextField
            id="outlined-basic"
            label="Password"
            type="password"
            name="userPassword"
            autoComplete="current-password"
            fullWidth
            value={formik.values.userPassword}
            onChange={formik.handleChange}
          />
        </div>
        <Box sx={{marginTop: 5}}>
          <Button variant="contained" fullWidth onClick={formik.handleSubmit}>
            Login
          </Button>
        </Box>
          
      </Box>
    </Box>
  );
};

LoginPage.propTypes = {};

export { LoginPage };
