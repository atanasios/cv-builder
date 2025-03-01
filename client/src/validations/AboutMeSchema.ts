import * as Validator from "yup";

export const AboutMeSchema = Validator.object().shape({
    image: Validator.mixed(),
    firstName: Validator.string().required('Enter first name'),
    lastName: Validator.string().required('Enter last name'),
    age: Validator.number().positive().integer(),
    address: Validator.string(),
    phoneNumber: Validator.string().required('Enter phone number').matches(/^[0-9]{10}$/, 'Enter valid phone number'),
    email: Validator.string().required('Enter email').email('Enter valid email'),
    bio: Validator.string(),
    socials: Validator.string(),
});
