import { Route, Routes } from "react-router-dom"
import { arrayOf, elementType, shape, string } from "prop-types"
import { Error } from "../components/Error"
import ErrorBoundary from "../components/ErrorBoundary"

/**
 *
 * @description RoutesWithErrorBoundary returns routes with component wrapped in error boundary
 */
export const RoutesWithErrorBoundary = ({ routes }) => (
  <Routes>
    {routes.map(({ path, component: Component, ...rest }) => (
      <Route
        key={rest.name}
        path={path}
        element={
          <ErrorBoundary>
            <Component {...rest} />
          </ErrorBoundary>
        }
      />
    ))}
    <Route path="*" element={<Error errorStatus={404} />} />
  </Routes>
)

RoutesWithErrorBoundary.propTypes = {
  routes: arrayOf(
    shape({
      name: string.isRequired,
      path: string.isRequired,
      component: elementType.isRequired,
      route: string,
    })
  ).isRequired,
}
