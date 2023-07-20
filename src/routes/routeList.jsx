import { lazy } from "react"
import { Error } from "../components/Error"
import { LogoutPage } from "../pages/LogoutPage"
import { SingupPage } from "../pages/SingupPage";

// Lazy loading pages
const LoginPage = lazy(() => import("../pages/LoginPage"))
const Customer = lazy(() => import ("../pages/Customer"))
const { PUBLIC_ROUTE, PRIVATE_ROUTE } = require("../constants/common")

// Array of top level routes to lazy load components
export const ROUTES = [
  {
    name: "login",
    path: "/login",
    component: LoginPage,
    route: PUBLIC_ROUTE,
  },
  {
    name: "logout",
    path: "/logout",
    component: LogoutPage,
    route: PUBLIC_ROUTE,
  },
  {
    name: "signup",
    path: "/signup",
    component: SingupPage,
    route: PUBLIC_ROUTE,
  },
  {
    name: "customer",
    path: "/customer/*",
    route: PRIVATE_ROUTE,
    component: Customer,
  },
  {
    name: "500",
    path: "/500",
    route: PUBLIC_ROUTE,
    component: Error,
    errorStatus: 500,
  },
  {
    name: "403",
    path: "/403",
    route: PRIVATE_ROUTE,
    component: Error,
    errorStatus: 403,
  },
]
