import { Formik, Form, ErrorMessage, Field } from "formik";

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


    const onSubmit = () => {

    }

    return (
        <Formik
            initialValues={initialValues}
            // validationSchema={signUpSchema}
            onSubmit={onSubmit}
        >
            {({ isValid }) => (
                <Form>

                    <div>
                        <label>Title:</label>
                        <Field type="text" name="title" />
                        <ErrorMessage name="title" component="div" className="error" />
                    </div>

                    <div>
                        <label>Company:</label>
                        <Field type="text" name="company" />
                        <ErrorMessage name="company" component="div" className="error" />
                    </div>

                    <div>
                        <label>Start date:</label>
                        <Field type="text" name="startDate" />
                        <ErrorMessage name="startDate" component="div" className="error" />
                    </div>

                    <div>
                        <label>End Date:</label>
                        <Field type="text" name="endDate" />
                        <ErrorMessage name="endDate" component="div" className="error" />
                    </div>

                    <div>
                        <label>Description:</label>
                        <Field type="text" name="description" />
                        <ErrorMessage name="description" component="div" className="error" />
                    </div>

                    <div>
                        <label>Technologies:</label>
                        <Field type="text" name="technologies" />
                        <ErrorMessage name="technologies" component="div" className="error" />
                    </div>

                    <button type="submit" disabled={isValid}>
                        {isValid ? "Submitting..." : "Submit"}
                    </button>

                </Form>
            )}
        </Formik>
    );

};

export default WorkExperienceForm;