import { create } from "zustand";
import axios from "axios";

const baseApi = "https://reqres.in/api/";

interface loginData {
  email: string;
  password: string;
}

export const userStore = create((set) => ({
  token: localStorage.getItem("token") || "",
  login: async (data: loginData) => {
    try {
      const res = await axios.post(baseApi + "login", {
        email: data.email,
        password: data.password,
      });
      set({ token: res.data.token });
      localStorage.setItem("token", res.data.token);
      return res;
    } catch (err) {
      return err;
    }
  },
  register: async (data: loginData) => {
    try {
      const res = await axios.post(baseApi + "register", {
        email: data.email,
        password: data.password,
      });
      set({ token: res.data.token });
      localStorage.setItem("token", res.data.token);
      return res;
    } catch (err) {
      return err;
    }
  },
  getUsers: async (page: number) => {
    try {
      const res = await axios.get(baseApi + "users", { params: { page } });
      return res;
    } catch (err) {
      return err;
    }
  },
  getUserDescription: async (id: string) => {
    try {
      const res = await axios.get(baseApi + `unknown/${id}`);
      return res;
    } catch (err) {
      return err;
    }
  },
  deleteUserFromId: async (id: string) => {
    try {
      const res = await axios.delete(baseApi + `user/${id}`);
      return res;
    } catch (err) {
      return err;
    }
  },
}));
