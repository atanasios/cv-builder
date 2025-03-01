import React from 'react';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import { Mail as MailIcon, Lock as LockIcon } from "lucide-react";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { setUser } from "../../state/auth/authSlice";
import { setError, setIsLoading } from "../../state/app/appSlice";

import { signInSchema } from "../../validations/signInSchema";

import SubmitButton from "../../components/SubmitButton/SubmitButton";
import Input from "../../components/Input/Input";

import { login } from "../../services/authService";
import notification from '../../services/notification';

type FormValues = {
    email: string;
    password: string;
  };

const SignInForm: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const initialValues: FormValues = { email: "", password: "" };
    const isLoading = useSelector((state: RootState) => state.app.isLoading);

    const onSubmit = async (credentials: FormValues) => {
        try {
          dispatch(setIsLoading(true));
          const response = await login(credentials);
          const user = response.data.user;
          dispatch(setUser(user));
          notification.success('Login successful');
          navigate('/');
        } catch(error: unknown) {
          if (axios.isAxiosError(error) && error.response) {
            dispatch(setError(error.response.data.message));
          } else {
            dispatch(setError('An unexpected error occurred'));
          }
        } finally {
          dispatch(setIsLoading(false));    
        }
      }

    const onDemoUserLoginHandler = async () => {
      try {

        const DEMO_USER_CREDENTIALS = {
          email: 'test@abv.bg',
          password: 'Test123!'
        }

        dispatch(setIsLoading(true));
        const response = await login(DEMO_USER_CREDENTIALS);
        const user = response.data.user;
        dispatch(setUser(user));
        notification.success('Login successful');
        navigate('/');
      } catch(error: unknown) {
        if (axios.isAxiosError(error) && error.response) {
          dispatch(setError(error.response.data.message));
        } else {
          dispatch(setError('An unexpected error occurred'));
        }
      } finally {
        dispatch(setIsLoading(false));    
      }
    }

  return (
    <Formik
    initialValues={initialValues}
    validationSchema={signInSchema}
    onSubmit={onSubmit}
  >
    {({ isValid, errors, touched }) => (
      <Form>
        <Input
          name="email"
          Icon={MailIcon}
          type="email"
          placeholder="Email Address"
          className=""
        />
        <Input
          name="password"
          Icon={LockIcon}
          type="password"
          placeholder="Password"
          className=""
        />

        <div className="flex justify-end items-center mb-6">
          <Link
            to="/auth/forgot-password"
            className="text-sm text-white hover:underline"
          >
            Forgot password?
          </Link>
        </div>
        {errors && errors.email && touched.email && (
          <p className="text-red-600 text-sm  mt-2 mb-2">
            {errors.email}
          </p>
        )}
          {errors && errors.password && touched.password && (
          <p className="text-red-600 text-sm  mt-2 mb-2">
            {errors.password}
          </p>
        )}
        <SubmitButton
          type="submit"
          disabled={!isValid}
          isLoading={isLoading}
          title={"Login"}
        />
        <SubmitButton
          type="submit"
          disabled={!isValid}
          isLoading={isLoading}
          onClick={onDemoUserLoginHandler}
          title={"Login Demo User"}
        />
      </Form>
    )}
  </Formik>
  )
}

export default SignInForm;
