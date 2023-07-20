export const PUBLIC_ROUTE = "public"
export const PRIVATE_ROUTE = "private"
export const PUBLIC_DEFAULT_ROUTE = "/login"
export const PRIVATE_DEFAULT_ROUTE = "/customer/details"
export const SIGNUP_ROUTE = "/signup"

export const ERROR_MESSAGES = {
    ERROR_404: {message: "The requested page does not exist."},
    ERROR_500: {message: "Something went wrong"},
    ERROR_403: {message: "You are not authorized to access this page"},
}

export const ABORT_REQUEST_ERROR_CODE = "ERR_CANCELED"
export const ABORT_REQUEST_ERROR_RESPONSE = {response: {message: "Request Canceled"}}

export const GENERIC_MESSAGE = {
    DEFAULT_ERROR: "Something went wrong",
    DEFAULT_SUCCESS: "Saved Successfully",
    "401_ERROR": "Access Denied",
}

export const PROFILE_IMAGES = {
    PROFILE_ICON: "/img/profile_Icon.svg",
    YOUNG_MALE: "/img/youngMale.svg",
}

export const validationRules = {
    email: [
        {
            required: true,
            message: "Please enter Email to continue",
        },
        {
            type: 'email',
            message: "Please enter a valid email"
        }
    ],
    name: [
        {
            required: true,
            message: "Please enter Name to continue",
        }
    ],
    phone: [
        {
            required: true,
            message: "Please enter Phone to continue",
        }
    ]
}

