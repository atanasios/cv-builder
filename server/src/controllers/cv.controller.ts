import { Response, NextFunction } from "express";
import { AuthRequest } from "../types/AuthRequest.ts";
import cvValidationSchema from "../validations/createCV.validation.ts";
import cvService from "../services/cv.service";
import { BadRequestError } from "../utils/errors.ts";
import { extractUserIdFromReq } from "../utils/extractUserIdFromReq.ts";

const updateCVSchema = cvValidationSchema.fork(
  Object.keys(cvValidationSchema.describe().keys),
  (schema) => schema.optional()
);

const getMyCV = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const userId = extractUserIdFromReq(req);
  try {
    const cv = await cvService.getCVByUserId(userId);
    res.status(200).json({ success: true, data: cv });
  } catch (error) {
    next(error);
  }
};

const createCV = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const { error, value } = cvValidationSchema.validate(req.body);
  if (error) return next(new BadRequestError(error.message));

  const userId = extractUserIdFromReq(req);

  try {
    const createdCV = await cvService.createCV(userId, value);
    res.status(201).json({ success: true, data: createdCV });
  } catch (error) {
    next(error);
  }
};

const editCV = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const { error, value } = updateCVSchema.validate(req.body);
  if (error) return next(new BadRequestError(error.message));

  const userId = extractUserIdFromReq(req);
  const cvId = req.params.cvId;

  try {
    const editedCV = await cvService.updateCV(cvId, userId, value);
    res.status(200).json({ success: true, data: editedCV });
  } catch (error) {
    next(error);
  }
};

const deleteCV = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const userId = extractUserIdFromReq(req);
  const cvId = req.params.cvId;

  try {
    await cvService.deleteCV(cvId, userId);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

export default {
  getMyCV,
  createCV,
  editCV,
  deleteCV,
};
