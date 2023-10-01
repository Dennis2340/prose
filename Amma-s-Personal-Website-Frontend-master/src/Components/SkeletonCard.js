import React from 'react';
import { Card, CardContent, Skeleton, Typography,} from '@mui/material';
import { styled } from '@mui/system';

const StyledCard = styled(Card)(
    ({ theme }) => ({
      width: '100%',
      height: "100%",
      textAlign: 'center',
      maxWidth: 500,
      minWidth: "auto",
      margin: 'auto',
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
      transition: '0.3s',
      '&:hover': {
        boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
      },
      background: '#f9f9f9',
      border: '1px solid #ccc',
    })
  );

const SkeletonCard = () => {
  return (
    <StyledCard>
      <CardContent>
        <Typography variant="h5" sx={{marginLeft: 10}}>
          <Skeleton animation="wave" height={24} width="80%" />
        </Typography>
        <Skeleton animation="wave" variant="rectangular" height={140} />
        <Typography variant="body2" sx={{marginLeft: {xs:10, lg: 20} }}>
          <Skeleton animation="wave" height={16} width="60%" />
        </Typography>
        <Typography  sx={{marginLeft: {xs: 14,lg: 25} }}>
          <Skeleton animation="wave" variant='rectangular' height={32} width="40%" />
        </Typography>
      </CardContent>
    </StyledCard>
  );
};

export default SkeletonCard;
