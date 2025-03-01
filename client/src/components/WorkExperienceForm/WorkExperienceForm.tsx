import { Formik, Form, ErrorMessage, Field } from "formik";
import { workExperienceSchema } from "../../validations/workExperienceSchema";
import styles from "./WorkExperience.module.css";

type FormValues = {
    title: string;
    company: string;
    startDate: string;
    endDate: string;
    description: string;
    technologies: string;
};

const WorkExperienceForm: React.FC = () => {

    const initialValues: FormValues = {
        title: "",
        company: "",
        startDate: "",
        endDate: "",
        description: "",
        technologies: "",
    };


    const onSubmit = (credentials: FormValues) => {

        try {

        } catch (error) {

        }

    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={workExperienceSchema}
            onSubmit={onSubmit}
        >
            {({ isValid }) => (
                <Form className={styles.form}>

                    <div>
                        <Field className={styles.input} type="text" name="title" placeholder="Title*" />
                        <ErrorMessage name="title" component="div" className="error" />
                    </div>

                    <div>
                        <Field className={styles.input} type="text" name="company" placeholder="Company*" />
                        <ErrorMessage name="company" component="div" className="error" />
                    </div>

                    <div>
                        <Field className={styles.input} type="text" name="startDate" placeholder="Start date*" />
                        <ErrorMessage name="startDate" component="div" className="error" />
                    </div>

                    <div>
                        <Field className={styles.input} type="text" name="endDate" placeholder="End date*" />
                        <ErrorMessage name="endDate" component="div" className="error" />
                    </div>

                    <div>
                        <Field className={styles.input} type="text" name="description" placeholder="Description" />
                        <ErrorMessage name="description" component="div" className="error" />
                    </div>

                    <div>
                        <Field className={styles.input} type="text" name="technologies" placeholder="Technologies" />
                        <ErrorMessage name="technologies" component="div" className="error" />
                    </div>

                    <button type="submit" disabled={!isValid}>
                        {isValid ? "Save" : "Saving..."}
                    </button>

                </Form>
            )}
        </Formik>
    );

};

export default WorkExperienceForm;