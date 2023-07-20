import { createContext } from "react"
import { getAxiosInstance } from "../../api/axios"

export const AxiosContext = createContext({
  axios: getAxiosInstance(),
})

export const AxiosContextProvider = AxiosContext.Provider
