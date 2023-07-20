import { useContext } from "react"
import { AxiosContext } from "../context/axios"

/**
 * @description Custom hook to get Axios Instance
 * @returns {import('axios').AxiosInstance} AxiosInstance
 */
export const useAxios = () => useContext(AxiosContext)
