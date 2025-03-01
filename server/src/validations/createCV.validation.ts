import Joi from "joi";
import mongoose from "mongoose";

const LANG_LEVELS = ["Beginner", "Intermediate", "Fluent", "Native"];

const cvValidationSchema = Joi.object({
  imageURL: Joi.string()
    .uri()
    .allow(null, "")
    .messages({
      "string.uri": "Image URL must be a valid URL.",
    }),

  age: Joi.number()
    .integer()
    .min(0)
    .max(100)
    .allow(null)
    .messages({
      "number.base": "Age must be a number.",
      "number.min": "Age cannot be negative.",
      "number.max": "Age must be between 1 and 100.",
    }),

  firstName: Joi.string()
    .min(2)
    .max(50)
    .required()
    .messages({
      "string.empty": "First name is required.",
      "string.min": "First name must be at least 2 characters.",
      "string.max": "First name cannot exceed 50 characters.",
    }),

  lastName: Joi.string()
    .min(2)
    .max(50)
    .required()
    .messages({
      "string.empty": "Last name is required.",
      "string.min": "Last name must be at least 2 characters.",
      "string.max": "Last name cannot exceed 50 characters.",
    }),

  address: Joi.string().allow(null, ""),

  telephone: Joi.string()
    .length(10)
    .pattern(/^\+?[0-9]{10}$/)
    .required()
    .messages({
      "string.pattern.base": "Telephone must be a valid phone number (10 digits).",
      "any.required": "Telephone is required.",
    }),

  email: Joi.string()
    .email()
    .required()
    .messages({
      "string.email": "Email must be a valid email address.",
      "any.required": "Email is required.",
    }),

  bio: Joi.string().allow(null, ""),

  technologies: Joi.array()
    .items(Joi.string())
    .default([])
    .messages({
      "array.base": "Technologies must be an array of strings.",
    }),

  socials: Joi.array()
    .items(
      Joi.object({
        platform: Joi.string().trim().required().messages({
          "string.empty": "Social platform is required.",
        }),
        link: Joi.string().uri().trim().required().messages({
          "string.uri": "Social link must be a valid URL.",
          "string.empty": "Social link is required.",
        }),
      })
    )
    .default([]),

  experience: Joi.array()
    .items(
      Joi.object({
        title: Joi.string().required().messages({
          "string.empty": "Experience title is required.",
        }),
        company: Joi.string().required().messages({
          "string.empty": "Company name is required.",
        }),
        startDate: Joi.date().iso().required().messages({
          "date.format": "Start date must be a valid ISO date.",
          "any.required": "Start date is required.",
        }),
        endDate: Joi.date().iso().allow(null).messages({
          "date.format": "End date must be a valid ISO date.",
        }),
        description: Joi.string().allow(null, ""),
        technologies: Joi.array()
          .items(Joi.string())
          .default([])
          .messages({
            "array.base": "Technologies must be an array of strings.",
          }),
      })
    )
    .default([]),

  softSkills: Joi.array()
    .items(Joi.string())
    .default([])
    .messages({
      "array.base": "Soft skills must be an array of strings.",
    }),

  languages: Joi.array()
    .items(
      Joi.object({
        name: Joi.string().required().messages({
          "string.empty": "Language name is required.",
        }),
        level: Joi.string()
          .valid(...LANG_LEVELS)
          .required()
          .messages({
            "any.only": `Language level must be one of: ${LANG_LEVELS.join(", ")}.`,
            "any.required": "Language level is required.",
          }),
      })
    )
    .default([]),

  hobbies: Joi.array()
    .items(Joi.string())
    .default([])
    .messages({
      "array.base": "Hobbies must be an array of strings.",
    }),
});

export default cvValidationSchema;
