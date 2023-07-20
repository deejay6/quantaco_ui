import React from "react"
import { Error } from "../Error"

/**
 * @description Error Boundary to handle application's run time errors
 */
class ErrorBoundary extends React.Component {
  constructor() {
    super()
    this.state = {
      hasError: false,
    }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    // eslint-disable-next-line no-console
    console.error({ error, errorInfo })
  }

  render() {
    const { hasError } = this.state
    // eslint-disable-next-line react/prop-types
    const { children } = this.props
    if (hasError) {
      return <Error errorStatus={500} />
    }
    return children
  }
}

export default ErrorBoundary
