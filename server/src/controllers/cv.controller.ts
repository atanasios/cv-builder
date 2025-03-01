import { Request, Response } from "express";
import { User } from "../models/user.model";
import cvValidationSchema  from "../validations/createCV.validation.ts";
import cvService from "../services/cv.service"
import { send } from "process";

const getMyCV = async  (req: Request, res: Response) => {
    const userId = req.userId;
    try {
        const cv = await cvService.getCVByUserId(userId);
    
        res.status(200).json({ success: true, ...cv });

    } catch (error: unknown) {
        res.status(404).json({ success: false, message: (error as Error).message });
    }
};

const createCV = async  (req: Request, res: Response) => {
    
    const { error, value } = cvValidationSchema.validate(req.body);
    const userId = req.userId;

    try {
        const createdCV = await cvService.createCV(userId ,value);
        
        res.status(200).json({ success: true, ...createdCV });
        
    } catch (error: unknown) {
        res.status(404).json({ success: false, message: (error as Error).message });;
    }
};

const editCV = async  (req: Request, res: Response) => {

    const { error, value } = cvValidationSchema.validate(req.body);
    const userId = req.userId;
    const cvId = req.params.cvId;

    try {

        const editedCV = await cvService.updateCV(cvId, userId, value);
        res.status(200).json({ success: true, data: editedCV });

    } catch (error: unknown) {
          res.status(404).json({ success: false, message: (error as Error).message });
    }
};

const deleteCV =  async  (req: Request, res: Response) => {
    const cvId = req.params.cvId;
    const userId = req.userId;
    
    try {

        const deletedCv = await cvService.deleteCV(cvId, userId);
        res.status(200).json({ success: true, data: deletedCv });

    } catch (error: unknown) {
       res.status(404).json({ success: false, message: (error as Error).message });
    }
};

export default {
    getMyCV,
    createCV,
    editCV,
    deleteCV,
  };
