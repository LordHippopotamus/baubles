import { Alert } from '@mui/material';
import { useEffect } from 'react';
import { FieldValues, FormState, Path, UseFormClearErrors, UseFormWatch } from 'react-hook-form';

type Props<T extends FieldValues> = {
  watch: UseFormWatch<T>;
  errors: FormState<T>['errors'];
  clearErrors: UseFormClearErrors<T>;
  name: Path<T>;
};

const ErrorAlert = <T extends FieldValues>({
  errors,
  watch,
  clearErrors,
  name,
}: Props<T>): JSX.Element | null => {
  useEffect(() => {
    const subscription = watch(() => clearErrors(name));
    return subscription.unsubscribe;
  }, [watch]);

  if (!errors.alert) return null;

  return <Alert severity="error">{errors.alert.message as string}</Alert>;
};

export default ErrorAlert;
