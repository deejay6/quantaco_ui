import { node } from "prop-types"
import React, { useMemo } from "react"
import { useSelector } from "react-redux"
import { Navigate, useLocation } from "react-router-dom"
import { PublicLayout } from "./Public"
import { PrivateLayout } from "./Private"
import { ROUTES } from "../routes/routeList"
import { PRIVATE_ROUTE, PUBLIC_DEFAULT_ROUTE, PUBLIC_ROUTE } from "../constants/common"
import { Error } from "../components/Error"

/**
 *
 * @description This is Layout component which checks for user and route type and returns public or private layout
 */
export const Layout = ({ children }) => {
  const { pathname } = useLocation()
  const { user } = useSelector((state) => state.user)

  const routeType = useMemo(() => ROUTES.find(({ name }) => pathname.indexOf(name) > -1)?.route, [pathname])

  if (pathname === "/") {
    if (user?.session_id) {
      return <PrivateLayout>{children}</PrivateLayout>
    }
    return <Navigate to={PUBLIC_DEFAULT_ROUTE} />
  }

  if (routeType === PUBLIC_ROUTE) {
    return <PublicLayout>{children}</PublicLayout>
  }
  if (!user?.session_id) {
    return <Navigate to={PUBLIC_DEFAULT_ROUTE} />
  }

  if (user.session_id && routeType === PRIVATE_ROUTE) {
    return <PrivateLayout>{children}</PrivateLayout>
  }

  return <Error errorStatus={404} />
}

Layout.propTypes = {
  children: node.isRequired,
}
