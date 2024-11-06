// src/services/userService.ts
import { userApi } from "@/redux/features/users/userApi";

export async function verifyUserById(userId: string, updatedData: any) {
  return await userApi.endpoints.verifyAUser.initiate({ userId, updatedData });
}
