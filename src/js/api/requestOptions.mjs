import { getAccessToken } from "./localStorage.mjs";
import { API_KEY } from "../constants.mjs";

/**
 * This module contains various configurations for API request options, including GET, POST, PUT, DELETE,
 * and specific options for user registration and login. It utilizes an access token for authorization
 * where necessary and includes headers for content type and API key.
 */

const accessToken = getAccessToken();

export const optionGet = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
};

export const optionGetProfile = (token) => ({
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    "X-Noroff-API-Key": API_KEY,
  },
});

export const optionPost = (postReq) => ({
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
    "X-Noroff-API-Key": API_KEY,
  },
  body: JSON.stringify(postReq),
});

export const optionPut = (putReq) => ({
  method: "PUT",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
    "X-Noroff-API-Key": API_KEY,
  },
  body: JSON.stringify(putReq),
});

export const optionDelete = {
  method: "DELETE",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
    "X-Noroff-API-Key": API_KEY,
  },
};

export const optionRegisterAndLogin = (data) => ({
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(data),
});
