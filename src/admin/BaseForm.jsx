import "antd/dist/antd.css";
import { Layout } from "antd";
import { Form, Input, Button, Checkbox } from "antd";
import SideBar from "./SideBar";
import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faHome } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

import {
  BrowserRouter as Routes,
  Route,
  Link,
  NavLink,
} from "react-router-dom";
const { Header, Content, Footer } = Layout;

export default function BaseForm() {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    console.log("Success:", values);
    const username = values.username;
    const pass = values.password;
    const res = await axios.post("http://localhost:8000/user", {
      username,
      pass,
    });

    navigate("/hocvien");
    // console.log(res.data);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
