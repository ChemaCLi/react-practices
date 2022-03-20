import { LocalPersistanceService } from "../local-persistance-service";

export const update = ({
  id,
  name,
  email
}) => {
  if (!id) throw new Error("id is required")

  return LocalPersistanceService.saveData("users", { name, email, id })
};

