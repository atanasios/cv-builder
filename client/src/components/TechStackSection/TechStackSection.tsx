import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../state/store';
import { useDispatch } from 'react-redux';
import { Form, useNavigate } from 'react-router-dom';
import { setError, setIsLoading } from '../../state/app/appSlice';
import notification from '../../services/notification';
import axios from 'axios';
import { Formik } from 'formik';
import Input from '../Input/Input';
import SubmitButton from '../SubmitButton/SubmitButton';


type FormValues = {
    email: string;
    password: string;
    username: string;
};


const TechStackSection: React.FC = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const initialValues: FormValues = { email: "", password: "", username: "" };
    const isLoading = useSelector((state: RootState) => state.app.isLoading);

    const onSubmit = async (credentials: FormValues) => {
        try {
          dispatch(setIsLoading(true));
          const response = await register(credentials);
          const user = response.data.user;
          dispatch(setUser(user));
          notification.success('You are now signed in');
          navigate("/");
        } catch (error: unknown) {
          if (axios.isAxiosError(error) && error.response) {
            dispatch(setError(error.response.data.message));
          } else {
            dispatch(setError("An unexpected error occurred"));
          }
        } finally {
          dispatch(setIsLoading(false));
        }
      };
    

  return (
    <section>
        <Formik
      initialValues={initialValues}
      validationSchema={signUpSchema}
      onSubmit={onSubmit}
    >
      {({ isValid, values, errors, touched }) => (
        <Form>
          <Input
            name="email"
            Icon={MailIcon}
            type="email"
            placeholder="Email Address"
            className=""
          />

          <Input
            name="username"
            Icon={UserIcon}
            type="text"
            placeholder="Username"
            className=""
          />
          <Input
            name="password"
            Icon={LockIcon}
            type="password"
            placeholder="Password"
            className=""
          />
          {errors && errors.email && touched.email && (
            <p className="text-red-600 text-sm  mt-2 mb-2">{errors.email}</p>
          )}
          {errors && errors.username && touched.username && (
            <p className="text-red-600 text-sm  mt-2">{errors.username}</p>
          )}

          <SubmitButton
            type="submit"
            disabled={!isValid}
            isLoading={isLoading}
            title={"Sign Up"}
          />
        </Form>
      )}
    </Formik>
      
    </section>
  )
}

export default TechStackSection
