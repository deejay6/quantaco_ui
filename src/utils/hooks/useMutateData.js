import { useCallback, useState } from "react"
import { FrownOutlined, SmileOutlined } from "@ant-design/icons"
import { notification } from "antd"
import { useNavigate } from "react-router-dom"
import { useAxios } from "./useAxios"
import { GENERIC_MESSAGE } from "../../constants/common"

const REQUEST_STATES = {
  unInitialized: "unInitialized",
  loading: "loading",
  complete: "complete",
  error: "error",
  skipped: "skipped",
}

// Workaround for now. Remove after API fix status code issue
const checkForValidUser = (errorResponse) =>
  errorResponse?.data?.error?.message === "Invalid User." ||
  errorResponse?.data?.error?.message === "Missing Authentication."

/**
 * @typedef {Object} MutateState
 * @property {boolean} loading - loading
 * @property {REQUEST_STATES} state - state
 */
/**
 * @description Custom hook to make post and put api call using axios
 * @param {{showNotification:boolean}} config
 * @returns {[mutate, mutateState:MutateState]} response
 */
export const useMutateData = ({ showNotification = true } = {}) => {
  const [loading, setLoading] = useState(false)
  const [state, setState] = useState(REQUEST_STATES.unInitialized)
  const { axios } = useAxios()
  const navigate = useNavigate()

  const handleErrors = useCallback(
    (err) => {
      if (err?.response?.status === 401) {
        notification.error({
          message: "Error",
          description: err?.response?.data?.message || GENERIC_MESSAGE["401_ERROR"],
          icon: <FrownOutlined />,
        })
        navigate({ pathname: "/logout" })
      } else if (err?.response?.status === 500 || err?.response?.status === 403) {
        navigate({ pathname: `/${err?.response?.status}` })
      }
    },
    [navigate]
  )

  const mutate = useCallback(
    async ({ url, payload, method, axiosConfig = {} }) => {
      try {
        setState(REQUEST_STATES.loading)
        setLoading(true)
        const response = await axios.request({ method, url, data: payload, ...axiosConfig })
        setState(REQUEST_STATES.complete)
        setLoading(false)
        if (showNotification) {
          notification.success({
            message: "Success",
            description: response.data?.message || GENERIC_MESSAGE.DEFAULT_SUCCESS,
            icon: <SmileOutlined />,
          })
        }
        return response
      } catch (err) {
        checkForValidUser(err.response) && navigate({ pathname: "/logout" })
        handleErrors(err)
        setLoading(false)
        setState(REQUEST_STATES.error)
        if (showNotification) {
          notification.error({
            message: "Error",
            description: err?.response?.data?.message || GENERIC_MESSAGE.DEFAULT_ERROR,
            icon: <FrownOutlined />,
          })
        }
        throw err
      }
    },
    [showNotification, axios, handleErrors, navigate]
  )

  return [mutate, { loading, state }]
}
