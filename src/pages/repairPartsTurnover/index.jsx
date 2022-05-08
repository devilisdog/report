import React, { useState, useEffect } from 'react'
import { Button, Table, Form, Select, Input } from 'antd'
import request from '@/utils/request'

export default function RepairPartsTurnover(props) {
    const [form] = Form.useForm()
    const [dataSource, setDataSource] = useState([])
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(0)

    const search = (page = 1, pageSize = 10, formdata = {}) => {
        const params = {
            page,
            pageSize,
            ...formdata,
        }
        request.get('/v1/order/list', { params }).then((res) => {
            setDataSource(res?.data)
            setTotal(res?.attributes?.count)
        })
    }

    useEffect(() => {
        // search(1, 10)
    }, [])

    const onChangePage = (page) => {
        setPage(page, 10)

        form.validateFields().then((values) => {
            search(page, 10, values)
        })
    }

    const columns = [
        { title: '交强险', dataIndex: 'RepairOrderCode', align: 'center' },
        { title: '车船税', dataIndex: 'VehicleTag', align: 'center' },
        { title: '保险合计', dataIndex: 'CreateDate', align: 'center' },
        { title: '保险手续费', dataIndex: 'Name', align: 'center' },

        { title: '付款方式', dataIndex: '1', align: 'center' },
        { title: '贷款金额', dataIndex: '2', align: 'center' },
        { title: '赠送精品明细', dataIndex: '3', align: 'center' },
        { title: '车辆销售合同号', dataIndex: '4', align: 'center' },

        { title: '代办合同号', dataIndex: '5', align: 'center' },
        { title: '车辆厂家指导价', dataIndex: '6', align: 'center' },
        { title: '公司网点', dataIndex: '7', align: 'center' },
    ]

    return (
        <div>
            <Table
                columns={columns}
                dataSource={dataSource}
                rowKey={(record) => record.temprownumber}
                pagination={{
                    showSizeChanger: false,
                    onChange: onChangePage,
                    pageSize: 10,
                    current: page,
                    total: total,
                }}
            />
        </div>
    )
}
