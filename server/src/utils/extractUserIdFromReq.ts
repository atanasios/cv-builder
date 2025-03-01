import { AuthRequest } from "../types/AuthRequest";
import { validateObjectId } from "../validations/validateObjectId";
import { UnauthorizedError } from "./errors";

export const extractUserIdFromReq = (req: AuthRequest) => {
  const userId = req.userId;
  if (!userId) throw new UnauthorizedError();

  validateObjectId(userId);
  return userId;
};
