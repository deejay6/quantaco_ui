import {Button, Form, Input, Table} from 'antd';
import {useSelector} from "react-redux";
import {React, useEffect, useState} from "react";
import {customerUrl} from "../../../api/endpoints";
import {useMutateData} from "../../../utils/hooks";
import {Loader} from "../../../components/Loader";

export const CustomerDetails = () => {
    const user = useSelector((state) => state.user.user)
    const [form] = Form.useForm()
    const headers = {"X-SESSION-ID": user.session_id}
    const [addCustomerApi, {loading}] = useMutateData({showNotification: true})
    const [getCustomerApi, {customerLoading}] = useMutateData({showNotification: false})
    const [customerList, setCustomerList] = useState(null)
    const columns = [
        {
            title: 'Customer Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Customer ID',
            dataIndex: 'customer_id',
            key: 'customer_id',
        },
        {
            title: 'Customer Location',
            dataIndex: 'location',
            key: 'location',
        },
    ];
    const addCustomer = async (values) => {
        try {
            let response = await addCustomerApi({
                url: customerUrl(),
                payload: {"customer_name": values.customerName,
                    "customer_id": values.customerID,
                    "customer_location": values.customerLocation},
                method: "POST",
                axiosConfig: {headers: headers},
            })
            if (response.status === 200){
                let response = await getCustomerApi({
                    url: customerUrl(),
                    method: "GET",
                    axiosConfig: {headers: headers},
                })
                if (response.data?.data?.customers){
                     setCustomerList(response.data.data.customers)
                }
            }
        } catch (err) {
        }
    }


    useEffect(()=> {
        const getCustomers = async () => {
            try {
                let response = await getCustomerApi({
                    url: customerUrl(),
                    method: "GET",
                    axiosConfig: {headers: headers},
                })
                if (response.data?.data?.customers){
                     setCustomerList(response.data.data.customers)
                }
            } catch (err) {
            }
        }
        if (!customerList){
            getCustomers()
        }
    })

    return (
        <>
        <div className="display-center">
            <div className="customer-form">
            <Form layout={"inline"}
                  onFinish={addCustomer}
                  form={form}
            >
                <Form.Item
                    label="Customer Name"
                    name="customerName"
                    required={true}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label="Customer ID"
                    name="customerID"
                    required={true}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label="Customer Location"
                    name="customerLocation"
                    required={true}
                >
                    <Input/>
                </Form.Item>
                <Form.Item >
                    <Button loading={loading} htmlType="submit" className="button-color">
                        Add Customer
                    </Button>
                </Form.Item>
            </Form>
            </div>
            <br></br><br></br>
            {customerList ? (
                customerLoading ? <Loader masked={true}></Loader> :
                <Table dataSource={customerList} columns={columns} bordered={true} ></Table>
            ) : (<h1> No Customer Present</h1>)}
        </div>
        </>
    )
}