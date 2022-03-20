import { LocalPersistanceService } from "../local-persistance-service";

export const deleteById = async ({ id }) => {
  return await LocalPersistanceService.removeItemById("users", id)
};
