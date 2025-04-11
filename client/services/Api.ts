import Constants from "expo-constants";

export const API_BASE_URL =
  Constants.expoConfig?.extra?.apiUrl || "http://localhost:3000/api";
export const STATIC_FILES_URL =
  Constants.expoConfig?.extra?.staticFilesUrl || "http://localhost:3000";
export const GOOGLE_MAPS_API_KEY =
  Constants.expoConfig?.extra?.googleMapsApiKey || "";
