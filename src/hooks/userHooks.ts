import axios from "axios";
import { useMutation } from "@tanstack/react-query";

const apiClient = axios.create({
  baseURL: "https://reqres.in/api/",
});

const getUsers = async (page: string) => {
  const response = await apiClient.get("users", {
    params: { page },
  });
  return response.data;
};

const getUsersDescription = async (id: string) => {
  const response = apiClient.get(`unknown/${id}`);
  return response;
};

const postLogin = async (data: object) => {
  const response = apiClient.post("login", data);
  return response;
};

const postRegist = async (data: object) => {
  const response = apiClient.post("regist", data);
  return response;
};

export const useGetUsersMutation = (SuccessFunc: Function) => {
  return useMutation({
    mutationFn: (page) => getUsers(page),
    onSuccess: (data) => {
      SuccessFunc(data);
    },
  });
};

export const useGetUserDescriptionMutation = (SuccessFunc: Function) => {
  return useMutation({
    mutationFn: (page) => getUsersDescription(page),
    onSuccess: (data) => {
      SuccessFunc(data.data.data);
    },
  });
};

export const usePostLoginMutation = (
  SuccessFunc: Function,
  ErrorFunc: Function
) => {
  return useMutation({
    mutationFn: (data) => postLogin(data),
    onSuccess: (data) => {
      SuccessFunc(data);
    },
    onError: (data) => {
      ErrorFunc(data.response);
    },
  });
};

export const usePostRegistMutation = (
  SuccessFunc: Function,
  ErrorFunc: Function
) => {
  return useMutation({
    mutationFn: (data) => postRegist(data),
    onSuccess: (data) => {
      SuccessFunc(data);
    },
    onError: (data) => {
      ErrorFunc(data.response);
    },
  });
};
