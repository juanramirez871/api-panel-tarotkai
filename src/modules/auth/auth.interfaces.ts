import { User } from "src/database/models/user.model";

export interface RequestWithUser extends Request {
    user: User
  }