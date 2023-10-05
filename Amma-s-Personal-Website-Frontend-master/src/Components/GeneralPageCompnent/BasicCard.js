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
  import { updateUser } from "../../appfeatures/about/aboutSlice";
import { useDispatch } from "react-redux";
  import { useKindeAuth } from "@kinde-oss/kinde-auth-react";

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

const BasicCard = ({user}) => {

const { logout } = useKindeAuth()
   
    return (
      <Box sx={{textAlign: "center", width: "100%"}}>
        <StyledCard>
            <StyledCardContent >
                  <Typography sx={{ml: -10}} variant='h5' color="text.secondary" >
                 
                  </Typography>
            
                
               <Divider sx={{ my: 2 }} />
               <Box sx={{width: "100%",textAlign: "center",display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
               
               <Box sx={{ mt: 2, ml: -10}}>
                  <StyledButton  size="large" variant="contained" color="primary" onClick={logout}>
                    <SaveAlt/><span style={{ marginLeft: 5}}>Logout</span>
                  </StyledButton> 
                </Box>
                </Box>
            </StyledCardContent>
        </StyledCard>
        </Box>
      
    )
}

BasicCard.propTypes = {};

export { BasicCard }
