import React, { useState, useEffect } from 'react'
import { Button, Table, Form, Select, Input } from 'antd'
import request from '@/utils/request'
import Charts from '@/components/Charts'

export default function CarModelGrossProfit(props) {
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
        {
            title: '标特集团林肯各公司车型单车毛利趋势图-航海家车型',
            children: [
                { title: '序号', dataIndex: 'RepairOrderCode', align: 'center' },
                { title: '店名', dataIndex: 'VehicleTag', align: 'center' },
                { title: '1月', dataIndex: 'CreateDate', align: 'center' },
                { title: '2月', dataIndex: 'Name', align: 'center' },

                { title: '3月', dataIndex: '1', align: 'center' },
                { title: '4月', dataIndex: '2', align: 'center' },
                { title: '5月', dataIndex: '3', align: 'center' },
                { title: '6月', dataIndex: '4', align: 'center' },

                { title: '7月', dataIndex: '5', align: 'center' },
                { title: '8月', dataIndex: '6', align: 'center' },
                { title: '9月', dataIndex: '7', align: 'center' },
            ],
        },
    ]

    const option = {
        xAxis: {
            type: 'category',
            data: ['福林公司', '标鸿公司', '标林公司', '标瑞公司', '龙华公司', '惠州林肯', '集团平均'],
        },
        yAxis: {
            type: 'value',
        },
        series: [
            {
                data: [120, 200, 150, 80, 70, 110, 130],
                type: 'bar',
                showBackground: true,
                backgroundStyle: {
                    color: 'rgba(180, 180, 180, 0.2)',
                },
            },
        ],
    }

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

            <Charts style={{ with: '100%', height: '400px' }} option={option} />
        </div>
    )
}
