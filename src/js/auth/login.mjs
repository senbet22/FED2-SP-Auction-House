import { optionRegisterAndLogin } from "../api/requestOptions.mjs";
import { API_AUTH_LOGIN } from "../constants.mjs";

export async function login({ email, password }) {
  try {
    const options = optionRegisterAndLogin({ email, password });
    const response = await fetch(API_AUTH_LOGIN, options);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `${errorData.statusCode}: ${errorData.status}. ${errorData.errors[0].message}`
      );
    }

    return response.json();
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
}
