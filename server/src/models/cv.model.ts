import mongoose, { Schema } from "mongoose";

const LANG_LEVELS = ["Beginner", "Intermediate", "Fluent", "Native"];

const cvSchema = new mongoose.Schema(
  {
    userId: { type: Schema.ObjectId, required: true, ref: "User" },
    imageURL: { type: String },
    age: { type: Number },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    address: { type: String, default: null },
    telephone: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    bio: { type: String },
    technologies: { type: [String], default: [] },
    socials: [
      {
        platform: { type: String, required: true, trim: true },
        link: { type: String, required: true, trim: true },
      },
    ],
    experience: [
      {
        title: { type: String, required: true },
        company: { type: String, required: true },
        startDate: { type: Date, required: true },
        endDate: { type: Date, default: null },
        description: { type: String, default: null },
        technologies: { type: [String], default: [] },
      },
    ],
    softSkills: { type: [String], default: [] },
    languages: [
      {
        name: { type: String, required: true },
        level: { type: String, enum: LANG_LEVELS, required: true },
      },
    ],
    hobbies: { type: [String], default: [] },
  },
  { timestamps: true }
);

const CVModel = mongoose.model("CV", cvSchema);
export default CVModel;
