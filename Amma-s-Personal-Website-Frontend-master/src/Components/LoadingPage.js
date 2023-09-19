import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { Typography } from '@mui/material';

export default function LinearIndeterminate() {
  return (
    <Box>
        <Box mt={-10}>
            <Typography variant='h5'>Please wait while page is Loading</Typography>
        </Box>
        <Box mt={20}>
      <LinearProgress style={{height: 10}}/>
      </Box>
    </Box>
  );
}