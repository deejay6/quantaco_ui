import { Result } from "antd"
import { number } from "prop-types"
import { ERROR_MESSAGES } from "../../constants/common"

/**
 * @description Error Component to show error page according to status codes
 */
export const Error = ({ errorStatus }) => {
    const error = ERROR_MESSAGES[`ERROR_${errorStatus}`]
  return (
    <div className="place-center text-center h-100 ">
      <Result
        title={errorStatus}
        subTitle={error.message}
        extra={
          <a className="ant-btn ant-btn-primary" href="/login">
            Home Page
          </a>
        }
      />
    </div>
  )
}

Error.defaultProps = {
  errorStatus: 500,
}

Error.propTypes = {
  errorStatus: number,
}
