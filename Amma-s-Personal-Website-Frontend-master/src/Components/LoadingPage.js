import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { Typography } from '@mui/material';

export default function LinearIndeterminate() {
  return (
    <Box sx={{ width: {xs: '70%', sm: "75%" }}}>
        <Box
        sx={{marginBottom: 15,marginLeft: {xs: 15, sm: 50}}}
        >
            <Typography variant='h5'>Please wait while page is Loading</Typography>
        </Box>
        <Box sx={{marginLeft: {xs: 13, sm: 30}}}>
      <LinearProgress style={{height: 10}}/>
      </Box>
    </Box>
  );
}