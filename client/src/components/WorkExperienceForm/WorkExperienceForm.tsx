import { Formik, Form } from "formik";
import { workExperienceSchema } from "../../validations/workExperienceSchema";
import styles from "./WorkExperience.module.css";
import Input from "../Input/Input";
import SubmitButton from "../SubmitButton/SubmitButton";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { useDispatch } from "react-redux";
import { setError, setIsLoading } from "../../state/app/appSlice";
import axios from "axios";


type TechStackSectionProps = {
    nextStep: () => void;
    prevStep: () => void;
};

type FormValues = {
    title: string;
    company: string;
    startDate: string;
    endDate: string;
    description: string;
    technologies: string;
};

const WorkExperienceForm: React.FC<TechStackSectionProps> = ({ nextStep, prevStep }) => {
    const dispatch = useDispatch();

    const initialValues: FormValues = {
        title: "",
        company: "",
        startDate: "",
        endDate: "",
        description: "",
        technologies: "",
    };

    const isLoading = useSelector((state: RootState) => state.app.isLoading);


    const onSubmit = (credentials: FormValues) => {
        
        try {

            dispatch(setIsLoading(true));

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

    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={workExperienceSchema}
            onSubmit={onSubmit}
        >
            {({ isValid, errors, touched }) => (
                <Form className={styles.form}>

                    <label>Title</label>
                    <Input
                        name="title"
                        type="text"
                        placeholder="Enter your title"
                        className=""
                    />
                    {errors && errors.title && touched.title && (
                        <p className="text-red-600 text-sm  mt-2 mb-2">
                            {errors.title}
                        </p>
                    )}

                    <label>Company</label>
                    <Input
                        name="company"
                        type="text"
                        placeholder="Enter your company"
                        className=""
                    />
                    {errors && errors.company && touched.company && (
                        <p className="text-red-600 text-sm  mt-2 mb-2">
                            {errors.company}
                        </p>
                    )}

                    <label>Start Date</label>
                    <Input
                        name="startDate"
                        type="text"
                        placeholder="Enter your start date"
                        className=""
                    />
                    {errors && errors.startDate && touched.startDate && (
                        <p className="text-red-600 text-sm  mt-2 mb-2">
                            {errors.startDate}
                        </p>
                    )}

                    <label>End Date</label>
                    <Input
                        name="endDate"
                        type="text"
                        placeholder="Enter your end date"
                        className=""
                    />
                    {errors && errors.endDate && touched.endDate && (
                        <p className="text-red-600 text-sm  mt-2 mb-2">
                            {errors.endDate}
                        </p>
                    )}

                    <label>Description</label>
                    <Input
                        name="description"
                        type="text"
                        placeholder="Enter your description"
                        className=""
                    />

                    <label>Technologies</label>
                    <Input
                        name="technologies"
                        type="text"
                        placeholder="Enter your technologies"
                        className=""
                    />

                    <SubmitButton
                        type="submit"
                        disabled={!isValid}
                        isLoading={isLoading}
                        title={"Save"}
                    />

                </Form>
            )}
        </Formik>
    );

};

export default WorkExperienceForm;