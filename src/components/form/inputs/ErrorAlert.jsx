import { Alert, AlertTitle } from '@mui/material';
import { useEffect } from 'react';

const ErrorAlert = ({ errors, watch, clearErrors }) => {
  useEffect(() => {
    const subscription = watch(() => clearErrors('alert'));
    return subscription.unsubscribe;
  }, [watch]);

  if (!errors.alert) return;

  if (errors.alert.description)
    return (
      <Alert severity="error">
        <AlertTitle>{errors.alert.message}</AlertTitle>
        {errors.alert.description}
      </Alert>
    );

  return <Alert severity="error">{errors.alert.message}</Alert>;
};

export default ErrorAlert;
