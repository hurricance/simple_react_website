import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { Card, Breadcrumb, Form, Button, Radio, DatePicker, Select } from 'antd'
import { Table, Tag, Space, Tooltip, Popconfirm } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'

import locale from 'antd/es/date-picker/locale/zh_CN';
import 'dayjs/locale/zh-cn';

import { observer } from 'mobx-react-lite'

import useStore from '/src/store'

import './index.scss'

const { Option } = Select
const { RangePicker } = DatePicker

const Article = observer(() => {

  const { channelStore } = useStore()

  const selectStatus = (value) => {
    switch (value) {
      case 1:
        return '草稿'
      case 2:
        return '待审核'
      case 3:
        return '审核通过'
      case 4:
        return '审核失败'
    }
  }

  const deleteArticle = async (id) => {
    
    await fetch(`http://localhost:3000/data/${id}`, {
      method: 'DELETE'
    })

    setParams({
      ...params,
    })

  }

  const [dataList, setDataList] = useState([])
  const [params, setParams] = useState({})

  const nav = useNavigate()

  const goPublish = (id) => {
    nav(`/publish?id=${id}`)
  }

  useEffect(() => {

    const getDataList = async () => {

      const url = new URL('http://localhost:3000/data')
      url.search = new URLSearchParams(params).toString()
      
      const res = await fetch(url)
      const data = await res.json()
      setDataList(data)
    }

    getDataList()

  }, [params])

  const onFinish = (values) => {
    console.log(values)
    console.log(values.date[0].format('YYYY-MM-DD'))

    let newParams = {}

    if (values.status !== 0) {
      newParams.status = values.status
    }

    setParams({
      ...newParams,
    })
  }

  const rangeConfig = {
    rules: [
      {
        type: 'array',
        required: true,
        message: '请选择日期范围',
      },
    ],
  }

  const columns = [
    {
      title: "封面",
      dataIndex: 'cover',
      width:150,
      align: 'center',
      render: cover => {
        return <img src={cover} width={130} height="100%" alt="" />
      }
    },
    {
      title: '标题',
      dataIndex: 'title',
      align: 'center',
      width: 280
    },
    {
      title: '状态',
      dataIndex: 'status',
      align: 'center',
      width: 180,
      render: data => <Tag color="green">{selectStatus(data)}</Tag>
    },
    {
      title: '发布时间',
      align: 'center',
      dataIndex: 'pubdate',
      width: 280,
    },
    {
      title: '阅读数',
      align: 'center',
      dataIndex: 'read_count'
    },
    {
      title: '评论数',
      align: 'center',
      dataIndex: 'comment_count'
    },
    {
      title: '点赞数',
      align: 'center',
      dataIndex: 'like_count'
    },
    {
      title: '操作',
      align: 'center',
      width: 150,
      render: data => {
        return (
          <Space size="large">
            <Tooltip title='编辑'>
              <Button type="primary" shape="circle" icon={<EditOutlined />} onClick={() => goPublish(data.id)}/>
            </Tooltip>
            <Tooltip title='删除'>
              <Popconfirm title="是否确认删除？" okText="删除" cancelText="取消" onConfirm={() => deleteArticle(data.id)}>
                <Button
                  type="primary"
                  danger
                  shape="circle"
                  icon={<DeleteOutlined />}
                />
              </Popconfirm>
            </Tooltip>
          </Space>
        )
      }
    }
  ]

  return (
    <div>
      <Card className="select"
        title={
          <Breadcrumb
            separator=">"
            items={[
              {
                title: '首页',
                href: '/',
              },
              {
                title: '内容管理',
              },
            ]}
          />
        }
        style={{ marginBottom: 20 }}
      >
        <Form initialValues={{ status: 0, channel_id: 0 }} onFinish={onFinish}>
          <Form.Item label="状态" name="status">
            <Radio.Group>
              <Radio value={0}>全部</Radio>
              <Radio value={1}>草稿</Radio>
              <Radio value={2}>待审核</Radio>
              <Radio value={3}>审核通过</Radio>
              <Radio value={4}>审核失败</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="频道" name="channel_id" rules={[{ required: true, message: '请选择文章频道' }]}>
            <Select
              placeholder="请选择文章频道"
              style={{ width: 120 }}
              allowClear
            >
              {channelStore.channels.map(channel => (
                <Option key={channel.id} value={channel.id}>{channel.name}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="日期" name="date" {...rangeConfig}>
            <RangePicker locale={locale} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginLeft: 80 }}>
              筛选
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Card title={`根据筛选条件共查询到 ${ dataList.length } 条结果：`}>
        <Table rowKey="id" columns={columns} dataSource={dataList} pagination={{ pageSize: 10, total: dataList.length, defaultCurrent: 1 }} bordered />
      </Card>
    </div>
  )
})

export default Article
