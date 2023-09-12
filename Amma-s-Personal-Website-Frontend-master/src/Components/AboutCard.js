import React,{useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function BasicCard({user}) {


  console.log(user)
 
   const url = user?.pictureUrl
   console.log(url)
   const filename = url?.split("/");
   console.log(filename)
   const mainUrl = filename[filename.length - 1];
   console.log(mainUrl)

   const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

   const paddingTopValue = isSmallScreen ? '150%' : '56.46%';
 
  return (
    <Card sx={{ minWidth: 275, marginBottom: 5, width: {xs : "50%", sm: "100%"} }}>
      <CardContent>
        <Typography  variant='h5' color="text.secondary" >
           {user.userName}
        </Typography>
        <Box sx={{marginTop: 3}}>
        <Typography sx={{marginTop: 2}} variant="body2">
          {user.userDescription}
        </Typography>
        </Box>
        <Box sx={{
          marginTop: 4, 
          marginBottom: 4,
          position: 'relative',
          paddingTop: paddingTopValue,
          width: '100%',
          height: 'auto',
          overflow: 'hidden',
        }}
        >
        <img 
        src={`https://ammas-sites-api.onrender.com/user/userImage/${mainUrl}`} 
        alt='The owner is smiling'
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
        </Box>


        <Box>
        <Typography variant='h5' component="h2">
          Ways to contact me
        </Typography>
        </Box>
        <Box>
        <Typography sx={{ marginTop: 1}} variant="body2">
          {
            `please contact me for any additional info by phone +232${user.userPhoneNumber?.slice(1)} or by email ${user.userEmail}`
          }
        </Typography>
        </Box>
      </CardContent>
      
    </Card>
  );
}
