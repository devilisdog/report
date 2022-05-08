import React, { useState, useEffect } from 'react'
import { Button, Table, Form, Select, Input } from 'antd'
import request from '@/utils/request'

export default function SalesDaily(props) {
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
            title: '福特品牌销售日报表',
            children: [
                {
                    title: '深圳标特',
                    dataIndex: 'RepairOrderCode',
                    align: 'center',
                    onCell: (record, index) => {
                        if (index == 0) {
                            return { rowSpan: 2 }
                        }
                        if (index == 1) {
                            return { rowSpan: 0 }
                        }
                    },
                },
                { title: '2021/12/1', dataIndex: 'VehicleTag', align: 'center' },
                { title: '合计', dataIndex: 'CreateDate', align: 'center' },
                { title: '福睿斯', dataIndex: 'Name', align: 'center' },

                { title: '福克斯', dataIndex: '1', align: 'center' },
                { title: '全新蒙', dataIndex: '2', align: 'center' },
                { title: '锐界', dataIndex: '3', align: 'center' },
                { title: '锐际', dataIndex: '4', align: 'center' },

                { title: '翼虎', dataIndex: '5', align: 'center' },
                { title: '金牛座', dataIndex: '6', align: 'center' },
                { title: '探险者', dataIndex: '7', align: 'center' },

                { title: '锐际PHEV', dataIndex: '8', align: 'center' },
                { title: 'EVOS', dataIndex: '9', align: 'center' },
                { title: '合计进口福特', dataIndex: '10', align: 'center' },
                { title: '野马', dataIndex: '11', align: 'center' },
                { title: '猛禽', dataIndex: 'aaaa', align: 'center' },
            ],
        },
    ]

    return (
        <div>
            <Table
                columns={columns}
                dataSource={[
                    { id: '1', RepairOrderCode: '首客', VehicleTag: '新增', 2: '2', 3: '2', aaaa: '2' },
                    { id: '2', RepairOrderCode: '首客', VehicleTag: '累计', 2: '2', 3: '2', aaaa: '2' },
                    { id: '3', RepairOrderCode: '来电', VehicleTag: '新增', 2: '2', 3: '2', aaaa: '2' },
                    { id: '14', RepairOrderCode: '来电', VehicleTag: '累计', 2: '2', 3: '2', aaaa: '2' },
                    { id: '15', RepairOrderCode: '邀约', VehicleTag: '新增', 2: '2', 3: '2', aaaa: '2' },
                    { id: '16', RepairOrderCode: '邀约', VehicleTag: '累计', 2: '2', 3: '2', aaaa: '2' },
                    { id: '17', RepairOrderCode: '二次到店', VehicleTag: '新增', 2: '2', 3: '2', aaaa: '2' },
                    { id: '18', RepairOrderCode: '二次到店', VehicleTag: '累计', 2: '2', 3: '2', aaaa: '2' },
                    { id: '19', RepairOrderCode: '订单', VehicleTag: '新增', 2: '2', 3: '2', aaaa: '2' },
                    { id: '19999', RepairOrderCode: '订单', VehicleTag: '累计', 2: '2', 3: '2', aaaa: '2' },
                    { id: '188', RepairOrderCode: '开票', VehicleTag: '新增', 2: '2', 3: '2', aaaa: '2' },
                    { id: '144', RepairOrderCode: '开票', VehicleTag: '累计', 2: '2', 3: '2', aaaa: '2' },
                ]}
                rowKey={(record) => record.id}
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
