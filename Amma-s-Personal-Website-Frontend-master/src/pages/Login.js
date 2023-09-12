import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import DenseAppBar from '../Components/BasicBar';
import { TextField, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { Login, loginUser } from '../appfeatures/about/aboutSlice';
import { useDispatch } from 'react-redux';
import LinearIndeterminate from '../Components/LoadingPage';
import LinearProgress from '@mui/material/LinearProgress';
const LoginPage = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      userEmail: '',
      userPassword: '',
    },
    onSubmit: async(values) => {
      try {
        setLoading(true);
        await dispatch(Login(values));
        await dispatch(loginUser())
        setLoading(false);
        navigate('/');
        //window.location.reload()
        
        
        console.log(values);
      } catch (error) {
        console.log(error.message);
      }
    },
  });

  return (
    <div>
      <Box>
        <DenseAppBar />
      </Box>

      <Box sx={{ marginTop: 13, textAlign: 'center' }}>
        <Typography variant="h4" component="h2">
          Login
        </Typography>
      </Box>

      <Box
        sx={{
          display: { xs: 'block', sm: 'block' },
          marginTop: 5,
          marginLeft: 'auto',
          marginRight: 'auto',
          width: { xs: '75%', sm: '50%' },
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
        <div style={{ marginTop: 40, height: 50 }}>
          <Button variant="contained" fullWidth onClick={formik.handleSubmit}>
            Login
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

LoginPage.propTypes = {};

export { LoginPage };
