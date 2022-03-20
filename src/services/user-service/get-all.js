import { LocalPersistanceService } from "../local-persistance-service";

export const getAll = () => {
  return LocalPersistanceService.getData("users")
};
