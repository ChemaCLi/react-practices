import * as uid from "uuid";
import { LocalPersistanceService } from "../local-persistance-service";

export const create = ({
  name,
  email
}) => {
  return LocalPersistanceService
    .saveData("users", { name, email, id: uid.v4() })
};

