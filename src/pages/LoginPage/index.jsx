import {Row, Input, Form, Checkbox, Button} from "antd"
import {useDispatch, useSelector} from "react-redux"
import {Navigate, useNavigate} from "react-router-dom"
import "./styles.scss"
import {login} from "../../redux/slices"
import {SIGNUP_ROUTE, validationRules} from "../../constants/common";
import {useMutateData} from "../../utils/hooks";
import {verifyLoginUrl} from "../../api/endpoints";

/**
 *
 * @description Login page component
 */
const LoginPage = () => {
    const user = useSelector((state) => state.user.user)
    const [loginApi, {loading}] = useMutateData({showNotification: true})
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [form] = Form.useForm()

    const loginForm = () => {
        return (
            <Form
                name="basic"
                labelCol={{span: 8}}
                wrapperCol={{span: 16}}
                style={{maxWidth: 600}}
                initialValues={{remember: true}}
                autoComplete="off"
                onFinish={verifyLogin}
                form={form}
            >
                <Form.Item
                    label="Email"
                    name="email"
                    rules={validationRules.email}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{required: true, message: 'Please input your password!'}]}
                >
                    <Input.Password/>
                </Form.Item>

                <Form.Item name="remember" valuePropName="checked" wrapperCol={{offset: 8, span: 16}}>
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>
                <Form.Item wrapperCol={{offset: 9, span: 16}}>
                    <Button loading={loading} htmlType="submit" className="button-color">
                        Sign In
                    </Button>
                </Form.Item>
            </Form>
        )
    }

    if (user?.session_id) {
        return <Navigate to={'../customer/details'}/>
    }
    const signInCallback = (signedInUser) => {
        dispatch(login(signedInUser))
    }

    const verifyLogin = async (values) => {
        try{
            const response = await loginApi({
                url: verifyLoginUrl(),
                payload: {'email': values.email, 'password': values.password},
                method: 'POST'
            })
                if (response.data?.data){
                    let user = response.data.data
                    signInCallback(user)
                    navigate('../customer/details')
                }

        } catch (error) {
        }
    }


    return (
        <>
            <Row className="login-container">
                <img src="/img/quantaco.jpeg" alt="Quantaco Logo"/>
                <h1 className="white-text">Quantaco Customer Management Login</h1>
                <Row span={12} sm={12} xs={24} className="login-form-container">
                    {loginForm()}
                </Row>
                <Row className={"signup-row"}>
                     <Button onClick={() => navigate(SIGNUP_ROUTE)} className="button-color">
                        Sign Up
                    </Button>
                </Row>

            </Row>
        </>
    )
}

export default LoginPage
