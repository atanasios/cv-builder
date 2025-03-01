import * as Validator from "yup";

export const techStackSchema = Validator.object().shape({
    languages: Validator.string().required("Enter your languages"),
    frameworks: Validator.string(),
    databases: Validator.string(),
    additionalSkills: Validator.string(),
    cicd: Validator.string(),
    testing: Validator.string(),
});