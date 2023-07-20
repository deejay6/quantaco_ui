import {Row, Col, Image} from "antd"
import { ProfileMenu } from "../ProfileMenu"

/**
 * @description Main header component
 */
export const MainHeader = () => (
  <Row align="middle" className="main-header">
    <Col flex={20}>
        <Image height="60px" width="100px" src="/img/quantaco.jpeg" preview={false} />
    </Col>
    <Col flex={3}>
      <Row align="right" className="main-profile">
        <Col span={12} offset={16}>
          <ProfileMenu />
        </Col>
      </Row>
    </Col>
  </Row>
)
