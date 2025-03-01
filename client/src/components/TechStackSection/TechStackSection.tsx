import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { useDispatch } from "react-redux";
import { Form } from "react-router-dom";
import { setError, setIsLoading } from "../../state/app/appSlice";
import notification from "../../services/notification";
import axios from "axios";
import { Formik } from "formik";
import Input from "../Input/Input";
import SubmitButton from "../SubmitButton/SubmitButton";
import { techStackSchema } from "../../validations/techStackSchema";

type FormValues = {
  languages: string;
  frameworks: string;
  databases: string;
  additionalSkills: string;
  cicd: string;
  testing: string;
};

const TechStackSection: React.FC = () => {
  const dispatch = useDispatch();

  const initialValues: FormValues = {
    languages: "",
    frameworks: "",
    databases: "",
    additionalSkills: "",
    cicd: "",
    testing: "",
  };
  const isLoading = useSelector((state: RootState) => state.app.isLoading);

  const onSubmit = async (credentials: FormValues) => {
    try {
      //   dispatch(setIsLoading(true));
      //   const response = await register(credentials);
      //   const user = response.data.user;
      //   dispatch(setUser(user));
      //   notification.success('You are now signed in');
      //   navigate("/");
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
        validationSchema={techStackSchema}
        onSubmit={onSubmit}
      >
        {({ isValid, values, errors, touched }) => (
          <Form>
            <Input
              name="languages"
              Icon={MailIcon}
              type="text"
              placeholder="Email Address"
              className=""
            />
            <Input
              name="frameworks"
              Icon={UserIcon}
              type="text"
              placeholder="Username"
              className=""
            />
            <Input
              name="databases"
              Icon={LockIcon}
              type="text"
              placeholder="Password"
              className=""
            />
            <Input
              name="additionalSkills"
              Icon={LockIcon}
              type="text"
              placeholder="Password"
              className=""
            />

            <Input
              name="cicd"
              Icon={LockIcon}
              type="text"
              placeholder="Password"
              className=""
            />

            <Input
              name="testing"
              Icon={LockIcon}
              type="text"
              placeholder="Password"
              className=""
            />

            {errors && errors.languages && touched.languages && (
              <p className="text-red-600 text-sm  mt-2 mb-2">{errors.languages}</p>
            )}
            {errors && errors.frameworks && touched.frameworks && (
              <p className="text-red-600 text-sm  mt-2">{errors.frameworks}</p>
            )}
            {errors && errors.databases && touched.databases && (
              <p className="text-red-600 text-sm  mt-2">{errors.databases}</p>
            )}
              {errors && errors.additionalSkills && touched.additionalSkills && (
              <p className="text-red-600 text-sm  mt-2">{errors.additionalSkills}</p>
            )}
               {errors && errors.cicd && touched.cicd && (
              <p className="text-red-600 text-sm  mt-2">{errors.cicd}</p>
            )}
              {errors && errors.testing && touched.testing && (
              <p className="text-red-600 text-sm  mt-2">{errors.testing}</p>
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
  );
};

export default TechStackSection;
