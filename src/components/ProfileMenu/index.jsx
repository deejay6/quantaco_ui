import {Avatar, Modal} from "antd"
import {useState} from "react"
import {CaretDownFilled} from "@ant-design/icons"
import {useSelector} from "react-redux"
import "./style.scss"
import {PROFILE_IMAGES} from "../../constants/common"
import {ProfileMainMenu} from "./profileMainMenu"

/**
 * @description Profile component for header section
 */
export const ProfileMenu = () => {
    const [profile, setProfile] = useState(false)
    const [avatar, setAvatar] = useState(true)
    const user = useSelector((state) => state.user.user)
    const toggleProfile = () => {
        if (profile) {
            setAvatar(true)
        }
        setProfile(!profile)
    }


    const getProfileAvatarSection = () => (
        <Modal
            open={profile}
            footer={null}
            closable={false}
            mask={false}
            className="profile-modal"
            width={avatar ? "16%" : "24%"}
            onCancel={toggleProfile}
            onOk={toggleProfile}
            maskClosable
            destroyOnClose
            bodyStyle={
                {
                    height: "13%",
                    boxShadow: "0px 0px 16px rgb(0 0 0 / 8%), 0px 16px 16px rgb(0 0 0 / 8%)",
                    borderRadius: "7.27434px",
                }
            }
        >
            <ProfileMainMenu
                name={user['name']}
                email={user["email"]}
            />
        </Modal>
    )

    return (
        <>
            <div
                className="pointer text-right d-flex justify-content-center float-right  align-items-center"
                role="button"
                tabIndex={0}
                onClick={toggleProfile}
                onKeyDown={toggleProfile}
            >
                <Avatar src={PROFILE_IMAGES.PROFILE_ICON}/>
                <CaretDownFilled className="text-lg" style={{color: "#fff"}}/>
            </div>
            {getProfileAvatarSection()}
        </>
    )
}
