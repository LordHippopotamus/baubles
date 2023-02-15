import { Alert } from "@mui/material"
import { useEffect } from "react";

const ErrorAlert = ({errors, watch, clearErrors}) => {
    useEffect(() => {
    const subscription = watch(() => clearErrors('alert'));
    return () => subscription.unsubscribe();
  }, [watch]);
  
   if (errors.alert) return <Alert severity="error">{errors.alert?.message}</Alert>
}

export default ErrorAlert