import React, { useState } from "react"
import { Navigate, useLocation } from "react-router-dom"
import { node } from "prop-types"
import { LeftSquareFilled, RightSquareFilled } from "@ant-design/icons"
import { Layout } from "antd"
import { SideBar } from "../../components/SideBar"
import { MainHeader } from "../../components/MainHeader"
import "./styles.scss"

const { Sider, Header, Content } = Layout

/**
 *
 * @description This is Layout component for protected routes
 */
export const PrivateLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false)
  const { pathname } = useLocation()

  if (pathname === "/") {
    return <Navigate to={'customer/details'} />
  }

  /**
   * @description Function to get breadcrumb links, to add more links add breadcrumb item in BREADCRUMB_ITEM_MAPPING_WITH_PATH list in constants/common.js
   * @param {{string}} path string
   * @returns {HTMLElement} html element
   */

  return (
    <Layout className="private-layout-container">
      <Header className="header-container">
        <MainHeader />
      </Header>
      <Layout>
        <Sider
          width="273px"
          theme="light"
          trigger={null}
          collapsible
          collapsed={collapsed}
          collapsedWidth={collapsed ? "0px" : "273px"}
          className="sidebar-toggle-transition"
        >
          <SideBar  />
        </Sider>

        <div
          className="trigger sidebar-toggle-transition"
          onClick={() => setCollapsed(!collapsed)}
          role="button"
          tabIndex={0}
          onKeyDown={() => setCollapsed(!collapsed)}
          style={{ left: collapsed ? "0px" : "250px" }}
        >
          {collapsed ? (
            <RightSquareFilled style={{ color: "var(--black-liquorice-color)" }} />
          ) : (
            <LeftSquareFilled style={{ color: "var(--black-liquorice-color)" }} />
          )}
        </div>
        <Content className="main-container position-relative">
          {children}
        </Content>
      </Layout>
    </Layout>
  )
}

PrivateLayout.propTypes = {
  children: node.isRequired,
}
