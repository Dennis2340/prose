import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';
import { ListItemText, List, Divider, ListItem } from '@mui/material';

const StyledCard = styled(Card)(
  ({ theme }) => ({
    width: '100%',
    height: '100%',
    maxWidth: {xs: 0, lg: "80%"},
    minWidth: 350,
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


export default function BasicCard({user}) {
   const url = user?.pictureUrl
   const filename = url?.split("/");
   const mainUrl = filename[filename.length - 1];

  return (
    <Box sx={{ width: "100%", textAlign: "center"}}>
    <StyledCard>
      <StyledCardContent>
        <Typography  variant='h5' color="text.secondary" >
           {user.userName || dummyUser.firstName}
        </Typography>
        <Box sx={{marginTop: 3}}>
        <Typography sx={{marginTop: 2}} variant="body2">
          {user?.userOccupation || dummyUser.specialization || "not stated"}
        </Typography>
        </Box>
        <Divider sx={{ my: 2 }} />
        <Box sx={{width: "100%",textAlign: "center", marginLeft: 5,display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
          <List>
             <ListItem>
                 <ListItemText 
                  primary="Contact"
                  secondary={user?.userPhoneNumber || dummyUser.contactNumber || "not stated"}
                 />
             </ListItem>
             <ListItem>
                 <ListItemText 
                  primary="Email"
                  secondary={user?.userEmail || dummyUser.email || "not stated"}
                 />
             </ListItem>
             <ListItem>
                 <ListItemText 
                  primary="Date of Birth"
                  secondary={user?.userDateOfBirth || dummyUser.dateOfBirth || "not stated"}
                 />
             </ListItem>
             <ListItem>
                 <ListItemText 
                  primary="Gender"
                  secondary={user?.userGender || dummyUser.gender ||  "not stated"}
                 />
             </ListItem>
          </List>
        </Box>
      </StyledCardContent>
      
    </StyledCard>
    </Box>
  );
}
