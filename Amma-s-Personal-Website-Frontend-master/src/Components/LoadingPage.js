import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { Typography, Skeleton } from '@mui/material';

// Function to generate a skeleton card
const SkeletonCard = () => {
  return (
    <Box sx={{ p: 2 }}>
      <Skeleton variant="text" width={150} height={20} />
      <Skeleton variant="text" width={100} height={16} />
      <Skeleton variant="text" width={250} height={16} />
      <Skeleton variant="text" width={80} height={16} />
    </Box>
  );
};

export default function LinearIndeterminate() {
  return (
    <Box>
        <Box mt={-10}>
            <Typography variant='h5'>Please wait while page is Loading</Typography>
        </Box>
        <Box mt={20}>
          <SkeletonCard/>
      <LinearProgress style={{height: 10}}/>
      </Box>
    </Box>
  );
}