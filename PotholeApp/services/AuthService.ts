import axios from "axios";
import { API_BASE_URL } from "./Api";
import * as SecureStore from "expo-secure-store";

export const AuthService = {
  signup: async (data: { name: string; email: string; password: string }) => {
    const response = await axios.post(`${API_BASE_URL}/auth/signup`, data);
    return response;
  },
  login: async (data: { email: string; password: string }) => {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, data);
    if (response.status === 200) {
      await SecureStore.setItemAsync("token", response.data?.token);
    }
    return response;
  },
  getToken: async () => {
    return await SecureStore.getItemAsync("token");
  },
  clearToken: async () => {
    await SecureStore.deleteItemAsync("token");
  },
};
