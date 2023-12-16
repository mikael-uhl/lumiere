import { RefreshToken } from "../models/index.js";
import dayjs from "dayjs";

export async function generateRefreshToken(userId) {
  const expiresIn = dayjs().add(1, "month").unix();

  const generatedRefreshToken = await RefreshToken.create({
    user_id: userId,
    expires_in: expiresIn,
  });

  return generatedRefreshToken;
}
