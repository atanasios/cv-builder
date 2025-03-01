import { useState } from "react";
import { AboutMeSchema } from "../../validations/AboutMeSchema";
import { Formik, Form } from "formik";
import SubmitButton from "../SubmitButton/SubmitButton";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setError, setIsLoading } from "../../state/app/appSlice";

type AboutMeSectionProps = {
    nextStep: () => void;
  };

const AboutMeSection: React.FC<AboutMeSectionProps> = ( { nextStep } ) => {
    const dispatch = useDispatch();
    const isLoading = useSelector((state: RootState) => state.app.isLoading);

    const [image, setImage] = useState<File | null>(null);

    const initialValues = {
        image: '',
        age: '',
        firstName: '',
        lastName: '',
        address: '',
        phoneNumber: '',
        email: '',
        bio: '',
        socials: '',
    };

    type FormValues = {
        image: string,
        age: string,
        firstName: string,
        lastName: string,
        address: string,
        phoneNumber: string,
        email: string,
        bio: string,
        socials: string,
      };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
        }
    };

    const onSubmit = async (credentials: FormValues) => {
        try {
          dispatch(setIsLoading(true));
          console.log(credentials);
          
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
        <Formik
              initialValues={initialValues}
              validationSchema={AboutMeSchema}
              onSubmit={onSubmit}
            >
            {({ isValid, values, handleChange, handleBlur, errors, touched }) => (
                <Form className="flex flex-col items-center space-y-4 mt-10">
                        {image && <img src={URL.createObjectURL(image)} alt="profile" className="w-20 h-20 object-contain rounded-full" />}
                        <div className="flex flex-col items-center">
                            <label
                            htmlFor="file-upload"
                            className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition"
                            >
                            Upload Image
                            </label>
                            <input id="file-upload" type="file" className="hidden" onChange={handleImageChange} />
                        </div>
                        <input
                            value={values.age}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="age"
                            className="px-2 rounded-xl w-2/3 xl:w-1/3"
                            type="number"
                            placeholder="Age"
                        />
                        {errors.firstName && touched.firstName && (
                            <span className="text-red-600 text-sm">{errors.firstName}</span>
                        )}
                        <input
                            value={values.firstName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="firstName"
                            className="px-2 rounded-xl w-2/3 xl:w-1/3"
                            type="text"
                            placeholder="First Name"
                        />
                        {errors.lastName && touched.lastName && (
                            <span className="text-red-600 text-sm">{errors.lastName}</span>
                        )}
                        <input
                            value={values.lastName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="lastName"
                            className="px-2 rounded-xl w-2/3 xl:w-1/3"
                            type="text"
                            placeholder="Last Name"
                        />
                        <input
                            value={values.address}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="address"
                            className="px-2 rounded-xl w-2/3 xl:w-1/3"
                            type="text"
                            placeholder="Address"
                        />
                        {errors.phoneNumber && touched.phoneNumber && (
                            <span className="text-red-600 text-sm">{errors.phoneNumber}</span>
                        )}
                        <input
                            value={values.phoneNumber}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="phoneNumber"
                            className="px-2 rounded-xl w-2/3 xl:w-1/3"
                            type="tel"
                            placeholder="Phone Number"
                        />
                        {errors.email && touched.email && (
                            <span className="text-red-600 text-sm">{errors.email}</span>
                        )}
                        <input
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="email"
                            className="px-2 rounded-xl w-2/3 xl:w-1/3"
                            type="email"
                            placeholder="Email"
                        />
                        <input
                            value={values.bio}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="bio"
                            className="px-2 rounded-xl w-2/3 xl:w-1/3"
                            type="text"
                            placeholder="Bio"
                        />
                        <input
                            value={values.socials}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="socials"
                            className="px-2 rounded-xl w-2/3 xl:w-1/3"
                            type="text"
                            placeholder="Socials"
                        />
                        
                        <div className="w-2/3 xl:w-1/3">
                            <SubmitButton
                                type="submit"
                                disabled={!isValid}
                                isLoading={isLoading}
                                title={"Save"}
                            />
                        </div>
                </Form>
            )}
        </Formik>
    )
}

export default AboutMeSection;