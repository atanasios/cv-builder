import CVModel from "../models/cv.model";
import { User } from "../models/user.model";
import { CV } from "../types/CV";
import { validateObjectId } from "../validations/validateObjectId";

class CVService {
  async getCVByUserId(userId: string) {
    validateObjectId(userId);

    const foundCV = await CVModel.findOne({ userId }).lean();
    if (!foundCV) throw new Error("Not Found. CV with such user ID doesn't exist.");

    return foundCV;
  }

  async createCV(userId: string, data: CV) {
    validateObjectId(userId);

    const user = await User.findById(userId).lean();
    if (!user) throw new Error("User not found. Cannot create CV.");

    const createdCV = await CVModel.create(data);
    return createdCV.toObject();
  }

  async updateCV(cvId: string, userId: string, updateData: Partial<CV>) {
    const { cv } = await this.ensureOwnership(userId, cvId);

    const updatedCV = await CVModel.findByIdAndUpdate(cv._id, updateData, {
      new: true,
      lean: true,
    });

    if (!updatedCV) throw new Error("Not Found. CV doesn't exist.");

    return updatedCV;
  }

  async deleteCV(cvId: string, userId: string) {
    const { cv } = await this.ensureOwnership(userId, cvId);

    const deletedCV = await CVModel.findByIdAndDelete(cv._id).lean();
    if (!deletedCV) throw new Error("Not Found. CV doesn't exist.");

    return deletedCV;
  }

  async ensureOwnership(userId: string, cvId: string) {
    validateObjectId(userId);
    validateObjectId(cvId);

    const [user, cv] = await Promise.all([
      User.findById(userId).lean(),
      CVModel.findById(cvId).lean(),
    ]);

    if (!user) throw new Error("User not found.");
    if (!cv) throw new Error("CV not found.");

    const isOwner = cv.userId.toString() === user._id.toString();
    if (!isOwner) throw new Error("Unauthorized. You do not own this CV.");

    return { user, cv };
  }
}

export default new CVService();
