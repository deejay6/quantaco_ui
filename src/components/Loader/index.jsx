import { LoadingOutlined } from "@ant-design/icons"
import { Spin } from "antd"
import { number, string, bool } from "prop-types"
import "./styles.scss"

/**
 *
 * @description Loader component to show loader of given size and type
 */
export const Loader = ({ size, type, masked = false }) => (
  <div className={`${type === "fullPage" ? "loader-full-page" : ""} ${masked ? "loader-masked" : ""}`}>
    <Spin
      indicator={
        <LoadingOutlined
          style={{
            fontSize: size,
          }}
          spin
        />
      }
    />
  </div>
)

Loader.defaultProps = {
  size: 24,
  type: "normal",
  masked: false,
}

Loader.propTypes = {
  size: number,
  type: string,
  masked: bool,
}
