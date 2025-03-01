import { InferSchemaType } from "mongoose";
import CVModel from "../models/cv.model";

export interface CV extends InferSchemaType<typeof CVModel.schema> {}
