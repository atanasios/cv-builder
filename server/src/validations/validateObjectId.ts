import { Types } from "mongoose";

export const validateObjectId = (value: string | Types.ObjectId) => {
  if (!Types.ObjectId.isValid(value)) {
    throw new Error("Invalid Mongoose ID");
  }

  return value;
};
