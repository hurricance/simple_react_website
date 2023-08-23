import { Card, Form, Checkbox, Input, Button, message } from "antd";
import { useNavigate, Navigate } from 'react-router-dom'

import { getToken } from '/src/utils/'
import useStore from '/src/store'

import "./index.scss";

import pokemonImage from '/src/assets/pokemon-6.svg';
const Login = () => {

  const { loginStore } = useStore()
  const navigate = useNavigate()

  const cur = window.location.href.split('/').slice(-1)[0]
  if (cur === 'login' && getToken()) {
    return <Navigate to="/" replace={true} />
  }


  const onFinish = async (values) => {
    await loginStore.login({
      mobile: values.phonenumber,
      password: values.password 
    })
    navigate('/', { replace: true })
    message.success('登陆成功', 1)
  }

  return (
    <div className="login">
      <Card className="login-container">
        <img className="login-logo" src={ pokemonImage } alt="" />
        <Form validateTrigger="onSubmit" onFinish={ onFinish }>
          <Form.Item
            name="phonenumber"
            rules={[
              {
                pattern: /^1[3-9]\d{9}$/,
                message: "请输入正确的手机号",
              },
              {
                required: true,
                message: "请输入手机号码",
              },
            ]}
          >
            <Input size="large" placeholder="请输入手机号" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "请输入密码" }]}
          >
            <Input size="large" placeholder="请输入密码" />
          </Form.Item>
          <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(new Error("请勾选复选框")),
              },
            ]}
          >
            <Checkbox className="login-checkbox-label">
              我已阅读并同意「用户协议」和「隐私条款」
            </Checkbox>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
