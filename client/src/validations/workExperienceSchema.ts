import * as Validator from "yup";

export const workExperienceSchema = Validator.object().shape({
    title: Validator.string().required(),
    company: Validator.string().required(),
    startDate: Validator.string().required(),
    endDate: Validator.string().required(),
    description: Validator.string().required(),
    technologies: Validator.string().required(),
});