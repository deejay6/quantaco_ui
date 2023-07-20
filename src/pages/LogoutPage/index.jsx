import { useEffect } from "react"
import {useDispatch, useSelector} from "react-redux"
import { useNavigate } from "react-router-dom"
import { useMutateData } from "../../utils/hooks"
import { Loader } from "../../components/Loader"
import { logoutUrl } from "../../api/endpoints"
import { logout } from "../../redux/slices"
import { PUBLIC_DEFAULT_ROUTE } from "../../constants/common"

/**
 *
 * @description Logout page to clear user session and route back to login page.
 */
export const LogoutPage = () => {
    const user = useSelector((state) => state.user.user)
    const dispatch = useDispatch()
    const [logoutApi] = useMutateData({ showNotification: true })
    const navigate = useNavigate()

    useEffect(() => {
        const logoutUser = async () => {
            try {
                await logoutApi({
                    url: logoutUrl(),
                    payload: {},
                    method: "POST",
                    axiosConfig: {headers: {'X-SESSION-ID': user.session_id}}
                })
            } catch (error) {
                console.log(error)
            }
            dispatch(logout())
            navigate({ pathname: PUBLIC_DEFAULT_ROUTE })
        }
        logoutUser()
    }, [user, dispatch, logoutApi, navigate])

    return <Loader size={56} type="fullPage" />
}
