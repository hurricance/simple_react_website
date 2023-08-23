import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  Input,
  Upload,
  Space,
  Select,
  Modal
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'

import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

import { useState, useEffect } from 'react'

import { observer } from 'mobx-react-lite'

import useStore from '/src/store'

import './index.scss'
import { useSearchParams } from 'react-router-dom'

import dayjs from 'dayjs';
import { useRef } from 'react'

const { Option } = Select

const Publish = observer(() => {

  const [content, setContent] = useState('');

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const handleCancel = () => setPreviewOpen(false);

  const { channelStore } = useStore()

  const [fileList, setFileList] = useState([
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-2',
      name: 'image.png',
      status: 'done',
      url: 'https://w.wallhaven.cc/full/we/wallhaven-we628p.jpg',
    }
  ]);

  const onFinish = async (values) => {
    const currentDateTime = dayjs().format('YYYY-MM-DD HH:mm:ss');
    const data = {
      channel_id: values.channel_id,
      title: values.title,
      pubdate: currentDateTime,
      cover: "/src/assets/wallhaven-vqdmxm.png",
      status: 2,
      read_count: 2,
      comment_count: 0,
      like_count: 0,
      content: content
    }
    if (!id) {
      await fetch("http://localhost:3000/data", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
    }
  }

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  const [params] = useSearchParams()
  const id = params.get('id')
  const form = useRef()

  useEffect(() => {
    const getArticle = async () => {
      const res = await fetch (`http://localhost:3000/data/${id}`)
      const data = await res.json()
      if (id) {
        form.current.setFieldsValue({
          title: data.title,
          channel_id: data.channel_id,
          content: data.content
        })
      }
      setContent(data.content)
    }
    getArticle()
  }, [id]);

  const preview = (file) => {

    let blob, url

    if (file.originFileObj) {
      blob = file.originFileObj
      url = URL.createObjectURL(blob);
    }
    setPreviewImage(file.url ?? url);
    setPreviewOpen(true);
    setPreviewTitle(file.url ?? blob.name);
  }

  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb
            separator=">"
            items={[
              {
                title: '首页',
                href: '/home',
              },
              {
                title: id ? "编辑文章" : "发布文章",
              },
            ]}
          />
        }
      >
        <Form
          labelCol={{ span: 3 }}
          wrapperCol={{ span: 10 }}
          onFinish={onFinish}
          ref={form}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: '请输入文章标题' }]}
          >
            <Input placeholder="请输入文章标题" style={{ width: 400 }} />
          </Form.Item>
          <Form.Item
            label="频道"
            name="channel_id"
            rules={[{ required: true, message: '请选择文章频道' }]}
          >
            <Select placeholder="请选择文章频道" style={{ width: 400 }}>
              { channelStore.channels.map(channel => (
                <Option value={channel.id} key={channel.id}>{ channel.name }</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="封面">
            <Form.Item name="type">
              <Radio.Group>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>
            <Upload
              name="image"
              listType="picture-card"
              className="avatar-uploader"
              onPreview={preview}
              beforeUpload={() => false}
              fileList={fileList}
              onChange={handleChange}
              maxCount={3}
              showUploadList
            >
              <div style={{ marginTop: 8 }}>
                <PlusOutlined />
              </div>
            </Upload>
            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel} width={800}>
              <img
                alt="example"
                style={{
                  width: '100%',
                }}
                src={previewImage}
              />
            </Modal>
          </Form.Item>

          <Form.Item
            label="内容"
            name="content"
            rules={[{ required: true, message: '请输入文章内容' }]}
          >
            <ReactQuill
              className="publish-quill"
              theme="snow"
              placeholder="请输入文章内容"
              value={content}
              onChange={setContent}
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 3 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                发布文章
              </Button>
            </Space>
          </Form.Item>

        </Form>
      </Card>
    </div>
  )
})

export default Publish