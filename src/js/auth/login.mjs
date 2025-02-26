import { optionRegisterAndLogin } from "../api/requestOptions.mjs";
import { API_AUTH_LOGIN } from "../constants.mjs";

/**
 * Logs in a user by sending a request to the authentication API.
 * - Sends email and password to the login endpoint and handles success or failure.
 *
 * @param {Object} credentials - The user's login credentials.
 * @param {string} credentials.email - The user's email.
 * @param {string} credentials.password - The user's password.
 *
 * @returns {Promise<Object>} The API response data on successful login.
 *
 * @throws {Error} If the login fails, an error is thrown with details.
 */

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
