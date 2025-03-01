import { Types } from "mongoose";
import { BadRequestError } from "../utils/errors";

export const validateObjectId = (value: string | Types.ObjectId) => {
  if (!Types.ObjectId.isValid(value)) {
    throw new BadRequestError("Invalid Mongoose ID");
  }

  return value;
};
