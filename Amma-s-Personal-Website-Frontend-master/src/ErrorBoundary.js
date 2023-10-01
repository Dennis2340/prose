import React, { useState, useEffect } from 'react';
import ErrorPage from './ErrorPage';

const ErrorBoundary = ({ children }) => {
  const [errorState, setErrorState] = useState({
    hasError: false,
    error: null,
    errorInfo: null,
    isOnline: navigator.onLine,
  });

  const handleError = (error, errorInfo) => {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
    
    // Check if the error is related to internet connection
    const isInternetError =
      error.message && error.message.toLowerCase().includes('network error');

    setErrorState({
      hasError: true,
      error,
      errorInfo,
      isOnline: navigator.onLine && !isInternetError, // Exclude internet errors from isOnline
    });
  };

  useEffect(() => {
    const handleWindowError = (event) => {
      handleError(event.error, null);
    };

    window.addEventListener('error', handleWindowError);

    // Check for online/offline changes
    const handleOnlineStatusChange = () => {
      setErrorState((prev) => ({
        ...prev,
        isOnline: navigator.onLine && !prev.error?.message?.toLowerCase().includes('network error'),
      }));
    };

    window.addEventListener('online', handleOnlineStatusChange);
    window.addEventListener('offline', handleOnlineStatusChange);

    return () => {
      window.removeEventListener('error', handleWindowError);
      window.removeEventListener('online', handleOnlineStatusChange);
      window.removeEventListener('offline', handleOnlineStatusChange);
    };
  }, []);

  if (errorState.hasError) {
    return <ErrorPage error={errorState.error} errorInfo={errorState.errorInfo} isOnline={errorState.isOnline} />;
  }

  return children;
};

export default ErrorBoundary;
