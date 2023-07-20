import {RoutesWithErrorBoundary} from "../../routes";
import {CustomerDetails} from "./CustomerDetails";

const routes = [
    {
        path: "/details",
        component: CustomerDetails,
        name: "customer details"
    },

]

const Customer = () => <RoutesWithErrorBoundary routes={routes} />

export default Customer