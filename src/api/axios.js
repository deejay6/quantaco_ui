import axios from "axios"
import { BASE_API_URL } from "./endpoints"

/**
 * @description Client Side axios Instance
 * @returns {import("axios").AxiosInstance}
 */
export const getAxiosInstance = () => {
  const axiosInstance = axios.create({
    baseURL: BASE_API_URL,
  })

  return axiosInstance
}
