import "dotenv/config";

export const API_BASE_URL =
  process.env.API_BASE_URL || "http://localhost:3000/api";
export const STATIC_FILES_URL =
  process.env.STATIC_FILES_URL || "http://localhost:3000";
export const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY || "";
