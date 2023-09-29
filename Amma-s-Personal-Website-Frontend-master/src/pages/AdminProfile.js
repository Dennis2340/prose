import { 
    Box, 
    Typography,
    Divider,
    List,
    ListItem,
    ListItemText,
    Button,
    TextField,
    CardContent,
    Card,
    
  }  from "@mui/material";
  import { Edit, SaveAlt } from "@mui/icons-material";
  import { useState } from "react";
  import { styled } from '@mui/system';
  import { useDispatch } from "react-redux";
  import { updateUser } from "../appfeatures/about/aboutSlice";

  const StyledCard = styled(Card)(
    ({ theme }) => ({
      width: '100%',
      height: '100%',
      maxWidth: {xs: 0, lg: "80%"},
      textAlign: 'center',
      margin: 'auto',
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
      transition: '0.3s',
      '&:hover': {
        boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
      },
    })
  );
  
  const StyledCardContent = styled(CardContent)(
    ({ theme }) => ({
      padding: theme.spacing(2),
    })
  );
  
  const StyledButton = styled(Button)(
    ({ theme }) => ({
      marginTop: theme.spacing(2),
    })
  );

  const dummyUser = {
    address: "123 Main Street",
    contactNumber: "1234567890",
    dateOfBirth: "31st August, 2023",
    email: "kamaradennis36@gmail.com",
    specialization: "bone specialist",
    firstName: "Dennis",
    gender: "male",
    lastName: "Kamara",
    profileImage: null || "https://www.bing.com/th?id=OIP.rq0bLboVfwhtwS9EnvZ0CAHaJl&w=76&h=100&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2",
    role: "patient",
};


const AdminProfile = ({admin}) => {

    const [isEditing, setIsEditing] = useState(false)

    const dispatch = useDispatch()
    const [updateAdminValues, setUpdateAdmin] = useState({
       _id: admin._id,
        userName: admin?.userName,
        userOccupation: admin?.userOccupation,
        userEmail: admin?.userEmail,
        userGender: admin?.userGender,
        userDateOfBirth: admin?.userDateOfBirth,
        userPhoneNumber: admin?.userPhoneNumber,
    })

    const handleUpdate = async() => {
        try {
          await dispatch(updateUser(updateAdminValues))
          setIsEditing(false)
         
        } catch (error) {
         console.log(error.message)
        }
     }

    const handleEdit = (admin) => {
        setUpdateAdmin({
          _id: admin._id,
          userName: admin?.userName,
          userOccupation: admin?.userOccupation,
          userEmail: admin?.userEmail,
          userGender: admin?.userGender,
          userDateOfBirth: admin?.userDateOfBirth,
          userPhoneNumber: admin?.userPhoneNumber,
        })
          setIsEditing(true)
         
      }
  return (
        <Box sx={{textAlign: "center", width: "100%", marginLeft: { lg: -10}}}>
        <StyledCard>
            <StyledCardContent >
                 {isEditing ? (
                  <TextField 
                    variant="outlined"
                    name="userName"
                    label="Full Name"
                    size="small"
                    sx={{ marginTop: {xs: 1, sm: 1, md:0, lg:0,}}}
                    value={updateAdminValues.userName}
                    onChange={(e) => setUpdateAdmin({ ...updateAdminValues, userName: e.target.value })}
                  />
                 ) : (
                  <Typography sx={{ml: -10}}   variant='h5' color="text.secondary" >
                  {updateAdminValues?.userName || dummyUser.firstName} 
                  </Typography>
                 )}
                 <Box sx={{ marginTop: 2}}>
                 { isEditing ? (
                    <TextField 
                     variant="outlined"
                     name="userOccupation"
                     label="Occupation"
                     size="small"
                     sx={{ marginTop: {xs: 1, sm: 1, md:0, lg: 0}}}
                     value={updateAdminValues.userOccupation}
                     onChange={(e) => setUpdateAdmin({ ...updateAdminValues,userOccupation: e.target.value })}
                    />
                  ) : (
                    <Typography sx={{ml: -10}}  variant='subtitle1' color="text.secondary" >
                      {updateAdminValues?.userOccupation || dummyUser.specialization} 
                    </Typography>
                 )}
                 </Box>
               <Divider sx={{ my: 2 }} />
               <Box sx={{width: "100%",textAlign: "center", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
               <List>
                 <ListItem>
                 { isEditing ? (
                    <TextField 
                     variant="outlined"
                     size="small"
                     label="Phone Number"
                     name="userPhoneNumber"
                     sx={{ marginTop: {xs: 1, sm: 1, md:0, lg: 0},}}
                     value={updateAdminValues.userPhoneNumber}
                     onChange={(e) => setUpdateAdmin({ ...updateAdminValues,userPhoneNumber: e.target.value })}
                    />
                  ) : (
                    <ListItemText
                     primary="Contact"
                     secondary={updateAdminValues?.userPhoneNumber || dummyUser.contactNumber}
                    />
                 )}                
                 </ListItem>
                 <ListItem>
                 { isEditing ? (
                    <TextField 
                     variant="outlined"
                     size="small"
                     name="userEmail"
                     label="Email"
                     sx={{ marginTop: {xs: 1, sm: 1, md:0, lg: 0},}}
                     value={updateAdminValues.userEmail}
                     onChange={(e) => setUpdateAdmin({ ...updateAdminValues,userEmail: e.target.value })}
                    />
                  ) : (
                    <ListItemText
                    primary="Email"
                    secondary={updateAdminValues?.userEmail || dummyUser.email}
                    />
                 )}                       
                 </ListItem>
                 <ListItem>
                 { isEditing ? (
                    <TextField 
                     variant="outlined"
                     size="small"
                     label="Date of Birth"
                     name="userDateOfBirth"
                     sx={{ marginTop: {xs: 1, sm: 1, md:0, lg: 0},}}
                     value={updateAdminValues.userDateOfBirth}
                     onChange={(e) => setUpdateAdmin({ ...updateAdminValues,userDateOfBirth: e.target.value })}
                    />
                  ) : (
                    <ListItemText
                    primary="Date of Birth"
                    secondary={updateAdminValues?.userDateOfBirth || dummyUser.dateOfBirth}
                    />
                 )}                     
                 </ListItem>
                 <ListItem>
                 { isEditing ? (
                    <TextField 
                     variant="outlined"
                     size="small"
                     name="userGender"
                     label="Gender"
                     sx={{ marginTop: {xs: 1, sm: 1, md:0, lg: 0},}}
                     value={updateAdminValues.userGender}
                     onChange={(e) => setUpdateAdmin({ ...updateAdminValues,userGender: e.target.value })}
                    />
                  ) : (
                    <ListItemText
                    primary="Gender"
                    secondary={updateAdminValues?.userGender || dummyUser.gender}
                    />
                   )}                    
                 </ListItem>
               </List>
               <Box sx={{ mt: 2, ml: -10}}>
                {isEditing ? (
                        <StyledButton  size="large" variant="contained" color="primary" onClick={handleUpdate}>
                          <SaveAlt/><span style={{ marginLeft: 5}}>Save</span>
                        </StyledButton>
                         ) : (
                        <StyledButton size="large" variant="contained" color="primary" onClick={()=>handleEdit(updateAdminValues)}>
                          <Edit/> <span style={{ marginLeft: 5}}>Edit</span>
                        </StyledButton>
                    )}
                </Box>
                </Box>
            </StyledCardContent>
        </StyledCard>
        </Box>
  )
}

export default AdminProfile
