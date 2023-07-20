import {Menu} from "antd"
import {useLocation, useNavigate} from "react-router-dom"
import "./styles.scss"
import {DashboardOutlined} from "@ant-design/icons";
import {useEffect, useState} from "react";

/**
 *
 * @description SideBar component render's sidebar navigation according to given menu option
 */
export const SideBar = ({data}) => {
    const location = useLocation()
    const navigate = useNavigate()

    const [current, setCurrent] = useState(
        location.pathname === "/" || location.pathname === ""
            ? "/customer/details"
            : location.pathname,
    );

    useEffect(() => {
        if (location) {
            if( current !== location.pathname ) {
                setCurrent(location.pathname);
            }
        }
    }, [location, current]);

    const handleClick = (e)=> {
        setCurrent(e.key);
        navigate('customer/'+ e.key)

    }
    const getSelectedKey = () => {
        let len = location.pathname.split("/").length
        return location.pathname.split("/")[len-1]
    }
    const getItem = (label, key, icon, children, type) => {
        return {
            key,
            icon,
            children,
            label,
            type,
        };
    }
    const items = [
        getItem('Customer Dashboard', 'dashboard', <DashboardOutlined/>, [
            getItem('Customer Details', 'details', null),
        ])]

    return (
        <div className="sidebar-container">
            <Menu
                onClick = {handleClick}
                theme="light"
                mode="inline"
                defaultOpenKeys={['dashboard']}
                defaultSelectedKeys={getSelectedKey}
                items={items}
            />
        </div>
    )
}
