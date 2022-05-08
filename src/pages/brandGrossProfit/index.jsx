import React, { useState, useEffect } from 'react'
import { Button, Table, Form, Select, Input } from 'antd'
import request from '@/utils/request'

export default function BrandGrossProfit(props) {
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
        { title: '序号', dataIndex: 'RepairOrderCode', align: 'center' },
        { title: '车型', dataIndex: 'VehicleTag', align: 'center' },
        {
            title: '2021年12月1日-19日销售台次',
            children: [
                { title: '销售台次合计', dataIndex: 'CreateDate', align: 'center' },
                { title: '标特', dataIndex: 'Name', align: 'center' },

                { title: '标华', dataIndex: 'a', align: 'center' },
                { title: '标恒', dataIndex: 'b', align: 'center' },
                { title: '标新', dataIndex: 'c', align: 'center' },
                { title: '标福', dataIndex: 'd', align: 'center' },

                { title: '福嘉', dataIndex: 'e', align: 'center' },
                { title: '深圳共成', dataIndex: 'f', align: 'center' },
            ],
        },
        {
            title: '2021年12月1日-19日单车毛利',
            children: [
                { title: '限价毛利', dataIndex: 'g', align: 'center' },
                { title: '深圳区域平均毛利', dataIndex: 'h', align: 'center' },

                { title: '标华', dataIndex: 'i', align: 'center' },
                { title: '标恒', dataIndex: 'j', align: 'center' },
                { title: '标新', dataIndex: 'k', align: 'center' },
                { title: '标福', dataIndex: 'l', align: 'center' },

                { title: '福嘉', dataIndex: 'm', align: 'center' },
                { title: '深圳共成', dataIndex: 'n', align: 'center' },
            ],
        },
    ]

    return (
        <div>
            <Table
                bordered
                columns={columns}
                dataSource={[
                    { RepairOrderCode: '1', VehicleTag: '锐际2.0', a: '111', b: '222', c: '3333', d: '444', e: '555', f: '666' },
                    { RepairOrderCode: '2', VehicleTag: '探险者2.3.0', a: '111', b: '222', c: '3333', d: '444', e: '555', f: '666' },
                    { RepairOrderCode: '3', VehicleTag: '2021款锐界2.0.0', a: '111', b: '222', c: '3333', d: '444', e: '555', f: '666' },
                    { RepairOrderCode: '4', VehicleTag: '锐际2.0混动.0', a: '111', b: '222', c: '3333', d: '444', e: '555', f: '666' },
                    { RepairOrderCode: '5', VehicleTag: '新蒙迪欧2.0', a: '111', b: '222', c: '3333', d: '444', e: '555', f: '666' },
                ]}
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
