import {React} from "react"
import { Row, Input, Form, Button} from "antd"
import {useSelector} from "react-redux"
import {Navigate, useNavigate} from "react-router-dom"
import "./styles.scss"
import {validationRules} from "../../constants/common";
import {useMutateData} from "../../utils/hooks";
import {signupURL} from "../../api/endpoints";

/**
 *
 * @description Login page component
 */
export const SingupPage = () => {
    const user = useSelector((state) => state.user.user)
    const [signupApi, {loading}] = useMutateData({showNotification: true})
    const navigate = useNavigate()
    const [form] = Form.useForm()

    if (user) {
        return <Navigate to={'../customer/details'}/>
    }
    const signup = async (values) => {
        try {
            await signupApi({
                url: signupURL(),
                payload: {
                    'first_name': values.firstName,
                    'last_name': values.lastName,
                    'phone_number': values.phone,
                    'email': values.email,
                    'password': values.password
                },
                method: 'POST'
            })
            navigate('/')
        } catch (error) {
        }
    }

    return (
        <>
            <Row className="signup-container">
                <img src="/img/quantaco.jpeg" alt="Quantaco Logo"/>
                <h1 className="white-text">Quantaco User Signup</h1>
                <Row span={12} sm={12} xs={24} className="signup-form-container">
                    <Form
                        name="singupForm"
                        labelCol={{span: 8}}
                        labelAlign={"right"}
                        // wrapperCol={{span: 40}}
                        style={{width: 350}}
                        initialValues={{remember: true}}
                        autoComplete="off"
                        onFinish={signup}
                        form={form}
                    >

                        <Form.Item
                            label="First Name"
                            name="firstName"
                            className="input-name"
                            rules={validationRules.name}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item
                            label="Last Name"
                            name="lastName"
                            className="input-name"
                            rules={validationRules.name}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item
                            label="Email"
                            name="email"
                            className="input-email"
                            rules={validationRules.email}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item
                            label="Phone"
                            name="phone"
                            className="input-phone"
                            rules={validationRules.phone}
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

                        <Form.Item wrapperCol={{offset: 12, span: 16}}>
                            <Button loading={loading} type="primary" htmlType="submit" className="button-color">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Row>
            </Row>
        </>
    )
}
