import { optionRegisterAndLogin } from "../api/requestOptions.mjs";
import { API_AUTH_REGISTER } from "../constants.mjs";

export async function register(userData) {
  try {
    const options = optionRegisterAndLogin(userData);
    const response = await fetch(API_AUTH_REGISTER, options);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `${errorData.statusCode}: ${errorData.status}. ${errorData.errors[0].message}`
      );
    }
    return response.json();
  } catch (error) {
    console.error("Register error:", error);
    throw error;
  }
}
