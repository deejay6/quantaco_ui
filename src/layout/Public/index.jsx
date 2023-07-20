import { Layout } from "antd"
import { node } from "prop-types"

/**
 *
 * @description This is Layout component for public routes
 */
export const PublicLayout = ({ children }) => <Layout className="public-layout-container">{children}</Layout>

PublicLayout.propTypes = {
  children: node.isRequired,
}
