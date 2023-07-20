import { Button, Typography, Row, Col, Avatar } from "antd"
import { EditOutlined } from "@ant-design/icons"
import { Link } from "react-router-dom"
import "./style.scss"
import { string } from "prop-types"

const { Title, Text } = Typography
export const ProfileMainMenu = ({
  profileImage, email,
  name,
  setEditAvatarFlag,
}) => (
  <div className="d-flex flex-profile pt-1">
    {profileImage && (
      <Row justify="center">
        <Col className="profile-avatar">
          <Avatar size={74} shape="circle" src={profileImage} />
          <Avatar className="edit-profile-icon" size={25} shape="circle">
            <EditOutlined size={6} style={{ fontSize: "14px" }} onClick={() => setEditAvatarFlag(false)} />
          </Avatar>
        </Col>
      </Row>
    )}
    {name && (
      <Title className="m-0" level={4}>
        {name}
      </Title>

    )}
    {email && (
        <Text className="m-0" >
          {email}
        </Text>
    )}
    <div className="m-1 ">
      <Link to="/logout">
        <Button danger htmlType="button" className="fWeight-6">
          Sign out
        </Button>
      </Link>
    </div>
  </div>
)

ProfileMainMenu.defaultProps = {
  profileImage: undefined,
  name: undefined,
  email: undefined
}

ProfileMainMenu.propTypes = {
  profileImage: string,
  name: string,
  email: string
}
