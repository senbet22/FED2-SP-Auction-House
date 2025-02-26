/**
 * This file imports the main stylesheet and initializes the routing system for the application.
 * It uses the `router` function to handle navigation based on the current page's URL (window.location.pathname).
 */

import "./css/style.css";

import router from "./js/router/index.mjs";
await router(window.location.pathname);
