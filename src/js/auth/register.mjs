import { optionRegisterAndLogin } from "../api/requestOptions.mjs";
import { API_AUTH_REGISTER } from "../constants.mjs";

/**
 * Registers a new user by sending a request to the authentication API.
 * - Sends user data to the registration endpoint and handles success or failure.
 *
 * @param {Object} userData - The user data to be registered.
 * @param {string} userData.name - The user's name.
 * @param {string} userData.email - The user's email.
 * @param {string} userData.password - The user's password.
 *
 * @returns {Promise<Object>} The API response data on successful registration.
 *
 * @throws {Error} If the registration fails, an error is thrown with details.
 */

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
