import { LocalPersistanceService } from "../local-persistance-service";

export const getById = async ({ id }) => {
  return await LocalPersistanceService.getFullItemById("users", id)
};
