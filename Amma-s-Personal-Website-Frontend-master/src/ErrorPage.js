import React from 'react';
import { Typography, Button, Container } from '@mui/material';

const ErrorPage = ({ error, errorInfo }) => {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '20vh' }}>
      <Typography variant="h4" color="error" gutterBottom>
        Oops! Something went wrong.
      </Typography>
      <Typography variant="body1" color="textSecondary" paragraph>
        We're sorry, but an unexpected error occurred.
      </Typography>
      {error && (
        <>
          <Typography variant="body2" color="textSecondary" paragraph>
            Error Details:
          </Typography>
          <pre>{error.toString()}</pre>
        </>
      )}
      {errorInfo && (
        <>
          <Typography variant="body2" color="textSecondary" paragraph>
            Error Info:
          </Typography>
          <Typography>
          <pre>{JSON.stringify(errorInfo, null, 2)}</pre>
          </Typography>
        </>
      )}
      <Button variant="contained" color="primary" onClick={handleRefresh}>
        Refresh Page
      </Button>
    </Container>
  );
};

export default ErrorPage;
