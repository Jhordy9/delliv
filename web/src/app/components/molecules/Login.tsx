'use client';
import { Input } from '@/app/components/atoms/Input';
import { Button } from '@/app/components/atoms/Button';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { Formik, Form, Field, FieldProps, FormikHelpers } from 'formik';
import { useDispatch } from 'react-redux';
import { login } from '@/app/redux/slices/authSlice';
import { AppDispatch } from '@/app/redux/store';
import { useRouter } from 'next/navigation';

type Credentials = {
  email: string;
  password: string;
};

export const LoginForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const toast = useToast();

  const validateEmail = (value: string) => {
    let error;
    if (!value) {
      error = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(value)) {
      error = 'Invalid email address';
    }
    return error;
  };

  const validatePassword = (value: string) => {
    let error;
    if (!value) {
      error = 'Password is required';
    } else if (value.length < 6) {
      error = 'Password must be at least 6 characters';
    }
    return error;
  };

  const handleLogin = (
    values: Credentials,
    actions: FormikHelpers<Credentials>
  ) => {
    dispatch(login({ email: values.email, password: values.password }))
      .unwrap()
      .then(() => {
        toast({
          title: 'Login successful',
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
        router.push('/orders');
        actions.setSubmitting(false);
      })
      .catch((error) => {
        toast({
          title: 'Email or password is incorrect',
          description: error.message,
          status: 'error',
          duration: 2000,
          isClosable: true,
        });
        actions.setErrors(error);
        actions.setSubmitting(false);
      });
  };

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      onSubmit={(values, actions) => handleLogin(values, actions)}
    >
      {() => (
        <Form>
          <VStack spacing={2}>
            <Field name='email' validate={validateEmail}>
              {({ field, form }: FieldProps<string, { email: string }>) => (
                <FormControl
                  isInvalid={!!(form.errors.email && form.touched.email)}
                >
                  <FormLabel>Email</FormLabel>
                  <Input
                    {...field}
                    type='email'
                    placeholder='Enter your email'
                  />
                  <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <Field name='password' validate={validatePassword}>
              {({ field, form }: FieldProps<string, { password: string }>) => (
                <FormControl
                  isInvalid={!!(form.errors.password && form.touched.password)}
                >
                  <FormLabel>Password</FormLabel>
                  <Input
                    {...field}
                    placeholder='Enter your password'
                    type='password'
                  />
                  <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
          </VStack>

          <Button mt={4} text='Login' type='submit' />
        </Form>
      )}
    </Formik>
  );
};
