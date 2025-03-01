import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { useDispatch } from "react-redux";
import { setError, setIsLoading } from "../../state/app/appSlice";
import axios from "axios";
import { Formik, Form } from "formik";
import Input from "../Input/Input";
import SubmitButton from "../SubmitButton/SubmitButton";
import { techStackSchema } from "../../validations/techStackSchema";

type TechStackSectionProps = {
  nextStep: () => void;
  prevStep: () => void;
};

type FormValues = {
  languages: string;
  frameworks: string;
  databases: string;
  additionalSkills: string;
  cicd: string;
  testing: string;
};

const TechStackSection: React.FC<TechStackSectionProps> = ({ nextStep, prevStep }) => {
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
      dispatch(setIsLoading(true));
      
      //   dispatch(the form values when global state is done);
      nextStep();
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
    <section className="w-[50dvw] p-10">
      <Formik
        initialValues={initialValues}
        validationSchema={techStackSchema}
        onSubmit={onSubmit}
      >
        {({ isValid, errors, touched }) => (
          <Form>
            <label>Programming languages</label>
            <Input
              name="languages"
              type="text"
              placeholder="Enter your programming languages"
              className=""
            />
            {errors && errors.languages && touched.languages && (
              <p className="text-red-600 text-sm  mt-2 mb-2">
                {errors.languages}
              </p>
            )}
            <label>Frameworks</label>
            <Input
              name="frameworks"
              type="text"
              placeholder="Enter frameworks you are familiar with"
              className=""
            />
            {errors && errors.frameworks && touched.frameworks && (
              <p className="text-red-600 text-sm  mt-2">{errors.frameworks}</p>
            )}
            <label>Databases</label>
            <Input
              name="databases"
              type="text"
              placeholder="Enter databases you have experience with"
              className=""
            />
            {errors && errors.databases && touched.databases && (
              <p className="text-red-600 text-sm  mt-2">{errors.databases}</p>
            )}
            <label>Additional Skills</label>
            <Input
              name="additionalSkills"
              type="text"
              placeholder="Enter additional skills (e.g., version control, cloud services)"
              className=""
            />
            {errors && errors.additionalSkills && touched.additionalSkills && (
              <p className="text-red-600 text-sm  mt-2">
                {errors.additionalSkills}
              </p>
            )}
            <label>CI/CD tools</label>
            <Input
              name="cicd"
              type="text"
              placeholder="Enter CI/CD tools you have used"
              className=""
            />

            {errors && errors.cicd && touched.cicd && (
              <p className="text-red-600 text-sm  mt-2">{errors.cicd}</p>
            )}

            <label>Testing tools</label>
            <Input
              name="testing"
              type="text"
              placeholder="Enter your testing tools"
              className=""
            />

            {errors && errors.testing && touched.testing && (
              <p className="text-red-600 text-sm  mt-2">{errors.testing}</p>
            )}
            <SubmitButton
              type="submit"
              disabled={!isValid}
              isLoading={isLoading}
              title={"Save"}
            />
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default TechStackSection;
