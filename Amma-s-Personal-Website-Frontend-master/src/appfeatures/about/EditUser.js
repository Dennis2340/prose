import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';
import DenseAppBar from '../../Components/BasicBar';
import { TextField } from '@mui/material';
import {Button} from '@mui/material';
import { Password } from '@mui/icons-material';
import { updateUser } from './aboutSlice';
import { useFormik } from 'formik';
import { useSelector, useDispatch } from "react-redux"
import { useNavigate, useParams } from 'react-router-dom';
import LinearProgress from '@mui/material/LinearProgress';
import { getUserInfo,deleteUser } from './aboutSlice';
const EditUser = props => {

    
    const userArray  = useSelector(getUserInfo)
    const user = userArray.map(oneUser => oneUser)
   
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [loading, setLoading] = useState(false)

    const url = user[0]?.pictureUrl
    const lastDashedIndex = url?.lastIndexOf("-")
    const mainUrl = url?.substring(lastDashedIndex + 1)
    console.log(mainUrl)

    const formik = useFormik({
        initialValues: {
            id: user[0]?._id,
            userName: user[0]?.userName,
            userEmail: user[0]?.userEmail,
            userPassword: user[0]?.userPassword,
            userPhoneNumber: user[0]?.userPhoneNumber,
            userDescription: user[0]?.userDescription,
            picture: mainUrl
        },
        onSubmit: async(values) => {
           if(values){
            try {
                setLoading(true)
                await dispatch(updateUser(values))  
                 navigate("/about")
                 window.location.reload()
            } catch (error) {
                console.log(error.message)
            }
           }
        }
    })

    const handleFileChange = (event) => {
        formik.setFieldValue('picture', event.currentTarget.files[0]);
      };

    const handleDelete = async() => {
        await dispatch(deleteUser(user[0]))
        navigate("/")
    }
    return (
    <div>
        <DenseAppBar/>
         <Box sx={{textAlign: "center", marginTop: 11}}>
            <Typography variant="h4" component="h3">
                Update User
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
                 label="Name"
                 variant="outlined"
                fullWidth={true}
                name='userName'
                value={formik.values.userName }
                onChange={formik.handleChange}
                />
            </div>

            <div style={{marginTop: 40, marginButtom: "none"}}>
                <TextField
                 label="Email"
                 variant="outlined"
                fullWidth={true}
                name='userEmail'
                value={formik.values.userEmail }
                onChange={formik.handleChange}
                />
            </div>

            <div style={{marginTop: 40, marginButtom: "none"}}>
                <TextField
                 label="Password"
                 type='password'
                 variant="outlined"
                fullWidth={true}
                name='userPassword'
                value={formik.values.userPassword }
                onChange={formik.handleChange}
                />
            </div>

            <div style={{marginTop: 40, marginButtom: "none"}}>
                <TextField
                 label="PhoneNumber"
                 variant="outlined"
                fullWidth={true}
                name='userPhoneNumber'
                value={formik.values.userPhoneNumber }
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

            <div style={{marginTop: 40, marginButtom: "none"}}>
                <TextField
                 label="About"
                 variant="outlined"
                fullWidth={true}
                rows={4}
                multiline
                name='userDescription'
                value={formik.values.userDescription }
                onChange={formik.handleChange}
                />
            </div>
        <div
            style={{
                marginTop: 40,
                height: 50,  
            }}
            >
                <Button 
                variant="contained"
                fullWidth
                onClick={formik.handleSubmit}
                >
                    Update User
                </Button>

            </div>
            {
            loading === true ? <Box sx={{marginTop: 4}}>
              <LinearProgress/>
              </Box> : null
          }
          <Box sx={{marginTop : 2}}>
                <Button
                 variant="contained"
                 color='secondary'
                 fullWidth={true}
                 onClick={handleDelete}
                > 
                Delete Article
                </Button>
            </Box>
        </Box>
        

    </div>
    );
};

EditUser.propTypes = {};

export { EditUser };