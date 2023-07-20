import { Suspense } from "react"

import "./App.scss"
import "./utilities.scss"

import { Layout } from "./layout"
import ErrorBoundary from "./components/ErrorBoundary"
import { Loader } from "./components/Loader"
import { RoutesWithErrorBoundary } from "./routes"
import { ROUTES } from "./routes/routeList"

function App() {
  return (
      <ErrorBoundary>
        <Suspense fallback={<Loader type="fullPage" size={80} />}>
          <Layout>
            <RoutesWithErrorBoundary routes={ROUTES} />
          </Layout>
        </Suspense>
      </ErrorBoundary>
  )
}

export default App
